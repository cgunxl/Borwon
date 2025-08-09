#!/usr/bin/env python3
"""
สคริปต์ทดสอบระบบ Advanced Cursor AI
ทดสอบฟังก์ชันต่างๆ เพื่อให้แน่ใจว่าระบบทำงานได้ถูกต้อง
"""

import sys
import os
import json
import time
from pathlib import Path

# เพิ่ม path สำหรับ import
sys.path.append(str(Path(__file__).parent))

try:
    from advanced_cursor_ai_complete import AdvancedCursorAI
    print("✅ Import AdvancedCursorAI สำเร็จ")
except ImportError as e:
    print(f"❌ ไม่สามารถ import AdvancedCursorAI: {e}")
    sys.exit(1)

class SystemTester:
    def __init__(self):
        self.test_workspace = Path("test_workspace")
        self.test_workspace.mkdir(exist_ok=True)
        self.ai_system = AdvancedCursorAI(str(self.test_workspace))
        self.passed_tests = 0
        self.total_tests = 0
        
    def run_test(self, test_name: str, test_func):
        """รันการทดสอบแต่ละตัว"""
        print(f"\n🧪 ทดสอบ: {test_name}")
        print("-" * 50)
        
        self.total_tests += 1
        
        try:
            result = test_func()
            if result:
                print(f"✅ {test_name}: ผ่าน")
                self.passed_tests += 1
            else:
                print(f"❌ {test_name}: ไม่ผ่าน")
        except Exception as e:
            print(f"❌ {test_name}: ข้อผิดพลาด - {e}")
    
    def test_database_initialization(self):
        """ทดสอบการเริ่มต้นฐานข้อมูล"""
        try:
            # ตรวจสอบว่าไฟล์ฐานข้อมูลถูกสร้าง
            knowledge_db_exists = self.ai_system.knowledge_db.exists()
            projects_db_exists = self.ai_system.projects_db.exists()
            
            print(f"📊 Knowledge DB: {'✅' if knowledge_db_exists else '❌'}")
            print(f"📊 Projects DB: {'✅' if projects_db_exists else '❌'}")
            
            return knowledge_db_exists and projects_db_exists
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def test_workspace_setup(self):
        """ทดสอบการตั้งค่า workspace"""
        try:
            required_dirs = [
                self.test_workspace / ".cursor",
                self.test_workspace / ".cursor" / "extensions",
                self.test_workspace / "projects",
                self.test_workspace / "knowledge"
            ]
            
            all_exist = True
            for dir_path in required_dirs:
                exists = dir_path.exists()
                print(f"📁 {dir_path.name}: {'✅' if exists else '❌'}")
                if not exists:
                    all_exist = False
            
            return all_exist
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def test_knowledge_search(self):
        """ทดสอบการค้นหาความรู้"""
        try:
            print("🔍 ทดสอบการค้นหาความรู้...")
            
            # ทดสอบด้วย query ง่ายๆ
            test_query = "Python programming"
            results = self.ai_system.search_global_knowledge(test_query, max_sources=2)
            
            has_results = len(results.get('results', [])) > 0
            has_query = results.get('query') == test_query
            has_search_time = 'search_time' in results
            
            print(f"📊 มีผลลัพธ์: {'✅' if has_results else '❌'}")
            print(f"📊 Query ถูกต้อง: {'✅' if has_query else '❌'}")
            print(f"📊 มีเวลาค้นหา: {'✅' if has_search_time else '❌'}")
            print(f"📊 จำนวนผลลัพธ์: {len(results.get('results', []))}")
            
            return has_results and has_query and has_search_time
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def test_code_generation(self):
        """ทดสอบการสร้างโค้ด"""
        try:
            print("🛠️ ทดสอบการสร้างโค้ด...")
            
            # สร้างข้อมูลความรู้จำลอง
            mock_knowledge = {
                'query': 'สร้างเว็บไซต์',
                'results': [
                    {
                        'source': 'test',
                        'title': 'Test HTML',
                        'content': 'HTML tutorial content',
                        'relevance_score': 0.9
                    }
                ]
            }
            
            # ทดสอบการสร้างโค้ดเว็บไซต์
            test_prompt = "สร้างเว็บไซต์แนะนำตัว"
            code_result = self.ai_system.generate_script_from_knowledge(test_prompt, mock_knowledge)
            
            has_project_id = 'project_id' in code_result
            has_code = 'code' in code_result
            has_project_type = 'project_type' in code_result
            
            print(f"📊 มี Project ID: {'✅' if has_project_id else '❌'}")
            print(f"📊 มีโค้ด: {'✅' if has_code else '❌'}")
            print(f"📊 มีประเภทโปรเจค: {'✅' if has_project_type else '❌'}")
            
            if has_code:
                code = code_result['code']
                has_html = 'html' in code
                has_css = 'css' in code
                has_js = 'js' in code
                
                print(f"📊 มี HTML: {'✅' if has_html else '❌'}")
                print(f"📊 มี CSS: {'✅' if has_css else '❌'}")
                print(f"📊 มี JavaScript: {'✅' if has_js else '❌'}")
                
                return has_project_id and has_code and has_html and has_css
            
            return has_project_id and has_code and has_project_type
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def test_project_saving(self):
        """ทดสอบการบันทึกโปรเจค"""
        try:
            print("💾 ทดสอบการบันทึกโปรเจค...")
            
            # สร้างโค้ดทดสอบ
            test_code = {
                'html': '<html><body><h1>Test</h1></body></html>',
                'css': 'body { font-family: Arial; }',
                'js': 'console.log("Test");',
                'type': 'website'
            }
            
            # บันทึกโปรเจค
            project_id = self.ai_system.save_project("ทดสอบการบันทึก", test_code)
            
            # ตรวจสอบว่าได้ project_id
            has_project_id = project_id > 0
            print(f"📊 ได้ Project ID: {'✅' if has_project_id else '❌'} (ID: {project_id})")
            
            # ตรวจสอบว่าสามารถดึงข้อมูลกลับมาได้
            if has_project_id:
                project_data = self.ai_system._get_latest_project_data()
                has_data = project_data is not None
                print(f"📊 ดึงข้อมูลได้: {'✅' if has_data else '❌'}")
                
                if has_data:
                    print(f"📊 ชื่อโปรเจค: {project_data.get('name', 'ไม่มี')}")
                    print(f"📊 สถานะ: {project_data.get('status', 'ไม่มี')}")
                
                return has_project_id and has_data
            
            return has_project_id
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def test_command_file_creation(self):
        """ทดสอบการสร้างไฟล์คำสั่ง"""
        try:
            print("📝 ทดสอบการสร้างไฟล์คำสั่ง...")
            
            # สร้างไฟล์คำสั่งทดสอบ
            test_command = {
                "prompt": "ทดสอบระบบ",
                "action": "create",
                "timestamp": "2024-01-01T00:00:00"
            }
            
            command_file = self.ai_system.command_file
            with open(command_file, 'w', encoding='utf-8') as f:
                json.dump(test_command, f, indent=2, ensure_ascii=False)
            
            # ตรวจสอบว่าไฟล์ถูกสร้าง
            file_exists = command_file.exists()
            print(f"📊 ไฟล์คำสั่งถูกสร้าง: {'✅' if file_exists else '❌'}")
            
            # ตรวจสอบเนื้อหาไฟล์
            if file_exists:
                with open(command_file, 'r', encoding='utf-8') as f:
                    content = json.load(f)
                
                correct_content = content.get('prompt') == test_command['prompt']
                print(f"📊 เนื้อหาถูกต้อง: {'✅' if correct_content else '❌'}")
                
                return file_exists and correct_content
            
            return file_exists
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def test_stats_generation(self):
        """ทดสอบการสร้างสถิติ"""
        try:
            print("📊 ทดสอบการสร้างสถิติ...")
            
            stats = self.ai_system.get_stats()
            
            required_keys = ['total_searches', 'avg_search_time', 'total_projects', 'deployed_projects', 'success_rate']
            has_all_keys = all(key in stats for key in required_keys)
            
            print(f"📊 มีข้อมูลครบ: {'✅' if has_all_keys else '❌'}")
            
            if has_all_keys:
                for key, value in stats.items():
                    print(f"📊 {key}: {value}")
            
            return has_all_keys
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def test_project_deployment(self):
        """ทดสอบการ deploy โปรเจค"""
        try:
            print("🚀 ทดสอบการ deploy โปรเจค...")
            
            # สร้างข้อมูลโปรเจคทดสอบ
            test_project = {
                'id': 1,
                'name': 'ทดสอบ_deploy',
                'prompt': 'ทดสอบการ deploy',
                'status': 'pending',
                'code_html': '<html><body><h1>Test Deploy</h1></body></html>',
                'code_css': 'body { background: #f0f0f0; }',
                'code_js': 'console.log("Deploy test");',
                'created_at': '2024-01-01T00:00:00'
            }
            
            # ทดสอบการ deploy
            deploy_success = self.ai_system.deploy_to_github(test_project)
            
            print(f"📊 Deploy สำเร็จ: {'✅' if deploy_success else '❌'}")
            
            # ตรวจสอบว่าโฟลเดอร์โปรเจคถูกสร้าง
            if deploy_success:
                project_dir = self.test_workspace / "projects" / "ทดสอบ_deploy"
                dir_exists = project_dir.exists()
                print(f"📊 โฟลเดอร์โปรเจคถูกสร้าง: {'✅' if dir_exists else '❌'}")
                
                # ตรวจสอบไฟล์ที่สำคัญ
                if dir_exists:
                    html_exists = (project_dir / "index.html").exists()
                    css_exists = (project_dir / "style.css").exists()
                    js_exists = (project_dir / "script.js").exists()
                    readme_exists = (project_dir / "README.md").exists()
                    
                    print(f"📊 index.html: {'✅' if html_exists else '❌'}")
                    print(f"📊 style.css: {'✅' if css_exists else '❌'}")
                    print(f"📊 script.js: {'✅' if js_exists else '❌'}")
                    print(f"📊 README.md: {'✅' if readme_exists else '❌'}")
                    
                    return deploy_success and dir_exists and html_exists and readme_exists
                
                return deploy_success and dir_exists
            
            return deploy_success
        except Exception as e:
            print(f"ข้อผิดพลาด: {e}")
            return False
    
    def run_all_tests(self):
        """รันการทดสอบทั้งหมด"""
        print("🚀 เริ่มต้นการทดสอบระบบ Advanced Cursor AI")
        print("=" * 60)
        
        # รายการการทดสอบ
        tests = [
            ("การเริ่มต้นฐานข้อมูล", self.test_database_initialization),
            ("การตั้งค่า Workspace", self.test_workspace_setup),
            ("การค้นหาความรู้", self.test_knowledge_search),
            ("การสร้างโค้ด", self.test_code_generation),
            ("การบันทึกโปรเจค", self.test_project_saving),
            ("การสร้างไฟล์คำสั่ง", self.test_command_file_creation),
            ("การสร้างสถิติ", self.test_stats_generation),
            ("การ Deploy โปรเจค", self.test_project_deployment)
        ]
        
        # รันการทดสอบทั้งหมด
        for test_name, test_func in tests:
            self.run_test(test_name, test_func)
            time.sleep(1)  # หน่วงเวลาเล็กน้อยระหว่างการทดสอบ
        
        # สรุปผลการทดสอบ
        print("\n" + "=" * 60)
        print("📊 สรุปผลการทดสอบ")
        print("=" * 60)
        
        success_rate = (self.passed_tests / self.total_tests) * 100 if self.total_tests > 0 else 0
        
        print(f"✅ ผ่าน: {self.passed_tests}/{self.total_tests} การทดสอบ")
        print(f"📊 อัตราความสำเร็จ: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 ระบบทำงานได้ดี!")
        elif success_rate >= 60:
            print("⚠️ ระบบทำงานได้พอใช้ แต่ควรปรับปรุง")
        else:
            print("❌ ระบบมีปัญหา ต้องแก้ไข")
        
        return success_rate >= 80

def main():
    """ฟังก์ชันหลัก"""
    print("🧪 Advanced Cursor AI System - การทดสอบระบบ")
    print("สร้างโดย: Advanced Cursor AI Team")
    print("วันที่: 2024")
    print()
    
    # สร้างและรันการทดสอบ
    tester = SystemTester()
    success = tester.run_all_tests()
    
    # ทำความสะอาดไฟล์ทดสอบ
    print("\n🧹 ทำความสะอาดไฟล์ทดสอบ...")
    try:
        import shutil
        if tester.test_workspace.exists():
            shutil.rmtree(tester.test_workspace)
        print("✅ ทำความสะอาดเสร็จสิ้น")
    except Exception as e:
        print(f"⚠️ ไม่สามารถทำความสะอาดได้: {e}")
    
    # ส่งคืนผลลัพธ์
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()

