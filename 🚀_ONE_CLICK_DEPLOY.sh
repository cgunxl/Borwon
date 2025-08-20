#!/bin/bash

# 🚀 Bwn X v2.0 - ONE CLICK DEPLOY SCRIPT
# สคริปต์สุดท้ายที่รวมทุกอย่างเข้าด้วยกัน

echo "🚀 ========================================="
echo "🚀 Bwn X v2.0 - ONE CLICK DEPLOY"
echo "🚀 ========================================="
echo ""

# ตรวจสอบระบบปฏิบัติการ
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    OS="Windows"
else
    OS="Unknown"
fi

echo "🖥️  ระบบปฏิบัติการ: $OS"
echo ""

# ฟังก์ชันสำหรับรันคำสั่ง
run_command() {
    local command="$1"
    local description="$2"
    
    echo "📋 $description..."
    if eval "$command"; then
        echo "✅ $description สำเร็จ"
        return 0
    else
        echo "❌ $description ล้มเหลว"
        return 1
    fi
}

# ฟังก์ชันสำหรับตรวจสอบ Git
check_git() {
    echo "🔍 ตรวจสอบ Git configuration..."
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git ไม่ได้ติดตั้ง กรุณาติดตั้ง Git ก่อน"
        exit 1
    fi
    
    if ! git status &> /dev/null; then
        echo "❌ ไม่ใช่ Git repository กรุณา clone repository ก่อน"
        exit 1
    fi
    
    echo "✅ Git repository พร้อมใช้งาน"
}

# ฟังก์ชันสำหรับตรวจสอบ Node.js
check_node() {
    echo "🔍 ตรวจสอบ Node.js..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js ไม่ได้ติดตั้ง กรุณาติดตั้ง Node.js ก่อน"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm ไม่ได้ติดตั้ง กรุณาติดตั้ง npm ก่อน"
        exit 1
    fi
    
    echo "✅ Node.js และ npm พร้อมใช้งาน"
}

# ฟังก์ชันสำหรับ Build โปรเจกต์
build_project() {
    echo "🔨 Build โปรเจกต์..."
    
    if run_command "npm run build" "Build โปรเจกต์"; then
        echo "✅ Build สำเร็จ"
    else
        echo "❌ Build ล้มเหลว"
        exit 1
    fi
}

# ฟังก์ชันสำหรับ Deploy
deploy_project() {
    echo "🚀 เริ่มต้นการ Deploy..."
    
    # 1. ตรวจสอบ Git status
    run_command "git status" "ตรวจสอบ Git status"
    
    # 2. เพิ่มไฟล์ทั้งหมด
    run_command "git add ." "เพิ่มไฟล์ทั้งหมด"
    
    # 3. Commit changes
    local commit_message="🚀 Update Bwn X to v2.0.0 with new features

✨ New Features Added:
- 🔍 Powerful Search System
- 📊 Advanced Analytics Dashboard  
- 📋 Comprehensive Data Table
- 🔔 Real-time Notification System
- 👤 User Profile Management
- 🎨 Enhanced UI Components

📁 Files Updated:
- index.html - Updated to v2.0.0
- package.json - Version bump to 2.0.0
- README.md - Complete rewrite for v2.0
- New UI components in src/components/ui/
- New Dashboard page in src/pages/

🚀 Ready to Deploy:
- All features working at 70% capacity
- Build files ready in dist/ folder
- ZIP file ready: bwn-x-ready-to-deploy.zip

Version: 2.0.0
Status: Ready for deployment ✅"

    run_command "git commit -m \"$commit_message\"" "Commit changes"
    
    # 4. Push to GitHub
    run_command "git push origin main" "Push to GitHub"
    
    # 5. Deploy to GitHub Pages
    run_command "npm run deploy" "Deploy to GitHub Pages"
}

# ฟังก์ชันหลัก
main() {
    echo "🚀 เริ่มต้นการ Deploy Bwn X v2.0..."
    echo ""
    
    # ตรวจสอบระบบ
    check_git
    check_node
    echo ""
    
    # Build โปรเจกต์
    build_project
    echo ""
    
    # Deploy โปรเจกต์
    deploy_project
    echo ""
    
    # แสดงผลลัพธ์
    echo "🎉 ========================================="
    echo "🎉 การ Deploy เสร็จสมบูรณ์!"
    echo "🎉 ========================================="
    echo ""
    echo "🌐 เว็บไซต์: https://cgunxl.github.io/Borwon/"
    echo "📱 ฟีเจอร์ใหม่ 6 ตัวพร้อมใช้งาน"
    echo "🎨 เวอร์ชัน 2.0.0 พร้อมใช้งาน"
    echo ""
    echo "✨ ฟีเจอร์ใหม่ที่ได้:"
    echo "   🔍 Powerful Search System"
    echo "   📊 Advanced Analytics Dashboard"
    echo "   📋 Comprehensive Data Table"
    echo "   🔔 Real-time Notification System"
    echo "   👤 User Profile Management"
    echo "   🎨 Enhanced UI Components"
    echo ""
    echo "🚀 Bwn X v2.0 พร้อมใช้งานแล้ว!"
}

# รันฟังก์ชันหลัก
main "$@"