# 🚀 ธีม Futuristic สำหรับเว็บ BORW

ธีมมืดแบบอนาคตที่มีเอฟเฟกต์คลื่นเคลื่อนไหว พื้นหลังแบบแอนิเมชัน และ UI/UX ที่ทันสมัย

## ✨ คุณสมบัติหลัก

### 🎨 **ระบบสีใหม่**
- **พื้นหลังมืดแบบกราไฟต์**: สีดำลึก (#0B0D10, #0F1115, #151922)
- **พื้นผิวสีเงินเทา**: ชั้นต่างๆ ที่มีความลึก (#1B202A, #222835)
- **เน้นสีมิ้นท์/เทียล**: สีสดใส (#00FFC6, #66FFF5)
- **เอฟเฟกต์เรืองแสง**: เงาและแสงที่นุ่มนวล

### 🌊 **พื้นหลังแบบแอนิเมชัน**
- **ระบบคลื่นหลายชั้น**: คลื่น Perlin + พารัลแลกซ์
- **เส้นสแกน**: เส้นแนวทแยงที่เคลื่อนไหวอย่างต่อเนื่อง
- **ระบบอนุภาค**: 80+ อนุภาคที่มีเอฟเฟกต์เรืองแสง
- **การเคลื่อนไหวต่อเนื่อง**: คลื่นพื้นหลังที่เคลื่อนไหวตลอดเวลา

### 🎭 **คอมโพเนนต์ UI**
- **ปุ่มแบบอนาคต**: หลายรูปแบบพร้อมเอฟเฟกต์ hover
- **การ์ดแบบแก้ว**: เอฟเฟกต์ blur พร้อมขอบเรืองแสง
- **อินพุตแบบแอนิเมชัน**: สถานะ focus ที่สวยงาม
- **เนวิเกชัน**: แถบด้านบนแบบโปร่งใสพร้อม blur

## 🛠️ การติดตั้ง

### **1. อัปเดต Tailwind Config**
```javascript
// tailwind.config.js
colors: {
  'bg': {
    'deep': '#0B0D10',
    'base': '#0F1115',
    'raised': '#151922'
  },
  'accent': {
    'primary': '#00FFC6',
    'aqua': '#66FFF5'
  }
}
```

### **2. อัปเดต CSS หลัก**
```css
/* src/index.css */
:root {
  --bg-deep: #0B0D10;
  --accent-primary: #00FFC6;
  --accent-aqua: #66FFF5;
}
```

### **3. ใช้คอมโพเนนต์ใหม่**
```jsx
import AnimatedBackground from './components/ui/AnimatedBackground';
import FuturisticButton from './components/ui/FuturisticButton';
import FuturisticCard from './components/ui/FuturisticCard';

// ครอบแอปด้วยพื้นหลังแบบแอนิเมชัน
<AnimatedBackground showWaves={true} showParticles={true}>
  <FuturisticButton variant="primary" size="lg">
    เริ่มต้นใช้งาน
  </FuturisticButton>
</AnimatedBackground>
```

## 🧩 คอมโพเนนต์ที่ใช้ได้

### **AnimatedBackground**
```jsx
<AnimatedBackground 
  showWaves={true}      // แสดงคลื่น
  showScanLines={true}  // แสดงเส้นสแกน
  showParticles={true}  // แสดงอนุภาค
  className="min-h-screen"
>
  {/* เนื้อหาของคุณ */}
</AnimatedBackground>
```

### **FuturisticButton**
```jsx
<FuturisticButton 
  variant="primary"     // primary, ghost, outline, icon, text
  size="lg"            // sm, md, lg, xl
  icon={<ArrowRight />}
  loading={false}
>
  คลิกที่นี่
</FuturisticButton>
```

### **FuturisticCard**
```jsx
<FuturisticCard hover={true} glow={true} glass={true}>
  <FuturisticCard.Header>
    <FuturisticCard.Title>หัวข้อการ์ด</FuturisticCard.Title>
    <FuturisticCard.Subtitle>คำอธิบายย่อย</FuturisticCard.Subtitle>
  </FuturisticCard.Header>
  <FuturisticCard.Body>
    เนื้อหาการ์ด
  </FuturisticCard.Body>
  <FuturisticCard.Footer>
    <FuturisticButton>ดำเนินการ</FuturisticButton>
  </FuturisticCard.Footer>
</FuturisticCard>
```

### **FuturisticInput**
```jsx
<FuturisticInput
  label="อีเมล"
  placeholder="กรอกอีเมลของคุณ"
  icon={<Mail />}
  iconPosition="left"
  error="อีเมลไม่ถูกต้อง"
  success="อีเมลถูกต้อง"
/>
```

## 🎯 ตัวอย่างการใช้งาน

### **หน้า Hero**
```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-waves" />
  <div className="scan-lines" />
  
  <div className="relative z-20 text-center">
    <h1 className="text-6xl font-bold text-gradient mb-6">
      ธีมอนาคต
    </h1>
    <FuturisticButton size="lg">
      เริ่มต้นใช้งาน
    </FuturisticButton>
  </div>
</section>
```

### **ตารางคุณสมบัติ**
```jsx
<div className="grid md:grid-cols-3 gap-8">
  <FuturisticCard className="text-center hover:scale-105">
    <div className="w-16 h-16 bg-accent-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <span className="text-3xl">🚀</span>
    </div>
    <h3 className="text-xl font-bold text-text-primary mb-4">คุณสมบัติ</h3>
    <p className="text-text-secondary">คำอธิบาย</p>
  </FuturisticCard>
</div>
```

## 🎨 การปรับแต่ง

### **เปลี่ยนสีหลัก**
```css
:root {
  --accent-primary: #00D4FF; /* สีฟ้า */
  --accent-aqua: #00FF88;    /* สีเขียว */
}
```

### **ปรับความเร็วแอนิเมชัน**
```css
/* คลื่นเร็วขึ้น */
.bg-waves::before {
  animation-duration: 8s; /* ค่าเริ่มต้น: 14s */
}

.bg-waves::after {
  animation-duration: 12s; /* ค่าเริ่มต้น: 22s */
}
```

### **เพิ่มจำนวนอนุภาค**
```javascript
// ใน AnimatedBackground.jsx
const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
```

## 📱 การตอบสนอง

### **การปรับแต่งสำหรับมือถือ**
- ลดจำนวนอนุภาคบนหน้าจอเล็ก
- ลดเอฟเฟกต์ blur สำหรับประสิทธิภาพ
- ปุ่มขนาดใหญ่สำหรับการสัมผัส
- แอนิเมชันที่เรียบง่ายขึ้น

### **จุดแตกหัก**
```css
@media (max-width: 768px) {
  .bg-waves::before,
  .bg-waves::after {
    filter: blur(12px); /* ลด blur */
  }
  
  .particle {
    width: 1px; /* อนุภาคเล็กลง */
    height: 1px;
  }
}
```

## ♿ การเข้าถึง

### **อัตราส่วนความคมชัด**
- **AA**: 4.5:1 สำหรับข้อความหลัก
- **AAA**: 7:1 สำหรับข้อความเล็กบนพื้นหลังมืด
- **ตัวบ่งชี้ Focus**: วงแหวนสีมิ้นท์ที่ชัดเจน

### **การตั้งค่าการเคลื่อนไหว**
```css
@media (prefers-reduced-motion: reduce) {
  .bg-waves::before,
  .bg-waves::after,
  .scan-lines,
  .particle {
    animation: none; /* ปิดการเคลื่อนไหว */
  }
}
```

### **โหมดความคมชัดสูง**
```css
@media (prefers-contrast: high) {
  .bg-waves::before,
  .bg-waves::after {
    opacity: 0.8; /* เพิ่มความชัดเจน */
  }
}
```

## 🚀 ประสิทธิภาพ

### **เคล็ดลับการเพิ่มประสิทธิภาพ**
- ลดจำนวนอนุภาคบนมือถือ
- หยุดแอนิเมชันหนักเมื่อแท็บไม่แสดง
- ใช้ CSS transforms แทนการเปลี่ยน layout
- ปรับปรุง Canvas และจำกัดการอัปเดตต่อเฟรม

### **การโหลดแบบขี้เกียจ**
```javascript
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // หยุดแอนิเมชันหนัก
    } else {
      // เริ่มแอนิเมชันใหม่
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

## 🔧 การพัฒนา

### **การติดตั้ง**
```bash
# ติดตั้ง dependencies
npm install

# เริ่มเซิร์ฟเวอร์พัฒนา
npm run dev

# สร้างสำหรับ production
npm run build
```

### **โครงสร้างไฟล์**
```
src/
├── components/
│   └── ui/
│       ├── AnimatedBackground.jsx
│       ├── FuturisticButton.jsx
│       ├── FuturisticCard.jsx
│       └── FuturisticInput.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── CategoryPage.jsx
│   └── DemoPage.jsx
├── index.css
└── App.jsx
```

### **หน้า Demo**
เยี่ยมชม `/demo` เพื่อดูคอมโพเนนต์ทั้งหมด:
- ปุ่มรูปแบบต่างๆ
- การ์ดและเอฟเฟกต์
- ฟอร์มอินพุต
- แสดงสีและแอนิเมชัน

## 🎭 การรองรับเบราว์เซอร์

- **เบราว์เซอร์สมัยใหม่**: Chrome 90+, Firefox 88+, Safari 14+
- **คุณสมบัติ CSS**: Backdrop-filter, CSS Grid, CSS Variables
- **JavaScript**: ES6+ features, Canvas API
- **การรองรับ**: การเสื่อมสภาพอย่างสง่างามสำหรับเบราว์เซอร์เก่า

## 📄 ลิขสิทธิ์

ธีมนี้เป็นส่วนหนึ่งของโปรเจกต์ Bwn X สงวนลิขสิทธิ์

## 🤝 การมีส่วนร่วม

1. Fork repository
2. สร้าง feature branch
3. ทำการเปลี่ยนแปลง
4. ทดสอบอย่างละเอียด
5. ส่ง pull request

## 📞 การสนับสนุน

สำหรับคำถามหรือการสนับสนุน:
- สร้าง issue บน GitHub
- ตรวจสอบหน้า demo ที่ `/demo`
- อ่านเอกสารคอมโพเนนต์

---

**สร้างด้วย ❤️ สำหรับอนาคตของการออกแบบเว็บ**