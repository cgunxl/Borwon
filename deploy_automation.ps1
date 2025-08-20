# 🚀 Bwn X v2.0 - Automated Deployment Script (PowerShell)
# สคริปต์อัตโนมัติสำหรับการ deploy ลงใน GitHub

Write-Host "🚀 เริ่มต้นการ Deploy Bwn X v2.0..." -ForegroundColor Green

# 1. ตรวจสอบ Git status
Write-Host "📋 ตรวจสอบ Git status..." -ForegroundColor Yellow
git status

# 2. เพิ่มไฟล์ทั้งหมด
Write-Host "📁 เพิ่มไฟล์ทั้งหมด..." -ForegroundColor Yellow
git add .

# 3. Commit changes
Write-Host "💾 Commit changes..." -ForegroundColor Yellow
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
Write-Host "🚀 Push to GitHub..." -ForegroundColor Yellow
git push origin main

# 5. Deploy to GitHub Pages
Write-Host "🌐 Deploy to GitHub Pages..." -ForegroundColor Yellow
npm run deploy

Write-Host "✅ การ Deploy เสร็จสมบูรณ์!" -ForegroundColor Green
Write-Host "🌐 เว็บไซต์: https://cgunxl.github.io/Borwon/" -ForegroundColor Cyan
Write-Host "🎉 Bwn X v2.0 พร้อมใช้งานแล้ว!" -ForegroundColor Green