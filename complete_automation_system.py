#!/usr/bin/env python3
"""
Complete Automation System - ฟรี 100%
ระบบ automation ครบเซ็ตที่รวม:
- Smart AI Automation
- Web Scraper Bot  
- GitHub Security System
- Cursor Integration
- GitHub Pages Deployment
"""

import os
import sys
import json
import time
import subprocess
from pathlib import Path
from typing import Dict, List, Optional

# Import ระบบย่อยทั้งหมด
from smart_ai_automation_system import SmartAIAutomation
from web_scraper_bot import WebScraperBot
from github_security_system import GitHubSecuritySystem
from cursor_integration_plugin import CursorAIPlugin
from cursor_security_integration import CursorSecurityIntegration

class CompleteAutomationSystem:
    def __init__(self, workspace_path: str = None):
        self.workspace_path = Path(workspace_path) if workspace_path else Path.cwd()
        self.config_file = self.workspace_path / ".automation_config.json"
        
        # เริ่มต้นระบบย่อยทั้งหมด
        self.ai_automation = SmartAIAutomation()
        self.web_scraper = WebScraperBot()
        self.security_system = GitHubSecuritySystem(str(self.workspace_path))
        self.cursor_plugin = CursorAIPlugin()
        self.security_integration = CursorSecurityIntegration(str(self.workspace_path))
        
        # สถานะระบบ
        self.is_running = False
        self.projects_created = 0
        self.security_scans_performed = 0
        
        print("🚀 Complete Automation System - ฟรี 100%")
        print("=" * 60)
        
        self.init_system()
    
    def init_system(self):
        """เริ่มต้นระบบทั้งหมด"""
        print("⚙️ เริ่มต้นระบบ automation...")
        
        # สร้างโฟลเดอร์ที่จำเป็น
        (self.workspace_path / "projects").mkdir(exist_ok=True)
        (self.workspace_path / "logs").mkdir(exist_ok=True)
        (self.workspace_path / "reports").mkdir(exist_ok=True)
        
        # ตั้งค่า Cursor integration
        self.cursor_plugin.setup_cursor_integration(str(self.workspace_path))
        
        # โหลด config
        self.load_config()
        
        print("✅ ระบบพร้อมใช้งาน!")
    
    def load_config(self):
        """โหลดการตั้งค่า"""
        default_config = {
            "version": "1.0",
            "auto_security_scan": True,
            "auto_deploy": True,
            "github_pages_enabled": True,
            "notification_enabled": True,
            "max_projects_per_day": 10,
            "security_level": "high",
            "preferred_sources": ["github", "codepen", "ai_generation"],
            "deployment_platform": "github_pages"
        }
        
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r', encoding='utf-8') as f:
                    self.config = json.load(f)
            except:
                self.config = default_config
        else:
            self.config = default_config
            self.save_config()
    
    def save_config(self):
        """บันทึกการตั้งค่า"""
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(self.config, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"⚠️ ไม่สามารถบันทึก config: {e}")
    
    def process_automation_request(self, prompt: str, options: Dict = None) -> Dict:
        """ประมวลผลคำขอ automation แบบครบวงจร"""
        print(f"\n🎯 ประมวลผลคำขอ: {prompt}")
        
        if options is None:
            options = {}
        
        # ขั้นตอนที่ 1: ขยายพรอมต์และวิเคราะห์
        print("📝 ขั้นตอนที่ 1: ขยายพรอมต์...")
        expanded_prompt = self.ai_automation.expand_prompt(prompt)
        
        # ขั้นตอนที่ 2: ตรวจสอบความปลอดภัยของพรอมต์
        print("🔒 ขั้นตอนที่ 2: ตรวจสอบความปลอดภัย...")
        security_check = self.check_prompt_security(expanded_prompt)
        
        if not security_check['safe']:
            return {
                'success': False,
                'error': f"Security violation: {security_check['reason']}",
                'prompt': prompt
            }
        
        # ขั้นตอนที่ 3: ดึงโค้ดจากหลายแหล่ง
        print("🌐 ขั้นตอนที่ 3: ดึงโค้ดจากหลายแหล่ง...")
        sources = options.get('sources', self.config['preferred_sources'])
        scraped_results = self.web_scraper.scrape_multiple_sources(expanded_prompt['main_task'], sources)
        
        # ขั้นตอนที่ 4: เลือกและรวมโค้ดที่ดีที่สุด
        print("🎯 ขั้นตอนที่ 4: เลือกโค้ดที่ดีที่สุด...")
        best_code = self.web_scraper.select_best_code(scraped_results)
        
        # ขั้นตอนที่ 5: ปรับปรุงและเพิ่มประสิทธิภาพ
        print("⚡ ขั้นตอนที่ 5: ปรับปรุงประสิทธิภาพ...")
        optimized_code = self.optimize_code(best_code, expanded_prompt)
        
        # ขั้นตอนที่ 6: สร้างโปรเจค
        print("📁 ขั้นตอนที่ 6: สร้างโปรเจค...")
        project_result = self.create_project(optimized_code, expanded_prompt, options)
        
        # ขั้นตอนที่ 7: ตรวจสอบความปลอดภัยของโปรเจค
        if self.config['auto_security_scan']:
            print("🔍 ขั้นตอนที่ 7: สแกนความปลอดภัย...")
            security_result = self.security_system.scan_project_for_secrets()
            project_result['security_scan'] = security_result
        
        # ขั้นตอนที่ 8: Deploy ไป GitHub Pages
        if self.config['auto_deploy'] and project_result['success']:
            print("🚀 ขั้นตอนที่ 8: Deploy ไป GitHub Pages...")
            deployment_result = self.deploy_to_github_pages(project_result)
            project_result['deployment'] = deployment_result
        
        # ขั้นตอนที่ 9: สร้างรายงาน
        print("📊 ขั้นตอนที่ 9: สร้างรายงาน...")
        report = self.generate_project_report(project_result, expanded_prompt)
        project_result['report'] = report
        
        # อัปเดตสถิติ
        if project_result['success']:
            self.projects_created += 1
        
        print("✅ ประมวลผลเสร็จสิ้น!")
        return project_result
    
    def check_prompt_security(self, expanded_prompt: Dict) -> Dict:
        """ตรวจสอบความปลอดภัยของพรอมต์"""
        dangerous_keywords = [
            'hack', 'crack', 'exploit', 'malware', 'virus',
            'ddos', 'phishing', 'spam', 'illegal', 'piracy'
        ]
        
        prompt_text = str(expanded_prompt).lower()
        
        for keyword in dangerous_keywords:
            if keyword in prompt_text:
                return {
                    'safe': False,
                    'reason': f"Contains dangerous keyword: {keyword}"
                }
        
        return {'safe': True, 'reason': 'Prompt is safe'}
    
    def optimize_code(self, code: Dict, expanded_prompt: Dict) -> Dict:
        """ปรับปรุงและเพิ่มประสิทธิภาพโค้ด"""
        optimized = code.copy()
        
        # เพิ่ม meta tags สำหรับ SEO
        if 'html' in optimized:
            html = optimized['html']
            
            # เพิ่ม meta tags ถ้ายังไม่มี
            if '<meta name="description"' not in html:
                description = expanded_prompt.get('description', 'Created by Smart AI Automation')
                meta_description = f'<meta name="description" content="{description}">'
                html = html.replace('<head>', f'<head>\\n    {meta_description}')
            
            # เพิ่ม viewport meta tag
            if '<meta name="viewport"' not in html:
                viewport_meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
                html = html.replace('<head>', f'<head>\\n    {viewport_meta}')
            
            optimized['html'] = html
        
        # เพิ่ม responsive design ใน CSS
        if 'css' in optimized:
            css = optimized['css']
            
            # เพิ่ม media queries ถ้ายังไม่มี
            if '@media' not in css:
                responsive_css = '''
/* Responsive Design */
@media (max-width: 768px) {
    body {
        font-size: 14px;
        padding: 10px;
    }
    
    .container {
        width: 100%;
        padding: 0 15px;
    }
    
    h1 {
        font-size: 1.8rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    body {
        font-size: 12px;
    }
    
    h1 {
        font-size: 1.5rem;
    }
}
'''
                css += responsive_css
            
            optimized['css'] = css
        
        # เพิ่ม performance optimizations ใน JavaScript
        if 'js' in optimized:
            js = optimized['js']
            
            # เพิ่ม lazy loading และ performance optimizations
            performance_js = '''
// Performance Optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = ['style.css', 'script.js'];
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
});
'''
            
            if 'DOMContentLoaded' not in js:
                js += performance_js
            
            optimized['js'] = js
        
        return optimized
    
    def create_project(self, code: Dict, expanded_prompt: Dict, options: Dict) -> Dict:
        """สร้างโปรเจคจากโค้ดที่ได้"""
        project_name = expanded_prompt.get('project_name', f"project_{int(time.time())}")
        project_dir = self.workspace_path / "projects" / project_name
        
        try:
            # สร้างโฟลเดอร์โปรเจค
            project_dir.mkdir(parents=True, exist_ok=True)
            
            # สร้างไฟล์ HTML
            html_file = project_dir / "index.html"
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(code.get('html', ''))
            
            # สร้างไฟล์ CSS
            css_file = project_dir / "style.css"
            with open(css_file, 'w', encoding='utf-8') as f:
                f.write(code.get('css', ''))
            
            # สร้างไฟล์ JavaScript
            js_file = project_dir / "script.js"
            with open(js_file, 'w', encoding='utf-8') as f:
                f.write(code.get('js', ''))
            
            # สร้างไฟล์ README
            readme_content = f"""# {project_name}

## Description
{expanded_prompt.get('description', 'Project created by Smart AI Automation')}

## Features
{chr(10).join(f"- {feature}" for feature in expanded_prompt.get('features', ['Responsive design', 'Modern UI', 'Performance optimized']))}

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## Generated by
Smart AI Automation System - ฟรี 100%

## Installation
1. Clone this repository
2. Open `index.html` in your browser
3. Enjoy!

## Live Demo
[View Live Demo](https://your-username.github.io/{project_name})

## License
MIT License
"""
            
            readme_file = project_dir / "README.md"
            with open(readme_file, 'w', encoding='utf-8') as f:
                f.write(readme_content)
            
            # สร้างไฟล์ package.json (สำหรับ Node.js projects)
            package_json = {
                "name": project_name,
                "version": "1.0.0",
                "description": expanded_prompt.get('description', 'Project created by Smart AI Automation'),
                "main": "index.html",
                "scripts": {
                    "start": "python -m http.server 8000",
                    "build": "echo 'Build completed'",
                    "test": "echo 'No tests specified'"
                },
                "keywords": expanded_prompt.get('keywords', ['automation', 'ai', 'web']),
                "author": "Smart AI Automation",
                "license": "MIT"
            }
            
            package_file = project_dir / "package.json"
            with open(package_file, 'w', encoding='utf-8') as f:
                json.dump(package_json, f, indent=2, ensure_ascii=False)
            
            # คำนวณคะแนนประสิทธิภาพ
            performance_score = self.calculate_performance_score(code)
            
            return {
                'success': True,
                'project_name': project_name,
                'project_path': str(project_dir),
                'files_created': [
                    str(html_file),
                    str(css_file),
                    str(js_file),
                    str(readme_file),
                    str(package_file)
                ],
                'performance_score': performance_score,
                'optimizations': [
                    'Responsive design added',
                    'SEO meta tags included',
                    'Performance optimizations applied',
                    'Lazy loading implemented'
                ]
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'project_name': project_name
            }
    
    def calculate_performance_score(self, code: Dict) -> float:
        """คำนวณคะแนนประสิทธิภาพ"""
        score = 0.0
        
        # ตรวจสอบ HTML
        html = code.get('html', '')
        if html:
            score += 20
            if 'meta name="viewport"' in html:
                score += 10
            if 'meta name="description"' in html:
                score += 10
            if 'semantic' in html.lower() or any(tag in html for tag in ['<header>', '<main>', '<footer>']):
                score += 10
        
        # ตรวจสอบ CSS
        css = code.get('css', '')
        if css:
            score += 20
            if '@media' in css:
                score += 15
            if 'flexbox' in css.lower() or 'grid' in css.lower():
                score += 10
        
        # ตรวจสอบ JavaScript
        js = code.get('js', '')
        if js:
            score += 20
            if 'addEventListener' in js:
                score += 10
            if 'IntersectionObserver' in js:
                score += 5
        
        return min(score, 100.0)
    
    def deploy_to_github_pages(self, project_result: Dict) -> Dict:
        """Deploy โปรเจคไป GitHub Pages"""
        if not project_result['success']:
            return {'success': False, 'error': 'Project creation failed'}
        
        project_path = Path(project_result['project_path'])
        project_name = project_result['project_name']
        
        try:
            # เปลี่ยนไปยังโฟลเดอร์โปรเจค
            os.chdir(project_path)
            
            # เริ่มต้น Git repository
            subprocess.run(['git', 'init'], check=True, capture_output=True)
            
            # เพิ่มไฟล์ทั้งหมด
            subprocess.run(['git', 'add', '.'], check=True, capture_output=True)
            
            # Commit
            commit_message = f"Initial commit: {project_name} created by Smart AI Automation"
            subprocess.run(['git', 'commit', '-m', commit_message], check=True, capture_output=True)
            
            # สร้าง GitHub repository (ถ้ามี GitHub CLI)
            try:
                subprocess.run(['gh', 'repo', 'create', project_name, '--public', '--source=.', '--remote=origin', '--push'], 
                             check=True, capture_output=True)
                
                # เปิดใช้งาน GitHub Pages
                subprocess.run(['gh', 'api', f'repos/:owner/{project_name}/pages', 
                              '-X', 'POST', '-f', 'source[branch]=main', '-f', 'source[path]=/'], 
                             check=True, capture_output=True)
                
                github_url = f"https://github.com/your-username/{project_name}"
                pages_url = f"https://your-username.github.io/{project_name}"
                
                return {
                    'success': True,
                    'github_url': github_url,
                    'pages_url': pages_url,
                    'deployment_time': time.time()
                }
                
            except subprocess.CalledProcessError:
                # ถ้าไม่มี GitHub CLI ให้สร้างไฟล์ instructions
                instructions_file = project_path / "DEPLOYMENT_INSTRUCTIONS.md"
                instructions_content = f"""# Deployment Instructions for {project_name}

## Manual GitHub Deployment

1. Create a new repository on GitHub named `{project_name}`
2. Run these commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/{project_name}.git
git branch -M main
git push -u origin main
```

3. Go to repository Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save

Your website will be available at: `https://YOUR_USERNAME.github.io/{project_name}`

## Alternative: Use GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create {project_name} --public --source=. --remote=origin --push
gh api repos/:owner/{project_name}/pages -X POST -f source[branch]=main -f source[path]=/
```

---
Generated by Smart AI Automation System
"""
                
                with open(instructions_file, 'w', encoding='utf-8') as f:
                    f.write(instructions_content)
                
                return {
                    'success': True,
                    'manual_deployment': True,
                    'instructions_file': str(instructions_file),
                    'message': 'Manual deployment instructions created'
                }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
        finally:
            # กลับไปยังโฟลเดอร์เดิม
            os.chdir(self.workspace_path)
    
    def generate_project_report(self, project_result: Dict, expanded_prompt: Dict) -> str:
        """สร้างรายงานโปรเจค"""
        report_content = f"""# Project Report: {project_result.get('project_name', 'Unknown')}

## 📊 Project Summary
- **Created:** {time.strftime('%Y-%m-%d %H:%M:%S')}
- **Status:** {'✅ Success' if project_result['success'] else '❌ Failed'}
- **Performance Score:** {project_result.get('performance_score', 0):.1f}/100

## 🎯 Original Request
{expanded_prompt.get('original_prompt', 'N/A')}

## 📝 Expanded Requirements
- **Main Task:** {expanded_prompt.get('main_task', 'N/A')}
- **Features:** {', '.join(expanded_prompt.get('features', []))}
- **Technologies:** {', '.join(expanded_prompt.get('technologies', []))}

## 📁 Files Created
{chr(10).join(f"- {file}" for file in project_result.get('files_created', []))}

## ⚡ Optimizations Applied
{chr(10).join(f"- {opt}" for opt in project_result.get('optimizations', []))}

## 🔒 Security Scan Results
"""
        
        if 'security_scan' in project_result:
            security = project_result['security_scan']
            report_content += f"""
- **Risk Level:** {security['risk_level'].upper()}
- **Issues Found:** {len(security['issues_found'])}
- **Files Scanned:** {security['total_files_scanned']}
"""
        else:
            report_content += "Security scan not performed"
        
        report_content += f"""
## 🚀 Deployment Status
"""
        
        if 'deployment' in project_result:
            deployment = project_result['deployment']
            if deployment['success']:
                if 'pages_url' in deployment:
                    report_content += f"""
- **Status:** ✅ Deployed
- **GitHub URL:** {deployment.get('github_url', 'N/A')}
- **Live URL:** {deployment.get('pages_url', 'N/A')}
"""
                else:
                    report_content += f"""
- **Status:** 📋 Manual deployment required
- **Instructions:** {deployment.get('instructions_file', 'N/A')}
"""
            else:
                report_content += f"""
- **Status:** ❌ Deployment failed
- **Error:** {deployment.get('error', 'Unknown error')}
"""
        else:
            report_content += "Deployment not attempted"
        
        report_content += f"""
## 📈 Performance Metrics
- **Code Quality Score:** {project_result.get('performance_score', 0):.1f}/100
- **Responsive Design:** {'✅' if '@media' in str(project_result) else '❌'}
- **SEO Optimized:** {'✅' if 'meta name="description"' in str(project_result) else '❌'}
- **Performance Optimized:** {'✅' if 'IntersectionObserver' in str(project_result) else '❌'}

## 🛠️ System Information
- **AI Automation Version:** 1.0
- **Sources Used:** {', '.join(expanded_prompt.get('sources_used', []))}
- **Processing Time:** {time.time() - expanded_prompt.get('start_time', time.time()):.2f} seconds

---
Generated by Complete Automation System - ฟรี 100%
"""
        
        # บันทึกรายงาน
        report_file = self.workspace_path / "reports" / f"{project_result.get('project_name', 'unknown')}_report.md"
        
        try:
            with open(report_file, 'w', encoding='utf-8') as f:
                f.write(report_content)
            
            return str(report_file)
            
        except Exception as e:
            print(f"⚠️ ไม่สามารถบันทึกรายงาน: {e}")
            return ""
    
    def start_cursor_integration(self):
        """เริ่มต้น Cursor integration"""
        print("🔗 เริ่มต้น Cursor integration...")
        
        # เริ่มติดตามคำสั่งจาก Cursor
        self.cursor_plugin.start_watching()
        
        # เริ่มระบบความปลอดภัย
        self.security_integration.setup_file_watchers()
        
        self.is_running = True
        print("✅ Cursor integration เริ่มทำงานแล้ว")
    
    def stop_system(self):
        """หยุดระบบทั้งหมด"""
        print("⏹️ หยุดระบบ...")
        
        if hasattr(self.cursor_plugin, 'stop_watching'):
            self.cursor_plugin.stop_watching()
        
        if hasattr(self.security_integration, 'stop_monitoring'):
            self.security_integration.stop_monitoring()
        
        self.is_running = False
        print("✅ หยุดระบบเรียบร้อย")
    
    def get_system_status(self) -> Dict:
        """ดูสถานะระบบ"""
        return {
            'running': self.is_running,
            'projects_created': self.projects_created,
            'security_scans_performed': self.security_scans_performed,
            'workspace_path': str(self.workspace_path),
            'config': self.config
        }

# CLI Interface
def main():
    print("🚀 Complete Automation System - ฟรี 100%")
    print("=" * 60)
    print("ระบบ automation ครบเซ็ตที่รวมทุกอย่างเข้าด้วยกัน")
    print()
    
    # รับ workspace path
    workspace = input("📁 ใส่ path ของ workspace (หรือ Enter สำหรับ current directory): ").strip()
    if not workspace:
        workspace = os.getcwd()
    
    # สร้างระบบ
    system = CompleteAutomationSystem(workspace)
    
    # เริ่มต้น Cursor integration
    system.start_cursor_integration()
    
    print("\n🎉 ระบบพร้อมใช้งาน!")
    print("\n📋 วิธีใช้งาน:")
    print("1. เปิด Cursor AI")
    print("2. ดู Smart AI panel และ Security Monitor")
    print("3. พิมพ์พรอมต์สั้นๆ เช่น 'เพิ่มปุ่มเปลี่ยนภาษา'")
    print("4. กด 'สร้างโปรเจค' หรือใช้ CLI ด้านล่าง")
    
    try:
        while True:
            print("\n🛠️ เลือกการทำงาน:")
            print("1. สร้างโปรเจคใหม่")
            print("2. ดูสถานะระบบ")
            print("3. ตั้งค่าระบบ")
            print("4. ดูรายงานโปรเจค")
            print("5. ทำการสแกนความปลอดภัย")
            print("6. หยุดระบบ")
            
            choice = input("\nเลือก (1-6): ").strip()
            
            if choice == "1":
                prompt = input("💭 ใส่พรอมต์สำหรับโปรเจคใหม่: ").strip()
                if prompt:
                    print("\n🚀 เริ่มสร้างโปรเจค...")
                    result = system.process_automation_request(prompt)
                    
                    if result['success']:
                        print(f"✅ สร้างโปรเจคสำเร็จ: {result['project_name']}")
                        print(f"📁 ที่อยู่: {result['project_path']}")
                        print(f"📊 คะแนนประสิทธิภาพ: {result['performance_score']:.1f}/100")
                        
                        if 'deployment' in result and result['deployment']['success']:
                            if 'pages_url' in result['deployment']:
                                print(f"🌐 URL: {result['deployment']['pages_url']}")
                            else:
                                print("📋 ดูไฟล์ DEPLOYMENT_INSTRUCTIONS.md สำหรับการ deploy")
                    else:
                        print(f"❌ สร้างโปรเจคล้มเหลว: {result.get('error', 'Unknown error')}")
                
            elif choice == "2":
                status = system.get_system_status()
                print(f"\n📊 สถานะระบบ:")
                print(f"- กำลังทำงาน: {'✅' if status['running'] else '❌'}")
                print(f"- โปรเจคที่สร้าง: {status['projects_created']}")
                print(f"- การสแกนความปลอดภัย: {status['security_scans_performed']}")
                print(f"- Workspace: {status['workspace_path']}")
                
            elif choice == "3":
                print("\n⚙️ การตั้งค่าระบบ:")
                print(f"1. Auto Security Scan: {system.config['auto_security_scan']}")
                print(f"2. Auto Deploy: {system.config['auto_deploy']}")
                print(f"3. Security Level: {system.config['security_level']}")
                print(f"4. Max Projects/Day: {system.config['max_projects_per_day']}")
                
                setting = input("เลือกการตั้งค่าที่ต้องการเปลี่ยน (1-4) หรือ Enter เพื่อข้าม: ").strip()
                
                if setting == "1":
                    system.config['auto_security_scan'] = not system.config['auto_security_scan']
                    print(f"✅ Auto Security Scan: {system.config['auto_security_scan']}")
                elif setting == "2":
                    system.config['auto_deploy'] = not system.config['auto_deploy']
                    print(f"✅ Auto Deploy: {system.config['auto_deploy']}")
                elif setting == "3":
                    levels = ['low', 'medium', 'high']
                    current_index = levels.index(system.config['security_level'])
                    new_index = (current_index + 1) % len(levels)
                    system.config['security_level'] = levels[new_index]
                    print(f"✅ Security Level: {system.config['security_level']}")
                elif setting == "4":
                    try:
                        new_limit = int(input("ใส่จำนวนโปรเจคสูงสุดต่อวัน: "))
                        system.config['max_projects_per_day'] = new_limit
                        print(f"✅ Max Projects/Day: {new_limit}")
                    except ValueError:
                        print("❌ กรุณาใส่ตัวเลข")
                
                if setting in ['1', '2', '3', '4']:
                    system.save_config()
                
            elif choice == "4":
                reports_dir = system.workspace_path / "reports"
                if reports_dir.exists():
                    reports = list(reports_dir.glob("*.md"))
                    if reports:
                        print(f"\n📊 รายงานโปรเจค ({len(reports)} ไฟล์):")
                        for i, report in enumerate(reports[-5:], 1):  # แสดง 5 รายการล่าสุด
                            print(f"{i}. {report.name}")
                        
                        try:
                            choice_report = int(input("เลือกรายงานที่ต้องการดู (หรือ 0 เพื่อข้าม): "))
                            if 1 <= choice_report <= len(reports[-5:]):
                                selected_report = reports[-5:][choice_report - 1]
                                with open(selected_report, 'r', encoding='utf-8') as f:
                                    print(f"\n📄 {selected_report.name}:")
                                    print("=" * 50)
                                    print(f.read()[:1000] + "..." if len(f.read()) > 1000 else f.read())
                        except ValueError:
                            pass
                    else:
                        print("📭 ไม่มีรายงานโปรเจค")
                else:
                    print("📭 ไม่มีโฟลเดอร์รายงาน")
                
            elif choice == "5":
                print("\n🔍 เริ่มการสแกนความปลอดภัย...")
                security_result = system.security_system.scan_project_for_secrets()
                system.security_scans_performed += 1
                
                print(f"✅ สแกนเสร็จสิ้น:")
                print(f"- ไฟล์ที่สแกน: {security_result['total_files_scanned']}")
                print(f"- ปัญหาที่พบ: {len(security_result['issues_found'])}")
                print(f"- ระดับความเสี่ยง: {security_result['risk_level'].upper()}")
                
                if security_result['issues_found']:
                    print("\n🚨 ปัญหาที่พบ:")
                    for issue in security_result['issues_found'][:3]:  # แสดง 3 รายการแรก
                        print(f"  - {issue['file']} (บรรทัด {issue['line']})")
                
            elif choice == "6":
                system.stop_system()
                print("👋 ขอบคุณที่ใช้งาน Complete Automation System!")
                break
                
            else:
                print("❌ กรุณาเลือก 1-6")
                
    except KeyboardInterrupt:
        system.stop_system()
        print("\n\n👋 ขอบคุณที่ใช้งาน!")

if __name__ == "__main__":
    main()

