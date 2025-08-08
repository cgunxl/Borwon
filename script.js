// Language translations
const translations = {
    th: {
        'site-title': 'บวร',
        'site-subtitle': 'เว็บไซต์สำหรับแนะนำต่างๆ',
        'hero-title': 'บวร',
        'hero-subtitle': 'แพลตฟอร์มแนะนำเครื่องมือและบริการที่ดีที่สุด สำหรับทุกความต้องการ',
        'stat-ai-tools': '100+',
        'stat-ai-label': 'AI Tools',
        'stat-categories': '3',
        'stat-categories-label': 'หมวดหมู่',
        'stat-free': '90+',
        'stat-free-label': 'เครื่องมือฟรี',
        'stat-languages': '2',
        'stat-languages-label': 'ภาษา',
        'categories-title': 'เลือกหมวดหมู่ที่สนใจ',
        'money-games-title': 'บวรมันนี่เกมส์',
        'money-games-desc': 'แพลตฟอร์มการเงิน ข่าวคริปโต หุ้น และการลงทุน พร้อมเทคนิคสร้างรายได้',
        'ai-master-title': 'บวรเอไอมาสเตอร์',
        'ai-master-desc': 'เครื่องมือ AI ครบ 100 ตัว ทั้งฟรีและพรีเมียม พร้อมคำแนะนำการใช้งาน',
        'deal-hunter-title': 'บวรดีลฮันเตอร์',
        'deal-hunter-desc': 'เทคนิคช้อปปิ้งประหยัด แพลตฟอร์มดีลดี และวิธีการซื้อให้คุ้มค่า',
        'coming-soon-title': '🚧 กำลังพัฒนา',
        'coming-soon-desc': 'เร็วๆ นี้!',
        'money-games-preview': 'แพลตฟอร์มการเงิน ข่าวคริปโต หุ้น และการลงทุน พร้อมเทคนิคสร้างรายได้',
        'ai-master-preview': 'เครื่องมือ AI ครบ 100 ตัว ทั้งฟรีและพรีเมียม พร้อมคำแนะนำการใช้งาน',
        'deal-hunter-preview': 'เทคนิคช้อปปิ้งประหยัด แพลตฟอร์มดีลดี และวิธีการซื้อให้คุ้มค่า',
        'footer-text': '© 2024 บวร - เว็บไซต์สำหรับแนะนำต่างๆ | สร้างด้วยเทคโนโลยีที่ทันสมัย',
        'ad-placeholder': 'พื้นที่สำหรับโฆษณา - จัดการแบบรวมศูนย์'
    },
    en: {
        'site-title': 'Borwan',
        'site-subtitle': 'Website for Various Recommendations',
        'hero-title': 'Borwan',
        'hero-subtitle': 'The Ultimate Platform for Tools and Services Recommendations for All Your Needs',
        'stat-ai-tools': '100+',
        'stat-ai-label': 'AI Tools',
        'stat-categories': '3',
        'stat-categories-label': 'Categories',
        'stat-free': '90+',
        'stat-free-label': 'Free Tools',
        'stat-languages': '2',
        'stat-languages-label': 'Languages',
        'categories-title': 'Choose Your Category',
        'money-games-title': 'Borwan Money Games',
        'money-games-desc': 'Financial Platforms, Crypto News, Stocks & Investment with Money-Making Techniques',
        'ai-master-title': 'Borwan AI Master',
        'ai-master-desc': '100+ AI Tools - Both Free and Premium with Usage Guidelines',
        'deal-hunter-title': 'Borwan Deal Hunter',
        'deal-hunter-desc': 'Smart Shopping Tips, Best Deal Platforms and Money-Saving Strategies',
        'coming-soon-title': '🚧 Under Development',
        'coming-soon-desc': 'Coming Soon!',
        'money-games-preview': 'Financial Platforms, Crypto News, Stocks & Investment with Money-Making Techniques',
        'ai-master-preview': '100+ AI Tools - Both Free and Premium with Usage Guidelines',
        'deal-hunter-preview': 'Smart Shopping Tips, Best Deal Platforms and Money-Saving Strategies',
        'footer-text': '© 2024 Borwan - Website for Various Recommendations | Built with Modern Technology',
        'ad-placeholder': 'Advertisement Space - Centralized Management'
    }
};

let currentLanguage = 'th';

// Language Functions
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('show');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.remove('show');
    
    // Update current language display
    const currentFlag = document.getElementById('current-flag');
    const currentLang = document.getElementById('current-lang');
    
    if (lang === 'th') {
        currentFlag.className = 'flag th';
        currentLang.textContent = 'ไทย';
    } else {
        currentFlag.className = 'flag us';
        currentLang.textContent = 'USA';
    }
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Modal Functions
function openModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Event Listeners
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close language dropdown when clicking outside
    const dropdown = document.getElementById('language-dropdown');
    if (!event.target.closest('.language-selector')) {
        dropdown.classList.remove('show');
    }
}

// Centralized Ad Management System
class AdManager {
    constructor() {
        this.adContainer = document.getElementById('ad-container');
        this.adCode = ''; // This will store the ad code
        this.init();
    }

    init() {
        // Initialize ad system
        this.loadAds();
    }

    loadAds() {
        // This function can be called to load/reload ads
        // Ad code can be updated here without touching other parts of the website
        if (this.adCode) {
            this.adContainer.innerHTML = this.adCode;
        } else {
            // Placeholder when no ad code is set
            this.adContainer.innerHTML = `<span data-translate="ad-placeholder">${translations[currentLanguage]['ad-placeholder']}</span>`;
        }
    }

    updateAdCode(newAdCode) {
        // Method to update ad code from external source
        this.adCode = newAdCode;
        this.loadAds();
    }
}

// Initialize Ad Manager
const adManager = new AdManager();

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    changeLanguage('th');
    handleScrollAnimations();
});

// Version Control Ready - All updates should be done through git
console.log('Borwan Website v2.0 - Scalable Architecture Ready');

