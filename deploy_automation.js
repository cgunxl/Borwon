#!/usr/bin/env node

// 🚀 Bwn X v2.0 - Automated Deployment Script (Node.js)
// สคริปต์อัตโนมัติสำหรับการ deploy ลงใน GitHub

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 เริ่มต้นการ Deploy Bwn X v2.0...');

// ฟังก์ชันสำหรับรันคำสั่ง
function runCommand(command, description) {
    try {
        console.log(`📋 ${description}...`);
        const result = execSync(command, { encoding: 'utf8' });
        console.log(`✅ ${description} สำเร็จ`);
        return result;
    } catch (error) {
        console.error(`❌ ${description} ล้มเหลว:`, error.message);
        process.exit(1);
    }
}

// ฟังก์ชันหลักสำหรับการ deploy
async function deployBwnX() {
    try {
        // 1. ตรวจสอบ Git status
        runCommand('git status', 'ตรวจสอบ Git status');

        // 2. เพิ่มไฟล์ทั้งหมด
        runCommand('git add .', 'เพิ่มไฟล์ทั้งหมด');

        // 3. Commit changes
        const commitMessage = `🚀 Update Bwn X to v2.0.0 with new features

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
Status: Ready for deployment ✅`;

        runCommand(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, 'Commit changes');

        // 4. Push to GitHub
        runCommand('git push origin main', 'Push to GitHub');

        // 5. Deploy to GitHub Pages
        runCommand('npm run deploy', 'Deploy to GitHub Pages');

        console.log('✅ การ Deploy เสร็จสมบูรณ์!');
        console.log('🌐 เว็บไซต์: https://cgunxl.github.io/Borwon/');
        console.log('🎉 Bwn X v2.0 พร้อมใช้งานแล้ว!');

    } catch (error) {
        console.error('❌ การ Deploy ล้มเหลว:', error.message);
        process.exit(1);
    }
}

// รันการ deploy
deployBwnX();