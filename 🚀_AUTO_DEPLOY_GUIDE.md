# 🚀 Bwn X v2.0 - Auto Deploy Guide

## ⚡ สคริปต์อัตโนมัติสำหรับการ Deploy

### 📁 ไฟล์ที่สร้างขึ้น:
- `deploy_automation.sh` - สคริปต์ Bash สำหรับ Linux/Mac
- `deploy_automation.ps1` - สคริปต์ PowerShell สำหรับ Windows
- `deploy_automation.js` - สคริปต์ Node.js สำหรับทุกระบบ
- `deploy_package.json` - Package สำหรับการ deploy อัตโนมัติ

## 🚀 วิธีใช้งาน:

### **วิธีที่ 1: ใช้สคริปต์ Bash (Linux/Mac)**
```bash
# ให้สิทธิ์การรัน
chmod +x deploy_automation.sh

# รันสคริปต์
./deploy_automation.sh
```

### **วิธีที่ 2: ใช้สคริปต์ PowerShell (Windows)**
```powershell
# รันสคริปต์
.\deploy_automation.ps1
```

### **วิธีที่ 3: ใช้สคริปต์ Node.js (ทุกระบบ)**
```bash
# ติดตั้ง dependencies
npm install

# รันสคริปต์
node deploy_automation.js
```

### **วิธีที่ 4: ใช้ Package Scripts**
```bash
# ติดตั้ง package
npm install -g deploy_package.json

# รันการ deploy อัตโนมัติ
npm run deploy:auto
```

## 📋 สิ่งที่สคริปต์จะทำ:

### **1. ตรวจสอบ Git Status**
- ตรวจสอบสถานะของ repository
- แสดงไฟล์ที่เปลี่ยนแปลง

### **2. เพิ่มไฟล์ทั้งหมด**
- `git add .` - เพิ่มไฟล์ทั้งหมดที่เปลี่ยนแปลง

### **3. Commit Changes**
- สร้าง commit message ที่ละเอียด
- รวมข้อมูลฟีเจอร์ใหม่ทั้งหมด

### **4. Push to GitHub**
- `git push origin main` - ส่งโค้ดไปยัง GitHub

### **5. Deploy to GitHub Pages**
- `npm run deploy` - deploy ไปยัง GitHub Pages

## 🎯 ฟีเจอร์ที่ Deploy:

### ✅ **ฟีเจอร์ใหม่ 6 ตัว:**
1. **🔍 Powerful Search System** - ระบบค้นหาข้อมูลแบบละเอียด
2. **📊 Advanced Analytics Dashboard** - แดชบอร์ดวิเคราะห์ข้อมูล
3. **📋 Comprehensive Data Table** - ตารางข้อมูลแบบครบครัน
4. **🔔 Real-time Notification System** - ระบบแจ้งเตือนแบบ real-time
5. **👤 User Profile Management** - จัดการโปรไฟล์ผู้ใช้
6. **🎨 Enhanced UI Components** - ธีมมืด/สว่าง และ responsive design

### 📁 **ไฟล์ที่อัปเดต:**
- `index.html` - อัปเดตเป็น v2.0.0
- `package.json` - อัปเดตเป็น v2.0.0
- `README.md` - อัปเดตเป็น v2.0.0
- โฟลเดอร์ `src/` ทั้งหมด
- โฟลเดอร์ `dist/` สำหรับ deploy

## 🚨 ข้อควรระวัง:

### **1. ตรวจสอบก่อน Deploy:**
- ต้องมี Git repository ที่เชื่อมต่อแล้ว
- ต้องมีสิทธิ์ในการ push ไปยัง GitHub
- ต้องมี GitHub Pages เปิดใช้งานแล้ว

### **2. การตั้งค่า:**
- ตรวจสอบ remote origin URL
- ตรวจสอบ branch ที่ใช้งาน
- ตรวจสอบ GitHub Pages settings

## 🔧 การแก้ไขปัญหา:

### **หาก Git ไม่ได้ตั้งค่า:**
```bash
# ตั้งค่า Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# เชื่อมต่อ remote repository
git remote add origin https://github.com/cgunxl/Borwon.git
```

### **หากไม่มีสิทธิ์ Push:**
- ตรวจสอบ GitHub access token
- ตรวจสอบ repository permissions
- ตรวจสอบ branch protection rules

## 📊 ผลลัพธ์ที่คาดหวัง:

### **หลังจากการ Deploy:**
- ✅ โค้ดอัปเดตใน GitHub
- ✅ เว็บไซต์อัปเดตที่ https://cgunxl.github.io/Borwon/
- ✅ ฟีเจอร์ใหม่ 6 ตัวพร้อมใช้งาน
- ✅ เวอร์ชัน 2.0.0 พร้อมใช้งาน

## 🎉 สรุป:

**สคริปต์อัตโนมัติพร้อมใช้งานแล้ว!**

เพียงรันสคริปต์เดียว ทุกอย่างจะถูก deploy อัตโนมัติ:
1. อัปเดตโค้ดใน GitHub
2. Deploy ไปยัง GitHub Pages
3. ฟีเจอร์ใหม่พร้อมใช้งาน

**เลือกสคริปต์ที่เหมาะสมกับระบบปฏิบัติการของท่านและรันเลยครับ!** 🚀

---
**สถานะ**: พร้อมใช้งาน ✅
**เวอร์ชัน**: 2.0.0
**ฟีเจอร์**: 6 ตัวใหม่
**การ Deploy**: อัตโนมัติ 100%