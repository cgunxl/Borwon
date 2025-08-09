#!/usr/bin/env python3
"""
Cursor Security Integration - ฟรี 100%
ระบบเชื่อมต่อ Cursor AI กับระบบความปลอดภัย GitHub
"""

import os
import json
import time
import threading
import subprocess
from pathlib import Path
from typing import Dict, List, Optional
from github_security_system import GitHubSecuritySystem
import logging

class CursorSecurityIntegration:
    def __init__(self, workspace_path: str):
        self.workspace_path = Path(workspace_path)
        self.security_system = GitHubSecuritySystem(workspace_path)
        
        # ไฟล์สำหรับการสื่อสาร
        self.security_status_file = self.workspace_path / ".cursor_security_status.json"
        self.security_alerts_file = self.workspace_path / ".cursor_security_alerts.json"
        self.watch_files = [".env", "config.json", "secrets.json"]
        
        # ตั้งค่า logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # สถานะการทำงาน
        self.is_monitoring = False
        self.last_scan_time = 0
        self.security_violations = []
        
        self.init_security_integration()
    
    def init_security_integration(self):
        """เริ่มต้นระบบเชื่อมต่อความปลอดภัย"""
        self.logger.info("🔒 เริ่มต้น Cursor Security Integration")
        
        # สร้างไฟล์สถานะ
        self.update_security_status("initialized", "Security system ready")
        
        # ตั้งค่า file watchers
        self.setup_file_watchers()
        
        # สร้าง Cursor extension
        self.create_cursor_security_extension()
        
        self.logger.info("✅ Cursor Security Integration พร้อมใช้งาน")
    
    def setup_file_watchers(self):
        """ตั้งค่าการติดตามไฟล์สำคัญ"""
        self.logger.info("👀 ตั้งค่าการติดตามไฟล์...")
        
        # เริ่มต้น monitoring thread
        monitor_thread = threading.Thread(target=self._monitor_files, daemon=True)
        monitor_thread.start()
        
        self.is_monitoring = True
    
    def _monitor_files(self):
        """ติดตามการเปลี่ยนแปลงไฟล์"""
        file_timestamps = {}
        
        while self.is_monitoring:
            try:
                # ตรวจสอบไฟล์ที่ต้องติดตาม
                for pattern in self.watch_files:
                    for file_path in self.workspace_path.rglob(pattern):
                        if file_path.is_file():
                            current_time = file_path.stat().st_mtime
                            
                            if str(file_path) not in file_timestamps:
                                file_timestamps[str(file_path)] = current_time
                            elif current_time > file_timestamps[str(file_path)]:
                                # ไฟล์มีการเปลี่ยนแปลง
                                self._handle_file_change(file_path)
                                file_timestamps[str(file_path)] = current_time
                
                # ตรวจสอบทุก 2 วินาที
                time.sleep(2)
                
            except Exception as e:
                self.logger.error(f"❌ ข้อผิดพลาดในการติดตามไฟล์: {e}")
                time.sleep(5)
    
    def _handle_file_change(self, file_path: Path):
        """จัดการเมื่อไฟล์มีการเปลี่ยนแปลง"""
        self.logger.info(f"📝 ตรวจพบการเปลี่ยนแปลง: {file_path}")
        
        # สแกนไฟล์ที่เปลี่ยนแปลง
        issues = self.security_system._scan_file_for_secrets(file_path)
        
        if issues:
            # พบปัญหาความปลอดภัย
            self._handle_security_violation(file_path, issues)
        else:
            # ไฟล์ปลอดภัย
            self.update_security_status("file_safe", f"File {file_path.name} is secure")
    
    def _handle_security_violation(self, file_path: Path, issues: List[Dict]):
        """จัดการเมื่อพบการละเมิดความปลอดภัย"""
        self.logger.warning(f"🚨 พบปัญหาความปลอดภัยใน {file_path}")
        
        violation = {
            "timestamp": time.time(),
            "file": str(file_path),
            "issues": issues,
            "severity": max(issue.get("severity", "low") for issue in issues),
            "action_taken": "blocked"
        }
        
        self.security_violations.append(violation)
        
        # แจ้งเตือนใน Cursor
        self.send_security_alert(violation)
        
        # บล็อกการ commit (ถ้าเป็น high severity)
        if violation["severity"] == "high":
            self._block_commit(file_path, issues)
    
    def send_security_alert(self, violation: Dict):
        """ส่งการแจ้งเตือนความปลอดภัยไปยัง Cursor"""
        alert = {
            "timestamp": violation["timestamp"],
            "type": "security_violation",
            "severity": violation["severity"],
            "file": violation["file"],
            "message": f"🚨 Security issue detected in {Path(violation['file']).name}",
            "details": violation["issues"],
            "actions": [
                "Remove sensitive data",
                "Use environment variables",
                "Add to .gitignore"
            ]
        }
        
        try:
            # อ่านการแจ้งเตือนเดิม
            alerts = []
            if self.security_alerts_file.exists():
                with open(self.security_alerts_file, 'r', encoding='utf-8') as f:
                    alerts = json.load(f)
            
            # เพิ่มการแจ้งเตือนใหม่
            alerts.append(alert)
            
            # เก็บแค่ 50 การแจ้งเตือนล่าสุด
            if len(alerts) > 50:
                alerts = alerts[-50:]
            
            # บันทึกไฟล์
            with open(self.security_alerts_file, 'w', encoding='utf-8') as f:
                json.dump(alerts, f, indent=2, ensure_ascii=False)
            
            self.logger.info("📢 ส่งการแจ้งเตือนไปยัง Cursor")
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถส่งการแจ้งเตือน: {e}")
    
    def _block_commit(self, file_path: Path, issues: List[Dict]):
        """บล็อกการ commit เมื่อพบปัญหาร้ายแรง"""
        self.logger.warning(f"🛑 บล็อกการ commit สำหรับ {file_path}")
        
        # สร้าง pre-commit hook ที่บล็อกไฟล์นี้
        git_hooks_dir = self.workspace_path / ".git" / "hooks"
        git_hooks_dir.mkdir(exist_ok=True)
        
        pre_commit_hook = git_hooks_dir / "pre-commit"
        
        hook_script = f'''#!/bin/bash
# Security check - Auto-generated by Cursor Security Integration

echo "🔒 Checking for security violations..."

# Check if {file_path.name} has been modified
if git diff --cached --name-only | grep -q "{file_path.name}"; then
    echo "🚨 SECURITY VIOLATION: {file_path.name} contains sensitive data!"
    echo "Please remove API keys, passwords, or other secrets before committing."
    echo ""
    echo "Issues found:"
'''
        
        for issue in issues:
            hook_script += f'    echo "  - Line {issue["line"]}: {issue["match"][:30]}..."'
        
        hook_script += '''
    echo ""
    echo "Solutions:"
    echo "  1. Move secrets to .env file"
    echo "  2. Use environment variables"
    echo "  3. Add sensitive files to .gitignore"
    echo ""
    exit 1
fi

echo "✅ Security check passed"
exit 0
'''
        
        try:
            with open(pre_commit_hook, 'w', encoding='utf-8') as f:
                f.write(hook_script)
            
            # ทำให้ executable
            os.chmod(pre_commit_hook, 0o755)
            
            self.logger.info("🛑 สร้าง pre-commit hook เพื่อบล็อกการ commit")
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง pre-commit hook: {e}")
    
    def update_security_status(self, status: str, message: str):
        """อัปเดตสถานะความปลอดภัย"""
        status_data = {
            "timestamp": time.time(),
            "status": status,
            "message": message,
            "violations_count": len(self.security_violations),
            "last_scan": self.last_scan_time,
            "monitoring": self.is_monitoring
        }
        
        try:
            with open(self.security_status_file, 'w', encoding='utf-8') as f:
                json.dump(status_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถอัปเดตสถานะ: {e}")
    
    def perform_security_scan(self) -> Dict:
        """ทำการสแกนความปลอดภัยแบบเต็มรูปแบบ"""
        self.logger.info("🔍 เริ่มการสแกนความปลอดภัย...")
        
        # อัปเดตสถานะ
        self.update_security_status("scanning", "Performing security scan...")
        
        # ทำการสแกน
        results = self.security_system.scan_project_for_secrets()
        self.last_scan_time = results["timestamp"]
        
        # อัปเดตสถานะตามผลลัพธ์
        if results["risk_level"] == "high":
            self.update_security_status("high_risk", f"Found {len(results['issues_found'])} security issues")
        elif results["risk_level"] == "medium":
            self.update_security_status("medium_risk", f"Found {len(results['issues_found'])} potential issues")
        else:
            self.update_security_status("secure", "No security issues found")
        
        return results
    
    def create_cursor_security_extension(self):
        """สร้าง Cursor extension สำหรับความปลอดภัย"""
        extension_dir = self.workspace_path / ".cursor" / "extensions"
        extension_dir.mkdir(parents=True, exist_ok=True)
        
        extension_script = '''
// Cursor Security Extension
// ระบบความปลอดภัยสำหรับ Cursor AI

class CursorSecurityExtension {
    constructor() {
        this.statusFile = '.cursor_security_status.json';
        this.alertsFile = '.cursor_security_alerts.json';
        this.isMonitoring = false;
        
        this.init();
    }
    
    async init() {
        console.log('🔒 Cursor Security Extension initialized');
        
        // สร้าง UI
        this.createSecurityPanel();
        
        // เริ่มการติดตาม
        this.startMonitoring();
        
        // ตั้งค่า event listeners
        this.setupEventListeners();
    }
    
    createSecurityPanel() {
        // สร้าง security panel ใน Cursor UI
        const panel = document.createElement('div');
        panel.id = 'security-panel';
        panel.innerHTML = `
            <div style="padding: 15px; border: 2px solid #ff6b6b; border-radius: 8px; margin: 10px; background: #fff5f5;">
                <h3 style="margin: 0 0 10px 0; color: #d63031;">🔒 Security Monitor</h3>
                
                <div id="security-status" style="margin: 10px 0;">
                    <span id="status-indicator">🟡</span>
                    <span id="status-text">Initializing...</span>
                </div>
                
                <div id="security-actions" style="margin: 10px 0;">
                    <button onclick="securityExt.performScan()" style="padding: 5px 10px; margin: 2px; background: #0984e3; color: white; border: none; border-radius: 3px; cursor: pointer;">
                        🔍 Scan Now
                    </button>
                    <button onclick="securityExt.viewAlerts()" style="padding: 5px 10px; margin: 2px; background: #e17055; color: white; border: none; border-radius: 3px; cursor: pointer;">
                        🚨 View Alerts
                    </button>
                    <button onclick="securityExt.generateReport()" style="padding: 5px 10px; margin: 2px; background: #00b894; color: white; border: none; border-radius: 3px; cursor: pointer;">
                        📊 Report
                    </button>
                </div>
                
                <div id="security-alerts" style="max-height: 200px; overflow-y: auto; margin: 10px 0;">
                    <!-- Alerts will be displayed here -->
                </div>
                
                <div id="security-tips" style="font-size: 12px; color: #636e72; margin-top: 10px;">
                    💡 Tips: Never commit API keys, use .env files, scan before push
                </div>
            </div>
        `;
        
        // แทรกใน Cursor UI
        const sidebar = document.querySelector('.sidebar') || 
                       document.querySelector('.panel') || 
                       document.body;
        sidebar.appendChild(panel);
    }
    
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        
        // ตรวจสอบสถานะทุก 3 วินาที
        this.monitorInterval = setInterval(() => {
            this.checkSecurityStatus();
            this.checkAlerts();
        }, 3000);
        
        console.log('👀 Security monitoring started');
    }
    
    stopMonitoring() {
        this.isMonitoring = false;
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
        console.log('⏹️ Security monitoring stopped');
    }
    
    async checkSecurityStatus() {
        try {
            const response = await this.readFile(this.statusFile);
            if (response) {
                const status = JSON.parse(response);
                this.updateStatusDisplay(status);
            }
        } catch (error) {
            console.error('Error checking security status:', error);
        }
    }
    
    async checkAlerts() {
        try {
            const response = await this.readFile(this.alertsFile);
            if (response) {
                const alerts = JSON.parse(response);
                this.updateAlertsDisplay(alerts);
            }
        } catch (error) {
            // File might not exist yet
        }
    }
    
    updateStatusDisplay(status) {
        const indicator = document.getElementById('status-indicator');
        const text = document.getElementById('status-text');
        
        if (!indicator || !text) return;
        
        // อัปเดตสถานะ
        switch (status.status) {
            case 'secure':
                indicator.textContent = '🟢';
                text.textContent = 'Secure';
                text.style.color = '#00b894';
                break;
            case 'medium_risk':
                indicator.textContent = '🟡';
                text.textContent = 'Medium Risk';
                text.style.color = '#fdcb6e';
                break;
            case 'high_risk':
                indicator.textContent = '🔴';
                text.textContent = 'High Risk';
                text.style.color = '#e17055';
                break;
            case 'scanning':
                indicator.textContent = '🔄';
                text.textContent = 'Scanning...';
                text.style.color = '#0984e3';
                break;
            default:
                indicator.textContent = '🟡';
                text.textContent = status.message || 'Unknown';
                text.style.color = '#636e72';
        }
        
        // แสดงจำนวนการละเมิด
        if (status.violations_count > 0) {
            text.textContent += ` (${status.violations_count} issues)`;
        }
    }
    
    updateAlertsDisplay(alerts) {
        const alertsContainer = document.getElementById('security-alerts');
        if (!alertsContainer) return;
        
        // แสดงการแจ้งเตือน 5 รายการล่าสุด
        const recentAlerts = alerts.slice(-5).reverse();
        
        alertsContainer.innerHTML = recentAlerts.map(alert => `
            <div style="padding: 8px; margin: 5px 0; border-left: 3px solid ${this.getSeverityColor(alert.severity)}; background: #f8f9fa; border-radius: 3px;">
                <div style="font-weight: bold; font-size: 12px;">
                    ${this.getSeverityIcon(alert.severity)} ${alert.message}
                </div>
                <div style="font-size: 11px; color: #636e72; margin-top: 3px;">
                    ${new Date(alert.timestamp * 1000).toLocaleTimeString()}
                </div>
            </div>
        `).join('');
        
        // แสดง notification สำหรับการแจ้งเตือนใหม่
        if (alerts.length > 0) {
            const latestAlert = alerts[alerts.length - 1];
            const now = Date.now() / 1000;
            
            // ถ้าการแจ้งเตือนใหม่กว่า 10 วินาที
            if (now - latestAlert.timestamp < 10) {
                this.showNotification(latestAlert);
            }
        }
    }
    
    getSeverityColor(severity) {
        switch (severity) {
            case 'high': return '#e17055';
            case 'medium': return '#fdcb6e';
            case 'low': return '#74b9ff';
            default: return '#636e72';
        }
    }
    
    getSeverityIcon(severity) {
        switch (severity) {
            case 'high': return '🚨';
            case 'medium': return '⚠️';
            case 'low': return 'ℹ️';
            default: return '📝';
        }
    }
    
    showNotification(alert) {
        // สร้าง notification popup
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${alert.severity === 'high' ? '#e17055' : '#fdcb6e'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 350px;
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">
                ${this.getSeverityIcon(alert.severity)} Security Alert
            </div>
            <div style="font-size: 14px;">
                ${alert.message}
            </div>
            <div style="margin-top: 10px;">
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                    Dismiss
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // ลบ notification หลัง 10 วินาที
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 10000);
    }
    
    async performScan() {
        console.log('🔍 Starting security scan...');
        
        // แสดงสถานะการสแกน
        this.updateStatusDisplay({
            status: 'scanning',
            message: 'Performing security scan...'
        });
        
        try {
            // เรียก Python script เพื่อทำการสแกน
            const result = await this.executeCommand('python github_security_system.py --scan');
            console.log('Scan completed:', result);
            
            // รีเฟรชสถานะ
            setTimeout(() => {
                this.checkSecurityStatus();
                this.checkAlerts();
            }, 2000);
            
        } catch (error) {
            console.error('Scan failed:', error);
            this.updateStatusDisplay({
                status: 'error',
                message: 'Scan failed'
            });
        }
    }
    
    async viewAlerts() {
        try {
            const response = await this.readFile(this.alertsFile);
            if (response) {
                const alerts = JSON.parse(response);
                this.showAlertsModal(alerts);
            } else {
                alert('No alerts found');
            }
        } catch (error) {
            alert('Error loading alerts: ' + error.message);
        }
    }
    
    showAlertsModal(alerts) {
        // สร้าง modal สำหรับแสดงการแจ้งเตือนทั้งหมด
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 20000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; max-width: 80%; max-height: 80%; overflow-y: auto;">
                <h3 style="margin: 0 0 15px 0;">🚨 Security Alerts</h3>
                <div style="max-height: 400px; overflow-y: auto;">
                    ${alerts.map(alert => `
                        <div style="padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                            <div style="font-weight: bold;">
                                ${this.getSeverityIcon(alert.severity)} ${alert.message}
                            </div>
                            <div style="font-size: 12px; color: #666; margin: 5px 0;">
                                ${new Date(alert.timestamp * 1000).toLocaleString()}
                            </div>
                            <div style="font-size: 12px;">
                                File: ${alert.file}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-top: 15px; padding: 8px 15px; background: #0984e3; color: white; border: none; border-radius: 3px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    async generateReport() {
        console.log('📊 Generating security report...');
        
        try {
            // เรียก Python script เพื่อสร้างรายงาน
            const result = await this.executeCommand('python github_security_system.py --report');
            console.log('Report generated:', result);
            
            alert('Security report generated successfully!\\nCheck security_report.md file.');
            
        } catch (error) {
            console.error('Report generation failed:', error);
            alert('Failed to generate report: ' + error.message);
        }
    }
    
    setupEventListeners() {
        // ตั้งค่า keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+S = Security Scan
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                this.performScan();
            }
            
            // Ctrl+Shift+A = View Alerts
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                this.viewAlerts();
            }
        });
        
        // ตั้งค่า file change detection
        if (window.cursor && window.cursor.workspace) {
            window.cursor.workspace.onDidChangeTextDocument((event) => {
                // ตรวจสอบไฟล์ที่เปลี่ยนแปลง
                const fileName = event.document.fileName;
                if (fileName.includes('.env') || fileName.includes('config') || fileName.includes('secret')) {
                    console.log('🔍 Sensitive file changed, triggering security check...');
                    setTimeout(() => this.performScan(), 1000);
                }
            });
        }
    }
    
    // Utility methods
    async readFile(filename) {
        if (window.cursor && window.cursor.fs) {
            return await window.cursor.fs.readFile(filename);
        } else {
            // Fallback for testing
            return localStorage.getItem(filename);
        }
    }
    
    async executeCommand(command) {
        if (window.cursor && window.cursor.terminal) {
            return await window.cursor.terminal.execute(command);
        } else {
            // Fallback
            console.log('Executing command:', command);
            return 'Command executed (simulated)';
        }
    }
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    #security-panel button:hover {
        opacity: 0.8;
        transform: translateY(-1px);
    }
    
    #security-panel {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
`;
document.head.appendChild(style);

// Initialize extension
const securityExt = new CursorSecurityExtension();

// Global functions for buttons
window.securityExt = securityExt;

console.log('🔒 Cursor Security Extension loaded successfully');
'''
        
        extension_file = extension_dir / "security.js"
        
        try:
            with open(extension_file, 'w', encoding='utf-8') as f:
                f.write(extension_script)
            
            self.logger.info("✅ สร้าง Cursor security extension เสร็จสิ้น")
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง extension: {e}")
    
    def create_deployment_security_config(self) -> str:
        """สร้างไฟล์ config สำหรับ deployment ที่ปลอดภัย"""
        config_content = '''# Deployment Security Configuration

## Environment Variables (ใช้ใน platform secrets)
OPENAI_API_KEY=your_openai_key_here
GITHUB_TOKEN=your_github_token_here
SECRET_KEY=your_secret_key_here
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

## Vercel Configuration (vercel.json)
{
  "env": {
    "OPENAI_API_KEY": "@openai_api_key",
    "SECRET_KEY": "@secret_key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}

## Netlify Configuration (_headers)
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'

## Cloudflare Workers Configuration
export default {
  async fetch(request, env) {
    const response = await handleRequest(request, env);
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    return response;
  }
}

## Docker Security (Dockerfile)
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
COPY --chown=nextjs:nodejs . .
EXPOSE 3000
CMD ["npm", "start"]

## GitHub Actions Security
name: Deploy with Security
on:
  push:
    branches: [main]
jobs:
  security-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Security Scan
        run: |
          npm audit --audit-level high
          npx snyk test
  deploy:
    needs: security-check
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod
'''
        
        config_file = self.workspace_path / "deployment_security_config.md"
        
        try:
            with open(config_file, 'w', encoding='utf-8') as f:
                f.write(config_content)
            
            self.logger.info("✅ สร้างไฟล์ deployment security config เสร็จสิ้น")
            return str(config_file)
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง deployment config: {e}")
            return ""
    
    def stop_monitoring(self):
        """หยุดการติดตาม"""
        self.is_monitoring = False
        self.update_security_status("stopped", "Security monitoring stopped")
        self.logger.info("⏹️ หยุดการติดตามความปลอดภัย")

# CLI Interface
def main():
    print("🔒 Cursor Security Integration - ฟรี 100%")
    print("=" * 60)
    
    # รับ workspace path
    workspace = input("📁 ใส่ path ของ Cursor workspace (หรือ Enter สำหรับ current directory): ").strip()
    if not workspace:
        workspace = os.getcwd()
    
    # สร้างระบบ integration
    integration = CursorSecurityIntegration(workspace)
    
    print("\n✅ Cursor Security Integration พร้อมใช้งาน!")
    print("\n🎯 Features:")
    print("- 👀 Real-time file monitoring")
    print("- 🚨 Instant security alerts")
    print("- 🛑 Auto-block dangerous commits")
    print("- 📊 Security dashboard in Cursor")
    print("- 🔍 On-demand security scans")
    
    print("\n📝 วิธีใช้งาน:")
    print("1. เปิด Cursor AI")
    print("2. ดู Security Monitor panel")
    print("3. ใช้ Ctrl+Shift+S เพื่อสแกน")
    print("4. ใช้ Ctrl+Shift+A เพื่อดูการแจ้งเตือน")
    
    try:
        while True:
            print("\n🛡️ เลือกการทำงาน:")
            print("1. ทำการสแกนความปลอดภัย")
            print("2. ดูการแจ้งเตือน")
            print("3. สร้างรายงานความปลอดภัย")
            print("4. สร้าง deployment security config")
            print("5. หยุดการติดตาม")
            print("6. ออกจากโปรแกรม")
            
            choice = input("\nเลือก (1-6): ").strip()
            
            if choice == "1":
                results = integration.perform_security_scan()
                print(f"✅ สแกนเสร็จสิ้น: พบ {len(results['issues_found'])} ปัญหา")
                
            elif choice == "2":
                if integration.security_alerts_file.exists():
                    with open(integration.security_alerts_file, 'r', encoding='utf-8') as f:
                        alerts = json.load(f)
                    
                    print(f"\n📢 การแจ้งเตือน ({len(alerts)} รายการ):")
                    for alert in alerts[-5:]:  # แสดง 5 รายการล่าสุด
                        timestamp = time.strftime('%H:%M:%S', time.localtime(alert['timestamp']))
                        print(f"  {timestamp} - {alert['severity'].upper()}: {alert['message']}")
                else:
                    print("📭 ไม่มีการแจ้งเตือน")
                    
            elif choice == "3":
                report_file = integration.security_system.generate_security_report()
                print(f"✅ สร้างรายงาน: {report_file}")
                
            elif choice == "4":
                config_file = integration.create_deployment_security_config()
                print(f"✅ สร้าง deployment config: {config_file}")
                
            elif choice == "5":
                integration.stop_monitoring()
                print("⏹️ หยุดการติดตามแล้ว")
                
            elif choice == "6":
                integration.stop_monitoring()
                print("👋 ขอบคุณที่ใช้งาน!")
                break
                
            else:
                print("❌ กรุณาเลือก 1-6")
                
    except KeyboardInterrupt:
        integration.stop_monitoring()
        print("\n\n👋 ขอบคุณที่ใช้งาน!")

if __name__ == "__main__":
    main()

