#!/usr/bin/env python3
"""
Demo การใช้งาน Advanced Cursor AI System
แสดงตัวอย่างการใช้งานจริงของระบบ
"""

import sys
import time
import json
from pathlib import Path

# เพิ่ม path สำหรับ import
sys.path.append(str(Path(__file__).parent))

from advanced_cursor_ai_complete import AdvancedCursorAI

def print_header(title: str):
    """พิมพ์หัวข้อสวยๆ"""
    print("\n" + "=" * 60)
    print(f"🚀 {title}")
    print("=" * 60)

def print_step(step: str):
    """พิมพ์ขั้นตอน"""
    print(f"\n📋 {step}")
    print("-" * 40)

def demo_basic_usage():
    """Demo การใช้งานพื้นฐาน"""
    print_header("Demo การใช้งานพื้นฐาน")
    
    # สร้างระบบ
    print_step("1. เริ่มต้นระบบ")
    ai_system = AdvancedCursorAI("demo_workspace")
    print("✅ สร้างระบบ Advanced Cursor AI สำเร็จ")
    
    # ทดสอบการค้นหาความรู้
    print_step("2. ค้นหาความรู้")
    query = "React JavaScript framework"
    print(f"🔍 ค้นหา: {query}")
    
    knowledge_results = ai_system.search_global_knowledge(query, max_sources=2)
    print(f"✅ พบ {len(knowledge_results.get('results', []))} ผลลัพธ์")
    print(f"⏱️ ใช้เวลา: {knowledge_results.get('search_time', 0):.2f} วินาที")
    
    # แสดงผลลัพธ์
    for i, result in enumerate(knowledge_results.get('results', [])[:2], 1):
        print(f"   {i}. {result.get('source', 'unknown')}: {result.get('title', 'ไม่มีหัวข้อ')}")
    
    # ทดสอบการสร้างโค้ด
    print_step("3. สร้างโค้ดจากความรู้")
    prompt = "สร้างเว็บไซต์ React แนะนำตัว"
    print(f"💻 สร้างโค้ดสำหรับ: {prompt}")
    
    script_result = ai_system.generate_script_from_knowledge(prompt, knowledge_results)
    print(f"✅ สร้างโปรเจค ID: {script_result.get('project_id', 'ไม่มี')}")
    print(f"📊 ประเภทโปรเจค: {script_result.get('project_type', 'ไม่ระบุ')}")
    
    # ทดสอบการ deploy
    print_step("4. Deploy โปรเจค")
    project_data = ai_system._get_latest_project_data()
    if project_data:
        deploy_success = ai_system.deploy_to_github(project_data)
        if deploy_success:
            print("✅ Deploy สำเร็จ!")
            project_dir = Path("demo_workspace/projects") / project_data['name'].replace(' ', '_').lower()
            print(f"📁 โปรเจคอยู่ที่: {project_dir}")
        else:
            print("❌ Deploy ล้มเหลว")
    
    # แสดงสถิติ
    print_step("5. สถิติการใช้งาน")
    stats = ai_system.get_stats()
    for key, value in stats.items():
        print(f"📊 {key}: {value}")
    
    return ai_system

def demo_command_simulation():
    """Demo การจำลองคำสั่งจาก Cursor"""
    print_header("Demo การจำลองคำสั่งจาก Cursor")
    
    ai_system = AdvancedCursorAI("demo_cursor_workspace")
    
    # สร้างคำสั่งตัวอย่าง
    commands = [
        {
            "prompt": "สร้าง API สำหรับจัดการข้อมูลผู้ใช้",
            "action": "create"
        },
        {
            "prompt": "สร้างเว็บไซต์ portfolio",
            "action": "create"
        },
        {
            "prompt": "สร้างสคริปต์ดึงข้อมูลจาก Twitter",
            "action": "create"
        }
    ]
    
    for i, command in enumerate(commands, 1):
        print_step(f"{i}. ประมวลผลคำสั่ง: {command['prompt']}")
        
        # เขียนคำสั่งลงไฟล์
        with open(ai_system.command_file, 'w', encoding='utf-8') as f:
            json.dump(command, f, indent=2, ensure_ascii=False)
        
        # จำลองการประมวลผล
        print("🔍 ค้นหาความรู้...")
        knowledge_results = ai_system.search_global_knowledge(command['prompt'], max_sources=1)
        
        print("🛠️ สร้างโค้ด...")
        script_result = ai_system.generate_script_from_knowledge(command['prompt'], knowledge_results)
        
        print(f"✅ สร้างโปรเจค ID: {script_result.get('project_id', 'ไม่มี')}")
        print(f"📊 ประเภท: {script_result.get('project_type', 'ไม่ระบุ')}")
        
        # หน่วงเวลาเล็กน้อย
        time.sleep(1)
    
    return ai_system

def demo_different_project_types():
    """Demo การสร้างโปรเจคประเภทต่างๆ"""
    print_header("Demo การสร้างโปรเจคประเภทต่างๆ")
    
    ai_system = AdvancedCursorAI("demo_projects_workspace")
    
    project_examples = [
        {
            "prompt": "สร้างเว็บไซต์ร้านอาหาร",
            "type": "website",
            "description": "เว็บไซต์แสดงเมนูและรับออเดอร์"
        },
        {
            "prompt": "สร้าง REST API สำหรับจัดการสินค้า",
            "type": "api",
            "description": "API สำหรับ CRUD operations"
        },
        {
            "prompt": "สร้างสคริปต์ backup ฐานข้อมูล",
            "type": "automation",
            "description": "สคริปต์สำหรับสำรองข้อมูลอัตโนมัติ"
        }
    ]
    
    for i, project in enumerate(project_examples, 1):
        print_step(f"{i}. สร้างโปรเจค: {project['type'].upper()}")
        print(f"📝 คำสั่ง: {project['prompt']}")
        print(f"📖 คำอธิบาย: {project['description']}")
        
        # ค้นหาความรู้
        knowledge_results = ai_system.search_global_knowledge(project['prompt'], max_sources=1)
        
        # สร้างโค้ด
        script_result = ai_system.generate_script_from_knowledge(project['prompt'], knowledge_results)
        
        # แสดงผลลัพธ์
        print(f"✅ สร้างเสร็จ - Project ID: {script_result.get('project_id', 'ไม่มี')}")
        
        # Deploy
        project_data = ai_system._get_latest_project_data()
        if project_data:
            deploy_success = ai_system.deploy_to_github(project_data)
            print(f"🚀 Deploy: {'✅ สำเร็จ' if deploy_success else '❌ ล้มเหลว'}")
        
        time.sleep(1)
    
    return ai_system

def demo_cursor_integration():
    """Demo การเชื่อมต่อกับ Cursor"""
    print_header("Demo การเชื่อมต่อกับ Cursor")
    
    ai_system = AdvancedCursorAI("demo_integration_workspace")
    
    print_step("1. เริ่มต้นการเชื่อมต่อ")
    print("📡 เริ่มต้นระบบติดตามคำสั่งจาก Cursor...")
    
    # สร้างไฟล์ตัวอย่าง
    ai_system.create_example_files()
    
    print_step("2. ไฟล์ที่สำคัญ")
    print(f"📄 ไฟล์คำสั่ง: {ai_system.command_file}")
    print(f"📄 ไฟล์ตอบกลับ: {ai_system.response_file}")
    print(f"📊 ฐานข้อมูลความรู้: {ai_system.knowledge_db}")
    print(f"📊 ฐานข้อมูลโปรเจค: {ai_system.projects_db}")
    
    print_step("3. ตัวอย่างการใช้งาน")
    print("💡 วิธีใช้งาน:")
    print("   1. แก้ไขไฟล์ .cursor_commands.json")
    print("   2. ระบบจะประมวลผลอัตโนมัติ")
    print("   3. ดูผลลัพธ์ใน .cursor_responses.json")
    
    # แสดงเนื้อหาไฟล์คำสั่งตัวอย่าง
    if ai_system.command_file.exists():
        with open(ai_system.command_file, 'r', encoding='utf-8') as f:
            command_content = f.read()
        print(f"\n📝 เนื้อหาไฟล์คำสั่งตัวอย่าง:")
        print(command_content)
    
    return ai_system

def demo_performance_test():
    """Demo การทดสอบประสิทธิภาพ"""
    print_header("Demo การทดสอบประสิทธิภาพ")
    
    ai_system = AdvancedCursorAI("demo_performance_workspace")
    
    test_queries = [
        "Python web development",
        "JavaScript React framework",
        "Node.js Express server",
        "HTML CSS responsive design",
        "Database MySQL queries"
    ]
    
    print_step("ทดสอบความเร็วการค้นหา")
    total_time = 0
    total_results = 0
    
    for i, query in enumerate(test_queries, 1):
        print(f"\n{i}. ค้นหา: {query}")
        
        start_time = time.time()
        results = ai_system.search_global_knowledge(query, max_sources=1)
        end_time = time.time()
        
        search_time = end_time - start_time
        result_count = len(results.get('results', []))
        
        print(f"   ⏱️ เวลา: {search_time:.2f} วินาที")
        print(f"   📊 ผลลัพธ์: {result_count} รายการ")
        
        total_time += search_time
        total_results += result_count
    
    print_step("สรุปผลการทดสอบ")
    avg_time = total_time / len(test_queries)
    avg_results = total_results / len(test_queries)
    
    print(f"📊 เวลาเฉลี่ย: {avg_time:.2f} วินาที/การค้นหา")
    print(f"📊 ผลลัพธ์เฉลี่ย: {avg_results:.1f} รายการ/การค้นหา")
    print(f"📊 เวลารวม: {total_time:.2f} วินาที")
    print(f"📊 ผลลัพธ์รวม: {total_results} รายการ")
    
    return ai_system

def main():
    """ฟังก์ชันหลัก"""
    print("🎬 Advanced Cursor AI System - Demo การใช้งาน")
    print("สร้างโดย: Advanced Cursor AI Team")
    print("วันที่: 2024")
    
    demos = [
        ("การใช้งานพื้นฐาน", demo_basic_usage),
        ("การจำลองคำสั่งจาก Cursor", demo_command_simulation),
        ("การสร้างโปรเจคประเภทต่างๆ", demo_different_project_types),
        ("การเชื่อมต่อกับ Cursor", demo_cursor_integration),
        ("การทดสอบประสิทธิภาพ", demo_performance_test)
    ]
    
    print("\n🎯 เลือก Demo ที่ต้องการ:")
    for i, (name, _) in enumerate(demos, 1):
        print(f"   {i}. {name}")
    print("   0. รันทั้งหมด")
    
    try:
        choice = input("\n👉 เลือก (0-5): ").strip()
        
        if choice == "0":
            # รันทั้งหมด
            for name, demo_func in demos:
                print(f"\n🎬 เริ่ม Demo: {name}")
                demo_func()
                input("\n⏸️ กด Enter เพื่อดู Demo ถัดไป...")
        elif choice in ["1", "2", "3", "4", "5"]:
            # รัน Demo ที่เลือก
            index = int(choice) - 1
            name, demo_func = demos[index]
            print(f"\n🎬 เริ่ม Demo: {name}")
            demo_func()
        else:
            print("❌ ตัวเลือกไม่ถูกต้อง")
            return
        
        print("\n🎉 Demo เสร็จสิ้น!")
        print("💡 ลองใช้งานระบบจริงได้ที่: python3 advanced_cursor_ai_complete.py")
        
    except KeyboardInterrupt:
        print("\n🛑 หยุด Demo")
    except Exception as e:
        print(f"\n❌ ข้อผิดพลาด: {e}")

if __name__ == "__main__":
    main()

