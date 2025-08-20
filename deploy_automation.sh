#!/bin/bash

# 🚀 Bwn X v2.0 - Automated Deployment Script
# สคริปต์อัตโนมัติสำหรับการ deploy ลงใน GitHub

echo "🚀 เริ่มต้นการ Deploy Bwn X v2.0..."

# 1. ตรวจสอบ Git status
echo "📋 ตรวจสอบ Git status..."
git status

# 2. เพิ่มไฟล์ทั้งหมด
echo "📁 เพิ่มไฟล์ทั้งหมด..."
git add .

# 3. Commit changes
echo "💾 Commit changes..."
git commit -m "🚀 Update Bwn X to v2.0.0 with new features

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

# 4. Push to GitHub
echo "🚀 Push to GitHub..."
git push origin main

# 5. Deploy to GitHub Pages
echo "🌐 Deploy to GitHub Pages..."
npm run deploy

echo "✅ การ Deploy เสร็จสมบูรณ์!"
echo "🌐 เว็บไซต์: https://cgunxl.github.io/Borwon/"
echo "🎉 Bwn X v2.0 พร้อมใช้งานแล้ว!"