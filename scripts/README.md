# 📜 Scripts Directory - BORWON Futuristic Theme

> **สคริปต์สำหรับการพัฒนาและ deploy ธีม Futuristic**

## 🚀 Quick Start

### **1. Setup Scripts**
```bash
# ทำให้สคริปต์ใช้งานได้
chmod +x scripts/*.sh

# หรือใช้ Makefile
make setup
```

### **2. Development**
```bash
# เริ่ม development server
./scripts/dev.sh
# หรือ
make dev
```

### **3. Deploy**
```bash
# Deploy ไปยัง GitHub Pages
./scripts/deploy.sh
# หรือ
make deploy
```

## 📁 Available Scripts

### **🚀 `deploy.sh` - Full Deployment Script**
**หน้าที่**: Deploy ธีม Futuristic ไปยัง GitHub Pages แบบสมบูรณ์

**คุณสมบัติ**:
- ✅ ตรวจสอบ Node.js และ npm
- ✅ ติดตั้ง dependencies อัตโนมัติ
- ✅ Build โปรเจกต์
- ✅ Commit และ push ไปยัง GitHub
- ✅ แสดงสถานะการ deploy

**การใช้งาน**:
```bash
./scripts/deploy.sh
```

**ผลลัพธ์**:
- Build โปรเจกต์สำเร็จ
- Push โค้ดไปยัง GitHub
- GitHub Actions จะ deploy อัตโนมัติ

---

### **🔧 `dev.sh` - Development Helper Script**
**หน้าที่**: เครื่องมือช่วยในการพัฒนา ธีม Futuristic

**คุณสมบัติ**:
- 🚀 Start development server
- 🏗️ Build โปรเจกต์
- 👀 Preview build
- 🧪 Test components
- 🧹 Clean โปรเจกต์
- 🔄 Reset โปรเจกต์
- 📊 Analyze bundle
- 🔍 Check dependencies
- 📝 Format code
- ✅ Lint code
- 🎨 Theme customization guide
- 📱 Mobile testing guide
- 🚀 Quick deploy

**การใช้งาน**:
```bash
./scripts/dev.sh
```

**เมนูที่เลือกได้**:
1. **Start Development Server** - เริ่ม dev server
2. **Build Project** - Build โปรเจกต์
3. **Preview Build** - Preview build
4. **Test Components** - ทดสอบคอมโพเนนต์
5. **Clean Project** - ทำความสะอาด
6. **Reset Project** - รีเซ็ตโปรเจกต์
7. **Analyze Bundle** - วิเคราะห์ bundle
8. **Check Dependencies** - ตรวจสอบ dependencies
9. **Format Code** - จัดรูปแบบโค้ด
10. **Lint Code** - ตรวจสอบคุณภาพโค้ด
11. **Theme Customization** - คู่มือปรับแต่งธีม
12. **Mobile Testing** - คู่มือทดสอบมือถือ
13. **Quick Deploy** - Deploy เร็ว

---

## 🛠️ Makefile Commands

### **Development**
```bash
make dev          # Start development server
make build        # Build for production
make preview      # Preview production build
make test         # Test components and build
```

### **Maintenance**
```bash
make clean        # Clean build files
make reset        # Reset entire project
make install      # Install dependencies
```

### **Code Quality**
```bash
make format       # Format code with Prettier
make lint         # Lint code with ESLint
make analyze      # Analyze bundle size
```

### **Deployment**
```bash
make deploy       # Deploy to GitHub Pages
make deploy:quick # Quick deploy to GitHub
```

### **Utilities**
```bash
make mobile       # Mobile testing guide
make theme        # Theme customization guide
make status       # Check project status
make scripts      # Show available scripts
make setup        # Setup scripts permissions
```

## 📱 Usage Examples

### **เริ่มต้นการพัฒนา**
```bash
# 1. Setup scripts
make setup

# 2. เริ่ม development server
make dev

# 3. เปิดเบราว์เซอร์ไปที่ http://localhost:5173
```

### **Deploy ไปยัง GitHub Pages**
```bash
# 1. Deploy แบบสมบูรณ์
make deploy

# 2. หรือใช้สคริปต์
./scripts/deploy.sh

# 3. รอ GitHub Actions deploy อัตโนมัติ
```

### **ทดสอบคอมโพเนนต์**
```bash
# ทดสอบคอมโพเนนต์ทั้งหมด
make test

# หรือใช้สคริปต์
./scripts/dev.sh
# เลือกตัวเลือก 4
```

### **ปรับแต่งธีม**
```bash
# ดูคู่มือการปรับแต่งธีม
make theme

# หรือใช้สคริปต์
./scripts/dev.sh
# เลือกตัวเลือก 11
```

## 🔧 Script Features

### **✅ Error Handling**
- ตรวจสอบ Node.js version (ต้องเป็น 18+)
- ตรวจสอบ npm
- ตรวจสอบไฟล์ที่จำเป็น
- Exit เมื่อเกิด error

### **🎨 Colored Output**
- สีเขียว: Success
- สีแดง: Error
- สีเหลือง: Warning
- สีน้ำเงิน: Info
- สีม่วง: Highlight
- สีฟ้า: Code

### **📊 Progress Information**
- แสดงขั้นตอนการทำงาน
- แสดงสถานะแต่ละขั้นตอน
- แสดงผลลัพธ์ที่ได้
- แสดงข้อมูล bundle

### **🔄 Git Integration**
- ตรวจสอบ git repository
- Commit การเปลี่ยนแปลงอัตโนมัติ
- Push ไปยัง GitHub
- แสดงสถานะ git

## 🚀 Deployment Process

### **1. Build Phase**
```bash
npm install        # ติดตั้ง dependencies
npm run build     # Build โปรเจกต์
```

### **2. Git Phase**
```bash
git add .         # เพิ่มไฟล์ทั้งหมด
git commit        # Commit การเปลี่ยนแปลง
git push          # Push ไปยัง GitHub
```

### **3. GitHub Actions**
- เริ่มทำงานเมื่อ push ไปยัง main branch
- Build โปรเจกต์บน GitHub
- Deploy ไปยัง GitHub Pages
- อัปเดตเว็บไซต์อัตโนมัติ

## 📱 Mobile Testing

### **Local Network Testing**
```bash
# 1. เริ่ม dev server
make dev

# 2. หา IP address
ip addr show | grep inet

# 3. เข้าจากมือถือ
http://YOUR_IP:5173
```

### **Responsive Testing**
- ใช้ Chrome DevTools
- Toggle device toolbar
- เลือกขนาดหน้าจอต่างๆ
- ทดสอบ touch interactions

## 🎨 Theme Customization

### **เปลี่ยนสีหลัก**
```css
/* src/index.css */
:root {
  --accent-primary: #00D4FF; /* สีฟ้า */
  --accent-aqua: #00FF88;    /* สีเขียว */
}
```

### **ปรับความเร็วแอนิเมชัน**
```css
/* src/index.css */
.bg-waves::before {
  animation-duration: 8s; /* ค่าเริ่มต้น: 14s */
}
```

### **ปรับแต่ง Tailwind**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'accent': {
          'primary': '#00D4FF',
          'aqua': '#00FF88',
        }
      }
    }
  }
}
```

## 🔍 Troubleshooting

### **Script ไม่ทำงาน**
```bash
# ตรวจสอบสิทธิ์
ls -la scripts/

# ให้สิทธิ์การทำงาน
chmod +x scripts/*.sh

# หรือใช้ Makefile
make setup
```

### **Build ล้มเหลว**
```bash
# ทำความสะอาด
make clean

# รีเซ็ตโปรเจกต์
make reset

# ลองใหม่
make build
```

### **Git ไม่ทำงาน**
```bash
# ตรวจสอบ git status
git status

# ตรวจสอบ remote
git remote -v

# ตรวจสอบ branch
git branch -a
```

## 📚 Additional Resources

### **Documentation**
- `README.md` - เอกสารหลัก
- `FUTURISTIC_THEME_README.md` - คู่มือธีม
- `README_THAI.md` - คู่มือภาษาไทย
- `DEPLOYMENT_GUIDE.md` - คู่มือการ deploy

### **Configuration Files**
- `package.json` - Dependencies และ scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.js` - Vite configuration
- `.github/workflows/deploy.yml` - GitHub Actions

### **Live Website**
- **Website**: https://cgunxl.github.io/Borwon/
- **Demo**: https://cgunxl.github.io/Borwon/demo
- **Repository**: https://github.com/cgunxl/Borwon

---

## 🎉 **พร้อมใช้งาน!**

สคริปต์ทั้งหมดได้ถูกสร้างและตั้งค่าให้ใช้งานได้ทันที!

**เริ่มต้นใช้งาน**:
```bash
make setup    # Setup scripts
make help     # ดูคำสั่งทั้งหมด
make dev      # เริ่มพัฒนา
make deploy   # Deploy ไปยัง GitHub Pages
```

**🎨 ธีม Futuristic พร้อมใช้งานบน GitHub Pages!** 🚀✨