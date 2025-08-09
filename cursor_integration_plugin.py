#!/usr/bin/env python3
"""
Cursor AI Integration Plugin - ฟรี 100%
Plugin สำหรับเชื่อมต่อ Cursor AI กับ Smart AI Automation System
"""

import os
import json
import subprocess
import threading
import time
from pathlib import Path
from smart_ai_automation_system import SmartAIAutomation

class CursorAIPlugin:
    def __init__(self):
        self.automation = SmartAIAutomation()
        self.cursor_workspace = None
        self.watch_file = ".cursor_commands.json"
        self.response_file = ".cursor_responses.json"
        self.is_watching = False
        
    def setup_cursor_integration(self, workspace_path: str):
        """ตั้งค่าการเชื่อมต่อกับ Cursor AI"""
        self.cursor_workspace = Path(workspace_path)
        
        # สร้างไฟล์สำหรับการสื่อสาร
        self.command_file = self.cursor_workspace / self.watch_file
        self.response_file_path = self.cursor_workspace / self.response_file
        
        # สร้างไฟล์เริ่มต้น
        self.command_file.touch()
        self.response_file_path.touch()
        
        print(f"✅ ตั้งค่า Cursor integration ใน: {workspace_path}")
        
    def start_watching(self):
        """เริ่มต้นการติดตามคำสั่งจาก Cursor"""
        if self.is_watching:
            return
            
        self.is_watching = True
        watch_thread = threading.Thread(target=self._watch_commands, daemon=True)
        watch_thread.start()
        print("👀 เริ่มติดตามคำสั่งจาก Cursor AI...")
        
    def stop_watching(self):
        """หยุดการติดตามคำสั่ง"""
        self.is_watching = False
        print("⏹️ หยุดติดตามคำสั่งจาก Cursor AI")
        
    def _watch_commands(self):
        """ติดตามไฟล์คำสั่งจาก Cursor"""
        last_modified = 0
        
        while self.is_watching:
            try:
                if self.command_file.exists():
                    current_modified = self.command_file.stat().st_mtime
                    
                    if current_modified > last_modified:
                        last_modified = current_modified
                        self._process_command_file()
                        
                time.sleep(1)  # ตรวจสอบทุกวินาที
                
            except Exception as e:
                print(f"⚠️ ข้อผิดพลาดในการติดตาม: {e}")
                time.sleep(5)
                
    def _process_command_file(self):
        """ประมวลผลคำสั่งจากไฟล์"""
        try:
            with open(self.command_file, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                
            if not content:
                return
                
            # ลองแปลงเป็น JSON ก่อน
            try:
                command_data = json.loads(content)
                if isinstance(command_data, dict) and 'prompt' in command_data:
                    prompt = command_data['prompt']
                    options = command_data.get('options', {})
                else:
                    prompt = content
                    options = {}
            except json.JSONDecodeError:
                # ถ้าไม่ใช่ JSON ให้ใช้เป็น text ธรรมดา
                prompt = content
                options = {}
                
            if prompt:
                print(f"\n📨 ได้รับคำสั่งจาก Cursor: {prompt}")
                self._execute_automation(prompt, options)
                
                # ล้างไฟล์คำสั่งหลังประมวลผล
                with open(self.command_file, 'w') as f:
                    f.write('')
                    
        except Exception as e:
            print(f"❌ ข้อผิดพลาดในการประมวลผลคำสั่ง: {e}")
            
    def _execute_automation(self, prompt: str, options: dict):
        """รันระบบ automation"""
        try:
            # แสดงสถานะใน Cursor
            self._update_cursor_status("กำลังประมวลผล...", "processing")
            
            # รันระบบ automation
            result = self.automation.run_automation(prompt)
            
            # ส่งผลลัพธ์กลับไป Cursor
            self._send_result_to_cursor(result, prompt)
            
        except Exception as e:
            error_result = {
                'success': False,
                'error': str(e),
                'prompt': prompt
            }
            self._send_result_to_cursor(error_result, prompt)
            
    def _update_cursor_status(self, message: str, status: str):
        """อัปเดตสถานะใน Cursor"""
        status_data = {
            'timestamp': time.time(),
            'message': message,
            'status': status
        }
        
        try:
            with open(self.response_file_path, 'w', encoding='utf-8') as f:
                json.dump(status_data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"⚠️ ไม่สามารถอัปเดตสถานะได้: {e}")
            
    def _send_result_to_cursor(self, result: dict, original_prompt: str):
        """ส่งผลลัพธ์กลับไป Cursor"""
        response_data = {
            'timestamp': time.time(),
            'original_prompt': original_prompt,
            'result': result,
            'status': 'completed' if result['success'] else 'error'
        }
        
        try:
            with open(self.response_file_path, 'w', encoding='utf-8') as f:
                json.dump(response_data, f, ensure_ascii=False, indent=2)
                
            # แสดงผลลัพธ์ใน console
            if result['success']:
                print(f"✅ สำเร็จ! URL: {result.get('url', 'N/A')}")
                print(f"📊 คะแนนประสิทธิภาพ: {result.get('performance_score', 0):.1f}/100")
                
                # สร้างไฟล์ผลลัพธ์ใน workspace
                self._create_result_files(result, original_prompt)
            else:
                print(f"❌ ล้มเหลว: {result.get('error', 'ไม่ทราบสาเหตุ')}")
                
        except Exception as e:
            print(f"❌ ไม่สามารถส่งผลลัพธ์ได้: {e}")
            
    def _create_result_files(self, result: dict, prompt: str):
        """สร้างไฟล์ผลลัพธ์ใน workspace"""
        try:
            # สร้างโฟลเดอร์ผลลัพธ์
            result_dir = self.cursor_workspace / "ai_generated"
            result_dir.mkdir(exist_ok=True)
            
            # สร้างไฟล์สรุปผลลัพธ์
            summary_file = result_dir / "result_summary.md"
            summary_content = f"""# AI Automation Result

## Original Prompt
{prompt}

## Result
- **Status:** {'✅ Success' if result['success'] else '❌ Failed'}
- **URL:** {result.get('url', 'N/A')}
- **Performance Score:** {result.get('performance_score', 0):.1f}/100

## Files Created
{chr(10).join(f"- {file}" for file in result.get('files_created', []))}

## Optimizations Applied
{chr(10).join(f"- {opt}" for opt in result.get('optimizations', []))}

## Generated At
{time.strftime('%Y-%m-%d %H:%M:%S')}
"""
            
            with open(summary_file, 'w', encoding='utf-8') as f:
                f.write(summary_content)
                
            print(f"📄 สร้างไฟล์สรุปผลลัพธ์: {summary_file}")
            
        except Exception as e:
            print(f"⚠️ ไม่สามารถสร้างไฟล์ผลลัพธ์ได้: {e}")

# Cursor AI Extension Script
def create_cursor_extension():
    """สร้าง extension script สำหรับ Cursor AI"""
    extension_script = '''
// Cursor AI Extension for Smart AI Automation
// วางไฟล์นี้ใน .cursor/extensions/

class SmartAIExtension {
    constructor() {
        this.commandFile = '.cursor_commands.json';
        this.responseFile = '.cursor_responses.json';
        this.isWatching = false;
        this.setupUI();
        this.startWatching();
    }
    
    setupUI() {
        // สร้าง UI panel ใน Cursor
        const panel = document.createElement('div');
        panel.id = 'smart-ai-panel';
        panel.innerHTML = `
            <div style="padding: 10px; border: 1px solid #ccc; margin: 10px;">
                <h3>🤖 Smart AI Automation</h3>
                <textarea id="ai-prompt" placeholder="พิมพ์พรอมต์สั้นๆ..." 
                         style="width: 100%; height: 60px; margin: 5px 0;"></textarea>
                <button onclick="smartAI.sendCommand()" style="padding: 5px 10px;">
                    🚀 สร้างโปรเจค
                </button>
                <div id="ai-status" style="margin-top: 10px; font-size: 12px;"></div>
            </div>
        `;
        
        // แทรกใน sidebar หรือ panel ของ Cursor
        const sidebar = document.querySelector('.sidebar') || document.body;
        sidebar.appendChild(panel);
    }
    
    sendCommand() {
        const promptInput = document.getElementById('ai-prompt');
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            this.updateStatus('❌ กรุณาใส่พรอมต์', 'error');
            return;
        }
        
        this.updateStatus('📤 กำลังส่งคำสั่ง...', 'processing');
        
        const commandData = {
            prompt: prompt,
            timestamp: Date.now(),
            options: {
                auto_deploy: true,
                optimize: true
            }
        };
        
        // เขียนคำสั่งลงไฟล์
        this.writeToFile(this.commandFile, JSON.stringify(commandData, null, 2));
        
        // ล้าง input
        promptInput.value = '';
    }
    
    startWatching() {
        if (this.isWatching) return;
        
        this.isWatching = true;
        this.watchInterval = setInterval(() => {
            this.checkResponse();
        }, 2000); // ตรวจสอบทุก 2 วินาที
    }
    
    checkResponse() {
        this.readFromFile(this.responseFile)
            .then(content => {
                if (content) {
                    try {
                        const response = JSON.parse(content);
                        this.handleResponse(response);
                    } catch (e) {
                        console.error('Error parsing response:', e);
                    }
                }
            })
            .catch(err => {
                // ไฟล์อาจยังไม่มี - ไม่ต้องแสดง error
            });
    }
    
    handleResponse(response) {
        const { status, result, original_prompt } = response;
        
        if (status === 'processing') {
            this.updateStatus('⚙️ กำลังประมวลผล...', 'processing');
        } else if (status === 'completed') {
            if (result.success) {
                this.updateStatus(
                    `✅ สำเร็จ! <a href="${result.url}" target="_blank">เปิดเว็บไซต์</a>`, 
                    'success'
                );
                this.showSuccessNotification(result);
            } else {
                this.updateStatus(`❌ ล้มเหลว: ${result.error}`, 'error');
            }
        }
    }
    
    updateStatus(message, type) {
        const statusDiv = document.getElementById('ai-status');
        if (statusDiv) {
            statusDiv.innerHTML = message;
            statusDiv.className = `status-${type}`;
        }
    }
    
    showSuccessNotification(result) {
        // แสดง notification ใน Cursor
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <strong>🎉 โปรเจคสร้างเสร็จแล้ว!</strong><br>
            URL: <a href="${result.url}" target="_blank" style="color: #fff;">${result.url}</a><br>
            คะแนน: ${result.performance_score}/100
        `;
        
        document.body.appendChild(notification);
        
        // ลบ notification หลัง 5 วินาที
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }
    
    // File I/O methods (ต้องใช้ Cursor API)
    writeToFile(filename, content) {
        // ใช้ Cursor API เขียนไฟล์
        if (window.cursor && window.cursor.fs) {
            return window.cursor.fs.writeFile(filename, content);
        } else {
            // Fallback: ใช้ localStorage
            localStorage.setItem(filename, content);
        }
    }
    
    readFromFile(filename) {
        // ใช้ Cursor API อ่านไฟล์
        if (window.cursor && window.cursor.fs) {
            return window.cursor.fs.readFile(filename);
        } else {
            // Fallback: ใช้ localStorage
            return Promise.resolve(localStorage.getItem(filename) || '');
        }
    }
}

// เริ่มต้น extension
const smartAI = new SmartAIExtension();

// CSS สำหรับ styling
const style = document.createElement('style');
style.textContent = `
    #smart-ai-panel {
        background: #f5f5f5;
        border-radius: 5px;
        margin: 10px 0;
    }
    
    #smart-ai-panel h3 {
        margin: 0 0 10px 0;
        color: #333;
    }
    
    #smart-ai-panel textarea {
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 5px;
        font-family: monospace;
    }
    
    #smart-ai-panel button {
        background: #007ACC;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    
    #smart-ai-panel button:hover {
        background: #005a9e;
    }
    
    .status-processing { color: #ff9800; }
    .status-success { color: #4caf50; }
    .status-error { color: #f44336; }
`;
document.head.appendChild(style);
'''
    
    return extension_script

# CLI Interface สำหรับ Cursor Integration
def main():
    print("🤖 Cursor AI Integration Plugin - ฟรี 100%")
    print("=" * 60)
    
    plugin = CursorAIPlugin()
    
    # ตั้งค่า workspace
    workspace = input("📁 ใส่ path ของ Cursor workspace (หรือ Enter สำหรับ current directory): ").strip()
    if not workspace:
        workspace = os.getcwd()
        
    plugin.setup_cursor_integration(workspace)
    
    # สร้าง extension script
    extension_script = create_cursor_extension()
    extension_file = Path(workspace) / ".cursor" / "extensions" / "smart_ai.js"
    extension_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(extension_file, 'w', encoding='utf-8') as f:
        f.write(extension_script)
        
    print(f"📄 สร้าง Cursor extension: {extension_file}")
    
    # เริ่มติดตามคำสั่ง
    plugin.start_watching()
    
    print("\n✅ พร้อมใช้งาน!")
    print("📝 วิธีใช้งาน:")
    print("1. เปิด Cursor AI")
    print("2. ดู panel 'Smart AI Automation' ใน sidebar")
    print("3. พิมพ์พรอมต์สั้นๆ เช่น 'เพิ่มปุ่มเปลี่ยนภาษา'")
    print("4. กด 'สร้างโปรเจค'")
    print("5. รอผลลัพธ์!")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        plugin.stop_watching()
        print("\n👋 ขอบคุณที่ใช้งาน!")

if __name__ == "__main__":
    main()

