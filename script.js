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
    
    // Update all translatable elements (static keys)
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update generic i18n elements that define per-language text directly
    const i18nElements = document.querySelectorAll('[data-i18n-th], [data-i18n-en]');
    i18nElements.forEach(el => {
        const text = el.getAttribute(lang === 'th' ? 'data-i18n-th' : 'data-i18n-en');
        if (!text) return;
        // If element supports placeholder translation
        if (el.hasAttribute('data-placeholder-th') || el.hasAttribute('data-placeholder-en')) {
            const placeholder = el.getAttribute(lang === 'th' ? 'data-placeholder-th' : 'data-placeholder-en');
            if (placeholder) el.setAttribute('placeholder', placeholder);
        } else {
            el.textContent = text;
        }
    });

    // Ensure ad placeholder respects language
    const adContainer = document.getElementById('ad-container');
    if (adContainer && !adManager.adCode) {
        adContainer.innerHTML = `<span data-translate="ad-placeholder">${translations[currentLanguage]['ad-placeholder']}</span>`;
    }
}

// Modal Functions
function openModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.classList.remove('open');
        // force reflow to restart animation
        void content.offsetWidth;
        content.classList.add('open');
    }
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

// ---------------------------
// Dynamic AI Free Tools (90)
// ---------------------------
const freeToolsData = [
    // 1-10
    { id: 1, name: 'Perplexity AI', url: 'https://www.perplexity.ai', category: 'search', 
      thDesc: 'AI Chat, Search, Q&A — หาข้อมูล สรุป รวบประเด็น เหมาะกับนักเรียน นักวิจัย คอนเทนต์',
      enDesc: 'AI chat, search, and Q&A with quick summaries and sources. Great for students, researchers, and creators.',
      thSuitable: 'เหมาะกับ: นักเรียน, นักวิจัย, ครีเอเตอร์', enSuitable: 'Best for: Students, Researchers, Creators' },
    { id: 2, name: 'You.com', url: 'https://you.com', category: 'search',
      thDesc: 'Meta Search + Multi-AI — รวมฟีเจอร์ AI หลากหลาย, คนทั่วไป/สาย research',
      enDesc: 'Meta search with multiple AI features built in; good for general use and research.',
      thSuitable: 'เหมาะกับ: ผู้ใช้ทั่วไป, นักวิจัย', enSuitable: 'Best for: Everyone, Researchers' },
    { id: 3, name: 'Magic Studio', url: 'https://magicstudio.com', category: 'image',
      thDesc: 'ลบพื้นหลัง แต่งภาพ/AI BG — สำหรับโพสต์ ขายของ ทำปก',
      enDesc: 'Background removal and AI edits for posts, listings, and covers.',
      thSuitable: 'เหมาะกับ: ขายของออนไลน์, ครีเอเตอร์', enSuitable: 'Best for: Online sellers, Creators' },
    { id: 4, name: 'TTSMP3', url: 'https://ttsmp3.com', category: 'voice',
      thDesc: 'Text-to-Speech — ใส่ข้อความ รับเสียงพูดทันที, ครีเอเตอร์, TikTok',
      enDesc: 'Instant text-to-speech; great for creators and TikTok.',
      thSuitable: 'เหมาะกับ: ครีเอเตอร์, TikTok', enSuitable: 'Best for: Creators, TikTok' },
    { id: 5, name: 'Cleanup.pictures', url: 'https://cleanup.pictures', category: 'image',
      thDesc: 'ลบสิ่งรบกวนในรูป — แก้ภาพเร็ว, คนทำคอนเทนต์',
      enDesc: 'Remove unwanted objects in pictures; fast cleanup for content creators.',
      thSuitable: 'เหมาะกับ: คนทำคอนเทนต์', enSuitable: 'Best for: Content creators' },
    { id: 6, name: 'Unscreen', url: 'https://www.unscreen.com', category: 'video',
      thDesc: 'ลบ BG วิดีโอ — สายคลิป, YouTube, สอนออนไลน์',
      enDesc: 'Remove video background; perfect for clips, YouTube, teaching.',
      thSuitable: 'เหมาะกับ: วิดีโอ, ยูทูบ, สอน', enSuitable: 'Best for: Video, YouTube, Teaching' },
    { id: 7, name: 'Tome', url: 'https://tome.app', category: 'presentation',
      thDesc: 'AI Presentation — สร้างสไลด์อัตโนมัติ, พรีเซนต์, นักศึกษา',
      enDesc: 'Auto-generate slides; ideal for presentations and students.',
      thSuitable: 'เหมาะกับ: นักศึกษา, พรีเซนต์', enSuitable: 'Best for: Students, Presenters' },
    { id: 8, name: 'Cartoonize.net', url: 'https://www.cartoonize.net', category: 'image',
      thDesc: 'เปลี่ยนรูปเป็นการ์ตูน — โซเชียล, ยูทูปเด็ก',
      enDesc: 'Turn photos into cartoon style; fun for socials and kids YouTube.',
      thSuitable: 'เหมาะกับ: โซเชียล, เด็ก', enSuitable: 'Best for: Socials, Kids' },
    { id: 9, name: 'TinyWow', url: 'https://tinywow.com', category: 'design',
      thDesc: 'รวม AI Utility: แปลงไฟล์, เขียน, ตัดต่อ — Blogger, Creator',
      enDesc: 'All-in-one utilities: file convert, writing, editing.',
      thSuitable: 'เหมาะกับ: บล็อกเกอร์, ครีเอเตอร์', enSuitable: 'Best for: Bloggers, Creators' },
    { id: 10, name: 'ToolBaz AI Writer', url: 'https://toolbaz.com/writer/ai-writer', category: 'writing',
      thDesc: 'เขียนบทความ — Blogger, SEO',
      enDesc: 'Article writing assistant for bloggers and SEO.',
      thSuitable: 'เหมาะกับ: Blogger, SEO', enSuitable: 'Best for: Bloggers, SEO' },
    // 11-20
    { id: 11, name: 'Photopea', url: 'https://www.photopea.com', category: 'image', thDesc: 'แต่งภาพแบบ Photoshop ฟรี — ออกแบบ โปสเตอร์, รูปปก', enDesc: 'Free Photoshop-like editor for posters and covers.', thSuitable: 'เหมาะกับ: ออกแบบ, ปก', enSuitable: 'Best for: Design, Covers' },
    { id: 12, name: 'Remove.bg', url: 'https://remove.bg', category: 'image', thDesc: 'ลบ BG ภาพ — คอนเทนต์ขายของ ภาพสินค้า', enDesc: 'Remove image background for product shots.', thSuitable: 'เหมาะกับ: ภาพสินค้า', enSuitable: 'Best for: Product photos' },
    { id: 13, name: 'Scribble Diffusion', url: 'https://scribblediffusion.com', category: 'drawing', thDesc: 'AI วาดภาพจากสเก็ตซ์ — ไอเดีย, อินโฟกราฟิก', enDesc: 'Generate art from scribbles for ideas/infographics.', thSuitable: 'เหมาะกับ: ไอเดีย, อินโฟ', enSuitable: 'Best for: Ideas, Infographics' },
    { id: 14, name: 'Pixlr X / E', url: 'https://pixlr.com', category: 'image', thDesc: 'แต่งภาพออนไลน์ AI — IG, FB, TikTok', enDesc: 'Online AI photo editor for IG/FB/TikTok.', thSuitable: 'เหมาะกับ: โซเชียล', enSuitable: 'Best for: Social' },
    { id: 15, name: 'Leonardo.Ai (Demo)', url: 'https://app.leonardo.ai', category: 'image', thDesc: 'วาดภาพ AI, Fantasy — Gamer, NFT', enDesc: 'AI art demo; fantasy styles for gamers/NFT.', thSuitable: 'เหมาะกับ: เกมเมอร์, NFT', enSuitable: 'Best for: Gamers, NFT' },
    { id: 16, name: 'KREA AI', url: 'https://krea.ai', category: 'image', thDesc: 'วาด Art, UI, Moodboard — Designer', enDesc: 'Art/UI/moodboards for designers.', thSuitable: 'เหมาะกับ: ดีไซเนอร์', enSuitable: 'Best for: Designers' },
    { id: 17, name: 'Gencraft', url: 'https://gencraft.com', category: 'image', thDesc: 'AI Art Text2Image — ปกคลิป, โพสต์ไวรัล', enDesc: 'Text-to-image for thumbnails and viral posts.', thSuitable: 'เหมาะกับ: ปกคลิป, โพสต์', enSuitable: 'Best for: Thumbnails, Posts' },
    { id: 18, name: 'Playground AI', url: 'https://playgroundai.com', category: 'image', thDesc: 'วาด Art แนว Stable Diffusion — Poster, Moodboard', enDesc: 'Stable Diffusion playground for posters/moods.', thSuitable: 'เหมาะกับ: โปสเตอร์, มู้ดบอร์ด', enSuitable: 'Best for: Posters, Moodboards' },
    { id: 19, name: 'AutoDraw', url: 'https://www.autodraw.com', category: 'drawing', thDesc: 'AI วาดรูปมือเป็นภาพ vector — โลโก้ ไอคอน', enDesc: 'Turns sketches into vector-like icons/logos.', thSuitable: 'เหมาะกับ: โลโก้, ไอคอน', enSuitable: 'Best for: Logos, Icons' },
    { id: 20, name: 'Craiyon', url: 'https://www.craiyon.com', category: 'image', thDesc: 'วาดภาพ AI จาก prompt ง่าย — ปก TikTok', enDesc: 'Prompt-based image generator for covers.', thSuitable: 'เหมาะกับ: ปก TikTok', enSuitable: 'Best for: TikTok covers' },
    // 21-30
    { id: 21, name: 'DeepL Translator', url: 'https://www.deepl.com/translator', category: 'translation', thDesc: 'แปลภาษา AI แม่นยำมาก — นักเรียน, สายแปล', enDesc: 'Accurate AI translation; great for students and translators.', thSuitable: 'เหมาะกับ: นักเรียน, นักแปล', enSuitable: 'Best for: Students, Translators' },
    { id: 22, name: 'LingvaNex', url: 'https://lingvanex.com', category: 'translation', thDesc: 'แปลข้อความทันใจ — แชทลูกค้าต่างชาติ', enDesc: 'Instant text translation for multilingual chats.', thSuitable: 'เหมาะกับ: แชทลูกค้าต่างชาติ', enSuitable: 'Best for: Customer chats' },
    { id: 23, name: 'FreeTTS', url: 'https://freetts.com', category: 'voice', thDesc: 'แปลงข้อความเป็นเสียง — สร้าง voice over', enDesc: 'Text to speech for voiceovers.', thSuitable: 'เหมาะกับ: วอยซ์โอเวอร์', enSuitable: 'Best for: Voiceovers' },
    { id: 24, name: 'VoiceMaker', url: 'https://voicemaker.in', category: 'voice', thDesc: 'เสียง AI หลายแบบ — คลิปเล่านิทาน', enDesc: 'Many AI voices; ideal for narrated clips.', thSuitable: 'เหมาะกับ: นิทาน', enSuitable: 'Best for: Storytelling' },
    { id: 25, name: 'Voicechanger.io', url: 'https://voicechanger.io', category: 'voice', thDesc: 'แปลงเสียง AI, Sound FX — เล่น, กิมมิก', enDesc: 'AI voice changer and effects for fun and gimmicks.', thSuitable: 'เหมาะกับ: เล่น, กิมมิก', enSuitable: 'Best for: Fun' },
    { id: 26, name: 'Online Video Cutter', url: 'https://online-video-cutter.com', category: 'video', thDesc: 'ตัดต่อคลิปออนไลน์ — ไม่ต้องโหลดโปรแกรม', enDesc: 'Online video cutter; no install needed.', thSuitable: 'เหมาะกับ: ตัดคลิปด่วน', enSuitable: 'Best for: Quick edits' },
    { id: 27, name: 'Kapwing (Free Tier)', url: 'https://www.kapwing.com', category: 'video', thDesc: 'ตัดต่อคลิป, ทำ meme — Creator มือใหม่', enDesc: 'Edit videos and memes; beginner-friendly.', thSuitable: 'เหมาะกับ: มือใหม่', enSuitable: 'Best for: Beginners' },
    { id: 28, name: 'VEED.IO (Free Tier)', url: 'https://www.veed.io', category: 'video', thDesc: 'ตัดต่อวิดีโอออนไลน์ — ทำ Sub, ตัดคลิป', enDesc: 'Online editor for subtitles and cuts.', thSuitable: 'เหมาะกับ: ทำซับ, ตัด', enSuitable: 'Best for: Subtitles, Cuts' },
    { id: 29, name: 'Lumen5 (Free Tier)', url: 'https://www.lumen5.com', category: 'video', thDesc: 'สร้างคลิปจากบทความ — Blogger, TikTok', enDesc: 'Make videos from articles; good for blogs/TikTok.', thSuitable: 'เหมาะกับ: บล็อก, TikTok', enSuitable: 'Best for: Blogs, TikTok' },
    { id: 30, name: 'Animoto', url: 'https://animoto.com', category: 'video', thDesc: 'สร้าง Video Presentation — ขาย, สื่อสาร', enDesc: 'Create video presentations for sales/comms.', thSuitable: 'เหมาะกับ: ขาย, สื่อสาร', enSuitable: 'Best for: Sales, Comms' },
    // 31-40
    { id: 31, name: 'Canva Free (AI Feature)', url: 'https://www.canva.com', category: 'design', thDesc: 'ออกแบบ ภาพ, Presentation, Reel — ทุกสายงาน', enDesc: 'Design images, slides, reels; works for everyone.', thSuitable: 'เหมาะกับ: ทุกสายงาน', enSuitable: 'Best for: Everyone' },
    { id: 32, name: 'EasySlides AI', url: 'https://www.easyslides.ai', category: 'presentation', thDesc: 'ทำสไลด์ AI — สอน, ขาย, สรุป', enDesc: 'AI slide maker for teaching, sales, summaries.', thSuitable: 'เหมาะกับ: สอน, ขาย', enSuitable: 'Best for: Teaching, Sales' },
    { id: 33, name: 'Descript (Demo)', url: 'https://www.descript.com', category: 'video', thDesc: 'แก้เสียง/วิดีโอจากข้อความ — Podcast, Youtuber', enDesc: 'Edit audio/video via text; great for podcasts and YouTube.', thSuitable: 'เหมาะกับ: พอดแคสต์, ยูทูบ', enSuitable: 'Best for: Podcasts, YouTube' },
    { id: 34, name: 'Otter.ai (Free Tier)', url: 'https://otter.ai', category: 'transcription', thDesc: 'AI สรุปเสียง/ถอดเทป — นักเรียน ประชุม', enDesc: 'Summarize and transcribe speech; for students/meetings.', thSuitable: 'เหมาะกับ: นักเรียน, ประชุม', enSuitable: 'Best for: Students, Meetings' },
    { id: 35, name: 'Google Bard (ไทย/ENG)', url: 'https://bard.google.com', category: 'chat', thDesc: 'AI Chat, Code, Research — สายวิเคราะห์', enDesc: 'AI chat for analysis, code, research.', thSuitable: 'เหมาะกับ: วิเคราะห์', enSuitable: 'Best for: Analysis' },
    { id: 36, name: 'Futurepedia', url: 'https://www.futurepedia.io', category: 'search', thDesc: 'รวมแหล่ง AI ฟรีหลายพัน — ค้นหา AI เจาะกลุ่ม', enDesc: 'Directory of thousands of AI tools.', thSuitable: 'เหมาะกับ: ค้นหา AI', enSuitable: 'Best for: Finding tools' },
    { id: 37, name: 'AIxploria Directory', url: 'https://www.aixploria.com/en/free-ai/', category: 'search', thDesc: 'คลัง AI ฟรี ค้นหาตามหมวด — Dev, Creator', enDesc: 'Free AI directory by categories.', thSuitable: 'เหมาะกับ: Dev, Creator', enSuitable: 'Best for: Devs, Creators' },
    { id: 38, name: 'QuillBot (บางฟีเจอร์ฟรี)', url: 'https://quillbot.com', category: 'writing', thDesc: 'ปรับสำนวน/Paraphrase — งานเขียน, วิทยานิพนธ์', enDesc: 'Paraphrasing; writing and thesis.', thSuitable: 'เหมาะกับ: งานเขียน', enSuitable: 'Best for: Writing' },
    { id: 39, name: 'TinyPNG', url: 'https://tinypng.com', category: 'design', thDesc: 'บีบอัดรูป — คนออกแบบ, สายเว็บ', enDesc: 'Compress images for web/design.', thSuitable: 'เหมาะกับ: เว็บ, ดีไซน์', enSuitable: 'Best for: Web, Design' },
    { id: 40, name: 'Pimeyes', url: 'https://pimeyes.com', category: 'search', thDesc: 'AI ค้นหาหน้าคล้ายในรูป — เช็คความปลอดภัย', enDesc: 'Find similar faces; safety checks.', thSuitable: 'เหมาะกับ: ความปลอดภัย', enSuitable: 'Best for: Safety' },
    // 41-50
    { id: 41, name: 'Remove.ai', url: 'https://www.remove.ai', category: 'image', thDesc: 'ลบ BG AI เพิ่มเติม — คนขายของ', enDesc: 'Extra background removal for sellers.', thSuitable: 'เหมาะกับ: ขายของ', enSuitable: 'Best for: Sellers' },
    { id: 42, name: 'Socratic by Google', url: 'https://socratic.org', category: 'chat', thDesc: 'AI แก้โจทย์ คณิต วิทย์ — นักเรียน', enDesc: 'Solve math/science with guidance.', thSuitable: 'เหมาะกับ: นักเรียน', enSuitable: 'Best for: Students' },
    { id: 43, name: 'Explainpaper', url: 'https://www.explainpaper.com', category: 'writing', thDesc: 'AI สรุปเปเปอร์วิชาการ — สายวิจัย', enDesc: 'Summarize academic papers.', thSuitable: 'เหมาะกับ: วิจัย', enSuitable: 'Best for: Research' },
    { id: 44, name: 'Slidesgo', url: 'https://slidesgo.com', category: 'presentation', thDesc: 'เทมเพลตสไลด์ AI — คุณครู, วิทยากร', enDesc: 'AI-ready slide templates for teachers/speakers.', thSuitable: 'เหมาะกับ: ครู, วิทยากร', enSuitable: 'Best for: Teachers, Speakers' },
    { id: 45, name: 'Looka Logo Maker', url: 'https://looka.com/logo-maker', category: 'design', thDesc: 'สร้างโลโก้ — ธุรกิจ, ยูทูบเบอร์', enDesc: 'Logo design for businesses/YouTubers.', thSuitable: 'เหมาะกับ: ธุรกิจ', enSuitable: 'Best for: Business' },
    { id: 46, name: 'Brandmark.io', url: 'https://brandmark.io', category: 'design', thDesc: 'AI ออกแบบโลโก้ — สตาร์ทอัพ', enDesc: 'AI logo design for startups.', thSuitable: 'เหมาะกับ: สตาร์ทอัพ', enSuitable: 'Best for: Startups' },
    { id: 47, name: 'Resume.io', url: 'https://resume.io', category: 'writing', thDesc: 'AI สร้าง Resume CV — เด็กจบใหม่', enDesc: 'Resume builder for fresh grads.', thSuitable: 'เหมาะกับ: เด็กจบใหม่', enSuitable: 'Best for: New grads' },
    { id: 48, name: 'ChatPDF', url: 'https://www.chatpdf.com', category: 'chat', thDesc: 'Chat กับไฟล์ PDF — สรุปเล่มหนา', enDesc: 'Chat with PDFs to summarize long docs.', thSuitable: 'เหมาะกับ: เอกสารหนา', enSuitable: 'Best for: Long docs' },
    { id: 49, name: 'PDFgear', url: 'https://pdfgear.com', category: 'design', thDesc: 'แก้ไข+อ่าน PDF ด้วย AI — สายเอกสาร', enDesc: 'AI-assisted PDF editing and reading.', thSuitable: 'เหมาะกับ: เอกสาร', enSuitable: 'Best for: Documents' },
    { id: 50, name: 'Summarize.tech', url: 'https://www.summarize.tech', category: 'chat', thDesc: 'AI สรุป YouTube — นักศึกษา, Youtuber', enDesc: 'Summarize YouTube videos quickly.', thSuitable: 'เหมาะกับ: นักศึกษา, ยูทูบ', enSuitable: 'Best for: Students, YouTubers' },
    // 51-60
    { id: 51, name: 'Talk to Books', url: 'https://books.google.com/talktobooks', category: 'chat', thDesc: 'ถาม-ตอบกับหนังสือ — นักอ่าน', enDesc: 'Q&A over books; explore ideas.', thSuitable: 'เหมาะกับ: นักอ่าน', enSuitable: 'Best for: Readers' },
    { id: 52, name: 'AI Dungeon', url: 'https://play.aidungeon.io', category: 'chat', thDesc: 'เกมสร้างเรื่องเล่า AI — เกมเมอร์', enDesc: 'AI storytelling game; creative play.', thSuitable: 'เหมาะกับ: เกมเมอร์', enSuitable: 'Best for: Gamers' },
    { id: 53, name: 'ChatDOC', url: 'https://www.chatdoc.com', category: 'chat', thDesc: 'Chat กับเอกสาร — สายวิเคราะห์', enDesc: 'Chat with documents for analysis.', thSuitable: 'เหมาะกับ: วิเคราะห์', enSuitable: 'Best for: Analysis' },
    { id: 54, name: 'TTSMaker', url: 'https://ttsmaker.com', category: 'voice', thDesc: 'แปลงข้อความเป็นเสียง AI — สร้าง audio clip', enDesc: 'Text-to-speech for audio clips.', thSuitable: 'เหมาะกับ: คลิปเสียง', enSuitable: 'Best for: Audio clips' },
    { id: 55, name: 'Veed.io (Free Tier)', url: 'https://www.veed.io', category: 'video', thDesc: 'AI Video Editor — ตัดต่อ TikTok', enDesc: 'AI video editor for TikTok.', thSuitable: 'เหมาะกับ: TikTok', enSuitable: 'Best for: TikTok' },
    { id: 56, name: 'Visla', url: 'https://www.visla.us', category: 'video', thDesc: 'AI ตัดต่อวิดีโอ, Subtitle — คลิปไวรัล', enDesc: 'AI editing with subtitles; viral clips.', thSuitable: 'เหมาะกับ: คลิปไวรัล', enSuitable: 'Best for: Viral clips' },
    { id: 57, name: 'HeyGen (Demo)', url: 'https://www.heygen.com', category: 'video', thDesc: 'AI วิดีโออวตาร — Presentation', enDesc: 'Avatar videos for presentations.', thSuitable: 'เหมาะกับ: พรีเซนต์', enSuitable: 'Best for: Presentations' },
    { id: 58, name: 'Mubert', url: 'https://mubert.com', category: 'voice', thDesc: 'AI Music Generator — เพลงประกอบ', enDesc: 'AI music generator for background tracks.', thSuitable: 'เหมาะกับ: เพลงประกอบ', enSuitable: 'Best for: Background music' },
    { id: 59, name: 'Beatoven.ai', url: 'https://www.beatoven.ai', category: 'voice', thDesc: 'AI ทำเพลง background — Youtuber', enDesc: 'Background music generation; YouTubers.', thSuitable: 'เหมาะกับ: ยูทูบ', enSuitable: 'Best for: YouTubers' },
    { id: 60, name: 'BHuman', url: 'https://bhuman.ai', category: 'video', thDesc: 'AI Video Personalization — ส่งวิดีโอรายบุคคล', enDesc: 'Personalized AI videos for outreach.', thSuitable: 'เหมาะกับ: ส่งวิดีโอ', enSuitable: 'Best for: Outreach' },
    // 61-70
    { id: 61, name: 'Vidyo.ai', url: 'https://vidyo.ai', category: 'video', thDesc: 'AI ตัดคลิปยาวเป็นสั้น — Reels, Shorts', enDesc: 'Cut long videos into shorts.', thSuitable: 'เหมาะกับ: Reels, Shorts', enSuitable: 'Best for: Reels, Shorts' },
    { id: 62, name: 'Synthesia (Demo)', url: 'https://www.synthesia.io', category: 'video', thDesc: 'AI วิดีโอพรีเซนเตอร์ — คลิปบริษัท', enDesc: 'AI presenter videos for companies.', thSuitable: 'เหมาะกับ: บริษัท', enSuitable: 'Best for: Companies' },
    { id: 63, name: 'Speechify (Free)', url: 'https://speechify.com', category: 'voice', thDesc: 'AI Text to Speech — Audio book', enDesc: 'Text-to-speech for audiobooks.', thSuitable: 'เหมาะกับ: หนังสือเสียง', enSuitable: 'Best for: Audiobooks' },
    { id: 64, name: 'Soundful', url: 'https://soundful.com', category: 'voice', thDesc: 'AI สร้างดนตรี — Youtuber', enDesc: 'AI music for creators.', thSuitable: 'เหมาะกับ: ครีเอเตอร์', enSuitable: 'Best for: Creators' },
    { id: 65, name: 'AIVA', url: 'https://www.aiva.ai', category: 'voice', thDesc: 'AI ประพันธ์เพลง — Creator', enDesc: 'AI composition for creators.', thSuitable: 'เหมาะกับ: ผู้สร้างสรรค์', enSuitable: 'Best for: Creators' },
    { id: 66, name: 'Stable Diffusion Web', url: 'https://stablediffusionweb.com', category: 'image', thDesc: 'วาดภาพแนวละเอียด — Artist', enDesc: 'Detailed AI image generation for artists.', thSuitable: 'เหมาะกับ: ศิลปิน', enSuitable: 'Best for: Artists' },
    { id: 67, name: 'Hotpot AI', url: 'https://hotpot.ai', category: 'image', thDesc: 'ฟีเจอร์แต่งภาพ วาด AI — สร้าง meme', enDesc: 'Edit/draw features; make memes.', thSuitable: 'เหมาะกับ: มีม', enSuitable: 'Best for: Memes' },
    { id: 68, name: 'ChatWithPDF', url: 'https://www.chatwithpdf.com', category: 'chat', thDesc: 'AI อ่าน/ถามไฟล์ PDF — เอกสาร, วิจัย', enDesc: 'Ask questions to PDFs.', thSuitable: 'เหมาะกับ: เอกสาร, วิจัย', enSuitable: 'Best for: Docs, Research' },
    { id: 69, name: 'ExplainLikeImFive.io', url: 'https://explainlikeimfive.io', category: 'chat', thDesc: 'AI สรุปเรื่องยากให้ง่าย — เด็ก, ครู', enDesc: 'Explains complex topics simply.', thSuitable: 'เหมาะกับ: เด็ก, ครู', enSuitable: 'Best for: Kids, Teachers' },
    { id: 70, name: 'AskYourPDF', url: 'https://askyourpdf.com', category: 'chat', thDesc: 'ถาม-ตอบ PDF ด้วย AI — นักศึกษา', enDesc: 'Ask/answer about PDFs for students.', thSuitable: 'เหมาะกับ: นักศึกษา', enSuitable: 'Best for: Students' },
    // 71-80
    { id: 71, name: 'Chatbot.com', url: 'https://www.chatbot.com', category: 'chat', thDesc: 'AI ตอบแชทอัตโนมัติ — ธุรกิจ', enDesc: 'AI chat automation for businesses.', thSuitable: 'เหมาะกับ: ธุรกิจ', enSuitable: 'Best for: Business' },
    { id: 72, name: 'Kuki Chatbot', url: 'https://www.kuki.ai', category: 'chat', thDesc: 'AI แชทโต้ตอบเหมือนคน — ฝึกภาษา', enDesc: 'Human-like chatbot; language practice.', thSuitable: 'เหมาะกับ: ฝึกภาษา', enSuitable: 'Best for: Language practice' },
    { id: 73, name: 'ChatSonic (Free Tier)', url: 'https://writesonic.com/chat', category: 'chat', thDesc: 'AI Chat เหมือน ChatGPT — Writer', enDesc: 'ChatGPT-like chat for writers.', thSuitable: 'เหมาะกับ: นักเขียน', enSuitable: 'Best for: Writers' },
    { id: 74, name: 'AIPRM for ChatGPT', url: 'https://www.aiprm.com', category: 'writing', thDesc: 'Prompt Template สำหรับ ChatGPT — Dev, Writer', enDesc: 'ChatGPT prompt templates for devs/writers.', thSuitable: 'เหมาะกับ: Dev, Writer', enSuitable: 'Best for: Devs, Writers' },
    { id: 75, name: 'PromptHero', url: 'https://prompthero.com', category: 'search', thDesc: 'รวม prompt AI ภาพ/เนื้อหา — Prompt Engineer', enDesc: 'Prompt collections for images/content.', thSuitable: 'เหมาะกับ: วิศวกรพรอมพ์', enSuitable: 'Best for: Prompt engineers' },
    { id: 76, name: 'PromptBase', url: 'https://promptbase.com', category: 'search', thDesc: 'ซื้อขาย prompt AI — Dev, Marketer', enDesc: 'Marketplace for AI prompts.', thSuitable: 'เหมาะกับ: นักพัฒนา, นักการตลาด', enSuitable: 'Best for: Devs, Marketers' },
    { id: 77, name: 'Getimg.ai', url: 'https://getimg.ai', category: 'image', thDesc: 'วาดภาพ, ขยายรูป — Art/Design', enDesc: 'Generate and outpaint images.', thSuitable: 'เหมาะกับ: ศิลปะ/ดีไซน์', enSuitable: 'Best for: Art/Design' },
    { id: 78, name: 'Neural.love', url: 'https://neural.love', category: 'image', thDesc: 'วาด/ปรับภาพ/เสียง AI — NFT', enDesc: 'AI image/audio tools; NFTs.', thSuitable: 'เหมาะกับ: NFT', enSuitable: 'Best for: NFTs' },
    { id: 79, name: 'Supermeme.ai', url: 'https://supermeme.ai', category: 'image', thDesc: 'สร้าง meme ตลก AI — เพจ, IG', enDesc: 'Create funny AI memes for pages/IG.', thSuitable: 'เหมาะกับ: เพจ, IG', enSuitable: 'Best for: Pages, IG' },
    { id: 80, name: 'ProfilePicture.AI', url: 'https://profilepicture.ai', category: 'image', thDesc: 'สร้างภาพโปรไฟล์เท่ๆ — IG, Resume', enDesc: 'AI profile photos for IG/resumes.', thSuitable: 'เหมาะกับ: IG, เรซูเม่', enSuitable: 'Best for: IG, Resume' },
    // 81-90
    { id: 81, name: 'AI Humanizer (Notegpt.io)', url: 'https://notegpt.io/ai-humanizer', category: 'writing', thDesc: 'แปลงภาษาคน, anti-detect AI — งานเขียน', enDesc: 'Humanize AI text for writing.', thSuitable: 'เหมาะกับ: งานเขียน', enSuitable: 'Best for: Writing' },
    { id: 82, name: 'SlidesAI', url: 'https://www.slidesai.io', category: 'presentation', thDesc: 'AI สร้าง PowerPoint — นักเรียน, ขาย', enDesc: 'Generate PowerPoints; students/sales.', thSuitable: 'เหมาะกับ: นักเรียน, ขาย', enSuitable: 'Best for: Students, Sales' },
    { id: 83, name: 'FlowGPT', url: 'https://flowgpt.com', category: 'search', thDesc: 'ค้นหา Prompt ChatGPT — Prompt engineer', enDesc: 'Find ChatGPT prompts.', thSuitable: 'เหมาะกับ: วิศวกรพรอมพ์', enSuitable: 'Best for: Prompt engineers' },
    { id: 84, name: 'BlackBox AI', url: 'https://www.useblackbox.io', category: 'chat', thDesc: 'AI เขียนโค้ด อธิบายโค้ด — Dev', enDesc: 'AI code writing/explanations for devs.', thSuitable: 'เหมาะกับ: Dev', enSuitable: 'Best for: Devs' },
    { id: 85, name: 'Replit AI (Free)', url: 'https://replit.com', category: 'chat', thDesc: 'เขียน/รันโค้ดออนไลน์ — สอนเขียนโปรแกรม', enDesc: 'Code online; teaching programming.', thSuitable: 'เหมาะกับ: สอนเขียนโปรแกรม', enSuitable: 'Best for: Teaching' },
    { id: 86, name: 'EasyPrompt', url: 'https://www.easyprompt.xyz', category: 'search', thDesc: 'สร้าง/ค้นหา Prompt AI — Prompt writer', enDesc: 'Create/find AI prompts.', thSuitable: 'เหมาะกับ: ผู้เขียนพรอมพ์', enSuitable: 'Best for: Prompt writers' },
    { id: 87, name: 'Codeium', url: 'https://codeium.com', category: 'chat', thDesc: 'AI เขียนโค้ด/เสริม — Dev', enDesc: 'AI coding assistant for devs.', thSuitable: 'เหมาะกับ: Dev', enSuitable: 'Best for: Devs' },
    { id: 88, name: 'ExplainDev', url: 'https://explain.dev', category: 'chat', thDesc: 'AI อธิบายโค้ดภาษา dev — นักเรียน dev', enDesc: 'Explain code to dev learners.', thSuitable: 'เหมาะกับ: นักเรียน dev', enSuitable: 'Best for: Dev learners' },
    { id: 89, name: 'AIBrainstorm', url: 'https://aibrainstorm.com', category: 'chat', thDesc: 'ไอเดียงาน, Content — Marketer', enDesc: 'Brainstorm ideas for content/marketing.', thSuitable: 'เหมาะกับ: นักการตลาด', enSuitable: 'Best for: Marketers' },
    { id: 90, name: 'ProductHunt AI Collection', url: 'https://www.producthunt.com/collections/ai', category: 'search', thDesc: 'รวม AI เด็ดบน ProductHunt — อัปเดตเสมอ', enDesc: 'Curated AI list on Product Hunt; always updated.', thSuitable: 'เหมาะกับ: ค้นหา AI ใหม่', enSuitable: 'Best for: Finding new AI' }
];

function renderFreeTools() {
    const grid = document.getElementById('free-tools-grid');
    if (!grid) return;
    grid.innerHTML = '';
    freeToolsData.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'ai-tool-card';
        card.setAttribute('data-category', tool.category);
        card.innerHTML = `
            <div class="tool-header">
                <h3>${tool.name}</h3>
                <span class="tool-badge free" data-i18n-th="ฟรีทันที" data-i18n-en="Free now">${currentLanguage === 'th' ? 'ฟรีทันที' : 'Free now'}</span>
            </div>
            <p class="tool-description" data-i18n-th="${tool.thDesc}" data-i18n-en="${tool.enDesc}">${currentLanguage === 'th' ? tool.thDesc : tool.enDesc}</p>
            <p class="tool-suitable" data-i18n-th="${tool.thSuitable}" data-i18n-en="${tool.enSuitable}">${currentLanguage === 'th' ? tool.thSuitable : tool.enSuitable}</p>
            <p class="tool-meta" data-i18n-th="หมวด: ${tool.category}" data-i18n-en="Category: ${tool.category}">${currentLanguage === 'th' ? `หมวด: ${tool.category}` : `Category: ${tool.category}`}</p>
            <a href="${tool.url}" target="_blank" class="tool-link" data-i18n-th="ไปที่เว็บไซต์" data-i18n-en="Visit website">${currentLanguage === 'th' ? 'ไปที่เว็บไซต์' : 'Visit website'}</a>
        `;
        grid.appendChild(card);
    });
}

// Re-render descriptions when switching language
const originalChangeLanguage = changeLanguage;
changeLanguage = function(lang) {
    originalChangeLanguage(lang);
    renderFreeTools();
    filterAITools('all');
    updateDashboardCounts();
    updateAggregateCounts();
};

// ---------------------------
// Dashboard state (languages/features)
// ---------------------------
const DASHBOARD_STORAGE_KEY = 'borwan-dashboard';
function getDashboardState() {
    const raw = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return { languages: ['th', 'en'], features: [], freeCount: freeToolsData.length, premiumCount: 10 };
    try { return JSON.parse(raw); } catch { return { languages: ['th', 'en'], features: [], freeCount: freeToolsData.length, premiumCount: 10 }; }
}

function setDashboardState(state) {
    localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(state));
}

function updateDashboardCounts() {
    const state = getDashboardState();
    const languages = document.getElementById('dashboard-languages-count');
    const features = document.getElementById('dashboard-features-count');
    const free = document.getElementById('dashboard-free-count');
    const premium = document.getElementById('dashboard-premium-count');
    const total = document.getElementById('dashboard-total-count');
    if (languages) languages.textContent = state.languages.length;
    if (features) features.textContent = state.features.length;
    if (free) free.textContent = state.freeCount;
    if (premium) premium.textContent = state.premiumCount;
    if (total) total.textContent = state.freeCount + state.premiumCount;
}

// Reflect dashboard counts to top stats and summary section
function updateAggregateCounts() {
    const state = getDashboardState();
    // Top stats section
    const topFree = document.querySelector('[data-translate="stat-free"]').closest('.stat-item').querySelector('.stat-number');
    const topLangs = document.querySelector('[data-translate="stat-languages"]').closest('.stat-item').querySelector('.stat-number');
    const topTotal = document.querySelector('[data-translate="stat-ai-tools"]').closest('.stat-item').querySelector('.stat-number');
    if (topFree) topFree.textContent = String(state.freeCount);
    if (topLangs) topLangs.textContent = String(state.languages.length);
    if (topTotal) topTotal.textContent = String(state.freeCount + state.premiumCount);
    // Summary boxes
    const summary = document.querySelector('.ai-summary');
    if (summary) {
        const boxes = summary.querySelectorAll('.stat-box .stat-number');
        if (boxes[0]) boxes[0].textContent = String(state.freeCount);
        if (boxes[1]) boxes[1].textContent = String(state.premiumCount);
        if (boxes[2]) boxes[2].textContent = String(state.freeCount + state.premiumCount);
    }
}

function dashboardAddLanguage() {
    const input = document.getElementById('add-language-input');
    if (!input) return;
    const value = (input.value || '').trim();
    if (!value) return;
    const state = getDashboardState();
    if (!state.languages.includes(value)) {
        state.languages.push(value);
        setDashboardState(state);
        updateDashboardCounts();
        updateAggregateCounts();
    }
    input.value = '';
}

function dashboardAddFeature() {
    const input = document.getElementById('add-feature-input');
    if (!input) return;
    const value = (input.value || '').trim();
    if (!value) return;
    const state = getDashboardState();
    if (!state.features.includes(value)) {
        state.features.push(value);
        setDashboardState(state);
        updateDashboardCounts();
        updateAggregateCounts();
    }
    input.value = '';
}

// Add i18n keys for dashboard
translations.th['dashboard-title'] = 'แดชบอร์ด';
translations.th['dashboard-languages'] = 'ภาษา';
translations.th['dashboard-features'] = 'ฟีเจอร์';
translations.th['dashboard-free'] = 'AI ฟรี';
translations.th['dashboard-premium'] = 'AI ต้องสมัคร';
translations.th['dashboard-total'] = 'รวมทั้งหมด';
translations.th['add-language-label'] = 'เพิ่มภาษา';
translations.th['add-language-btn'] = 'เพิ่ม';
translations.th['add-feature-label'] = 'เพิ่มฟีเจอร์';
translations.th['add-feature-btn'] = 'เพิ่ม';

translations.en['dashboard-title'] = 'Dashboard';
translations.en['dashboard-languages'] = 'Languages';
translations.en['dashboard-features'] = 'Features';
translations.en['dashboard-free'] = 'Free AI';
translations.en['dashboard-premium'] = 'Signup AI';
translations.en['dashboard-total'] = 'Total';
translations.en['add-language-label'] = 'Add language';
translations.en['add-language-btn'] = 'Add';
translations.en['add-feature-label'] = 'Add feature';
translations.en['add-feature-btn'] = 'Add';

// Initial render
document.addEventListener('DOMContentLoaded', function() {
    renderFreeTools();
    updateDashboardCounts();
    updateAggregateCounts();
});


// AI Tools Tab Functions
function showAITab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const tabEl = document.getElementById(tabName + '-tab');
    if (tabEl) {
        tabEl.classList.add('active');
        // reset filter to all when switching tabs
        const firstChip = tabEl.querySelector('.ai-categories .chip[data-filter="all"]');
        if (firstChip) {
            tabEl.querySelectorAll('.ai-categories .chip').forEach(c => c.classList.remove('active'));
            firstChip.classList.add('active');
            filterAITools('all');
        }
        // animate the tab content
        void tabEl.offsetWidth;
    }

    // Add active class to correct button deterministically
    const tabsContainer = document.querySelector('.ai-tabs');
    if (tabsContainer) {
        const [freeBtn, premiumBtn] = tabsContainer.querySelectorAll('.tab-btn');
        if (tabName === 'free' && freeBtn) freeBtn.classList.add('active');
        if (tabName === 'premium' && premiumBtn) premiumBtn.classList.add('active');
    }
}

// AI Tools Search Function
function searchAITools() {
    const searchTerm = document.getElementById('ai-search-input').value.toLowerCase();
    const activeTab = document.querySelector('.tab-content.active');
    const toolCards = activeTab.querySelectorAll('.ai-tool-card');
    
    toolCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.tool-description').textContent.toLowerCase();
        const suitable = card.querySelector('.tool-suitable').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || suitable.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Handle more-tools-notice
    const moreToolsNotice = activeTab.querySelector('.more-tools-notice');
    if (moreToolsNotice) {
        if (searchTerm === '') {
            moreToolsNotice.style.display = 'block';
        } else {
            moreToolsNotice.style.display = 'none';
        }
    }
}

// NEW: Category filter function
function filterAITools(category) {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;

    // set active chip styling
    const chips = activeTab.querySelectorAll('.ai-categories .chip');
    chips.forEach(chip => {
        const isActive = chip.getAttribute('data-filter') === category;
        chip.classList.toggle('active', isActive);
    });

    const toolCards = activeTab.querySelectorAll('.ai-tool-card');
    toolCards.forEach(card => {
        const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
        const shouldShow = category === 'all' || cardCategory === category;
        card.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) {
            card.classList.remove('reveal-from-top');
            void card.offsetWidth; // restart animation
            card.classList.add('reveal-from-top');
        }
    });

    // handle more-tools-notice visibility under filtering
    const notice = activeTab.querySelector('.more-tools-notice');
    if (notice) {
        notice.style.display = category === 'all' ? 'block' : 'none';
    }
}

// Update translations for AI Tools
const aiTranslations = {
    th: {
        'ai-free-tab': '🟢 ไม่ต้องสมัคร',
        'ai-premium-tab': '🟠 ต้องสมัคร'
    },
    en: {
        'ai-free-tab': '🟢 No signup',
        'ai-premium-tab': '🟠 Requires signup'
    }
};

// Merge AI translations with existing translations
Object.keys(aiTranslations).forEach(lang => {
    if (translations[lang]) {
        Object.assign(translations[lang], aiTranslations[lang]);
    }
});

// Initialize AI Tools when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set default active tab
    showAITab('free');
    
    // Localize search placeholder on load
    const searchInput = document.getElementById('ai-search-input');
    if (searchInput) {
        const placeholder = searchInput.getAttribute(currentLanguage === 'th' ? 'data-placeholder-th' : 'data-placeholder-en');
        if (placeholder) searchInput.setAttribute('placeholder', placeholder);
    }
});

