#!/usr/bin/env python3
"""
Web Scraper Bot - ฟรี 100%
บอทสำหรับเข้าเว็บต่างๆ และดึงโค้ดมาสร้างโปรเจค
"""

import requests
import time
import json
import re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from typing import Dict, List, Optional
import random
import urllib.parse

class WebScraperBot:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        self.free_code_sources = {
            'codepen': {
                'base_url': 'https://codepen.io',
                'search_url': 'https://codepen.io/search/pens?q={}',
                'api_url': 'https://cpv2api.com/search/pens?q={}&limit=10'
            },
            'jsfiddle': {
                'base_url': 'https://jsfiddle.net',
                'search_url': 'https://jsfiddle.net/search/?q={}'
            },
            'codesandbox': {
                'base_url': 'https://codesandbox.io',
                'search_url': 'https://codesandbox.io/search?query={}&page=1&configure%5BhitsPerPage%5D=12'
            },
            'stackblitz': {
                'base_url': 'https://stackblitz.com',
                'search_url': 'https://stackblitz.com/search?q={}'
            },
            'github': {
                'base_url': 'https://github.com',
                'search_url': 'https://github.com/search?q={}&type=repositories'
            },
            'replit': {
                'base_url': 'https://replit.com',
                'search_url': 'https://replit.com/search?q={}'
            }
        }
        
        self.ai_code_generators = {
            'huggingface': {
                'api_url': 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
                'headers': {'Authorization': 'Bearer hf_demo_token'}
            },
            'openai_compatible': {
                'api_url': 'https://api.openai.com/v1/chat/completions',
                'model': 'gpt-3.5-turbo'
            }
        }
        
    def setup_selenium_driver(self, headless=True):
        """ตั้งค่า Selenium WebDriver"""
        chrome_options = Options()
        if headless:
            chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        
        try:
            driver = webdriver.Chrome(options=chrome_options)
            return driver
        except Exception as e:
            print(f"⚠️ ไม่สามารถเริ่ม Chrome driver: {e}")
            return None
    
    def search_codepen(self, query: str, limit: int = 5) -> List[Dict]:
        """ค้นหาโค้ดใน CodePen"""
        print(f"🔍 ค้นหาใน CodePen: {query}")
        
        try:
            # ใช้ CodePen API (ถ้ามี) หรือ scraping
            search_url = self.free_code_sources['codepen']['search_url'].format(urllib.parse.quote(query))
            
            response = self.session.get(search_url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                pens = []
                pen_items = soup.find_all('div', class_='single-pen')[:limit]
                
                for item in pen_items:
                    try:
                        title_elem = item.find('h3', class_='pen-title')
                        link_elem = item.find('a')
                        
                        if title_elem and link_elem:
                            pen_url = 'https://codepen.io' + link_elem.get('href')
                            pen_data = self.extract_codepen_code(pen_url)
                            
                            if pen_data:
                                pens.append({
                                    'title': title_elem.get_text().strip(),
                                    'url': pen_url,
                                    'source': 'codepen',
                                    'code': pen_data
                                })
                                
                    except Exception as e:
                        print(f"⚠️ ข้อผิดพลาดในการดึงข้อมูล pen: {e}")
                        continue
                
                return pens
                
        except Exception as e:
            print(f"❌ ข้อผิดพลาดในการค้นหา CodePen: {e}")
            
        return []
    
    def extract_codepen_code(self, pen_url: str) -> Optional[Dict]:
        """ดึงโค้ดจาก CodePen"""
        try:
            # แปลง URL เป็น format ที่ดึงโค้ดได้
            if '/pen/' in pen_url:
                pen_id = pen_url.split('/pen/')[-1].split('?')[0]
                
                # ดึงข้อมูลจาก CodePen API (ถ้าเป็น public)
                api_url = f"https://codepen.io/api/oembed?url={pen_url}&format=json"
                
                response = self.session.get(api_url)
                if response.status_code == 200:
                    data = response.json()
                    
                    # ดึงโค้ดจากหน้า pen
                    pen_response = self.session.get(pen_url)
                    if pen_response.status_code == 200:
                        soup = BeautifulSoup(pen_response.content, 'html.parser')
                        
                        # ดึง HTML, CSS, JS จาก meta tags หรือ script tags
                        html_code = self.extract_code_from_pen_page(soup, 'html')
                        css_code = self.extract_code_from_pen_page(soup, 'css')
                        js_code = self.extract_code_from_pen_page(soup, 'js')
                        
                        return {
                            'html': html_code,
                            'css': css_code,
                            'js': js_code,
                            'title': data.get('title', ''),
                            'author': data.get('author_name', '')
                        }
                        
        except Exception as e:
            print(f"⚠️ ไม่สามารถดึงโค้ดจาก CodePen: {e}")
            
        return None
    
    def extract_code_from_pen_page(self, soup: BeautifulSoup, code_type: str) -> str:
        """ดึงโค้ดจากหน้า CodePen"""
        try:
            # ลองหาใน script tags หรือ data attributes
            script_tags = soup.find_all('script')
            
            for script in script_tags:
                if script.string and code_type in script.string.lower():
                    # ดึงโค้ดจาก JSON data
                    if 'window.__pen' in script.string:
                        # Parse JSON data
                        json_match = re.search(r'window\.__pen\s*=\s*({.*?});', script.string, re.DOTALL)
                        if json_match:
                            try:
                                pen_data = json.loads(json_match.group(1))
                                return pen_data.get(code_type, '')
                            except:
                                pass
                                
            # ถ้าไม่เจอ ให้สร้างโค้ดตัวอย่าง
            return self.generate_sample_code(code_type)
            
        except Exception as e:
            print(f"⚠️ ข้อผิดพลาดในการดึงโค้ด {code_type}: {e}")
            return self.generate_sample_code(code_type)
    
    def search_github(self, query: str, limit: int = 5) -> List[Dict]:
        """ค้นหาโค้ดใน GitHub"""
        print(f"🔍 ค้นหาใน GitHub: {query}")
        
        try:
            # ใช้ GitHub Search API
            api_url = f"https://api.github.com/search/repositories?q={urllib.parse.quote(query)}&sort=stars&order=desc&per_page={limit}"
            
            response = self.session.get(api_url)
            if response.status_code == 200:
                data = response.json()
                
                repos = []
                for repo in data.get('items', []):
                    try:
                        repo_data = self.extract_github_code(repo)
                        if repo_data:
                            repos.append({
                                'title': repo['name'],
                                'url': repo['html_url'],
                                'source': 'github',
                                'code': repo_data,
                                'stars': repo['stargazers_count'],
                                'description': repo.get('description', '')
                            })
                    except Exception as e:
                        print(f"⚠️ ข้อผิดพลาดในการดึงข้อมูล repo: {e}")
                        continue
                
                return repos
                
        except Exception as e:
            print(f"❌ ข้อผิดพลาดในการค้นหา GitHub: {e}")
            
        return []
    
    def extract_github_code(self, repo: Dict) -> Optional[Dict]:
        """ดึงโค้ดจาก GitHub repository"""
        try:
            # ดึงไฟล์หลักจาก repo
            contents_url = f"https://api.github.com/repos/{repo['full_name']}/contents"
            
            response = self.session.get(contents_url)
            if response.status_code == 200:
                contents = response.json()
                
                code_files = {
                    'html': '',
                    'css': '',
                    'js': '',
                    'readme': ''
                }
                
                # หาไฟล์ที่เกี่ยวข้อง
                for file_info in contents:
                    if file_info['type'] == 'file':
                        filename = file_info['name'].lower()
                        
                        if filename.endswith('.html') or filename == 'index.html':
                            code_files['html'] = self.download_github_file(file_info['download_url'])
                        elif filename.endswith('.css') or filename == 'style.css':
                            code_files['css'] = self.download_github_file(file_info['download_url'])
                        elif filename.endswith('.js') or filename == 'script.js':
                            code_files['js'] = self.download_github_file(file_info['download_url'])
                        elif filename == 'readme.md':
                            code_files['readme'] = self.download_github_file(file_info['download_url'])
                
                return code_files
                
        except Exception as e:
            print(f"⚠️ ไม่สามารถดึงโค้ดจาก GitHub: {e}")
            
        return None
    
    def download_github_file(self, download_url: str) -> str:
        """ดาวน์โหลดไฟล์จาก GitHub"""
        try:
            response = self.session.get(download_url)
            if response.status_code == 200:
                return response.text
        except Exception as e:
            print(f"⚠️ ไม่สามารถดาวน์โหลดไฟล์: {e}")
            
        return ''
    
    def search_codesandbox(self, query: str, limit: int = 5) -> List[Dict]:
        """ค้นหาโค้ดใน CodeSandbox"""
        print(f"🔍 ค้นหาใน CodeSandbox: {query}")
        
        try:
            # ใช้ Selenium เพื่อ scrape CodeSandbox
            driver = self.setup_selenium_driver()
            if not driver:
                return []
                
            search_url = self.free_code_sources['codesandbox']['search_url'].format(urllib.parse.quote(query))
            driver.get(search_url)
            
            # รอให้โหลดผลการค้นหา
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="sandbox-item"]'))
            )
            
            sandboxes = []
            sandbox_elements = driver.find_elements(By.CSS_SELECTOR, '[data-testid="sandbox-item"]')[:limit]
            
            for element in sandbox_elements:
                try:
                    title_elem = element.find_element(By.CSS_SELECTOR, 'h3')
                    link_elem = element.find_element(By.CSS_SELECTOR, 'a')
                    
                    if title_elem and link_elem:
                        sandbox_url = link_elem.get_attribute('href')
                        sandbox_data = self.extract_codesandbox_code(sandbox_url, driver)
                        
                        if sandbox_data:
                            sandboxes.append({
                                'title': title_elem.text.strip(),
                                'url': sandbox_url,
                                'source': 'codesandbox',
                                'code': sandbox_data
                            })
                            
                except Exception as e:
                    print(f"⚠️ ข้อผิดพลาดในการดึงข้อมูล sandbox: {e}")
                    continue
            
            driver.quit()
            return sandboxes
            
        except Exception as e:
            print(f"❌ ข้อผิดพลาดในการค้นหา CodeSandbox: {e}")
            
        return []
    
    def extract_codesandbox_code(self, sandbox_url: str, driver) -> Optional[Dict]:
        """ดึงโค้ดจาก CodeSandbox"""
        try:
            # เปิด sandbox
            driver.get(sandbox_url)
            
            # รอให้โหลด
            time.sleep(3)
            
            # ดึงโค้ดจาก editor (ถ้าเป็น public)
            code_data = {
                'html': self.extract_codesandbox_file_content(driver, 'html'),
                'css': self.extract_codesandbox_file_content(driver, 'css'),
                'js': self.extract_codesandbox_file_content(driver, 'js')
            }
            
            return code_data
            
        except Exception as e:
            print(f"⚠️ ไม่สามารถดึงโค้ดจาก CodeSandbox: {e}")
            
        return None
    
    def extract_codesandbox_file_content(self, driver, file_type: str) -> str:
        """ดึงเนื้อหาไฟล์จาก CodeSandbox editor"""
        try:
            # หาไฟล์ที่ตรงกับประเภท
            file_selectors = {
                'html': ['index.html', 'public/index.html'],
                'css': ['style.css', 'styles.css', 'src/style.css'],
                'js': ['index.js', 'src/index.js', 'script.js']
            }
            
            for filename in file_selectors.get(file_type, []):
                try:
                    # คลิกที่ไฟล์ใน file explorer
                    file_element = driver.find_element(By.XPATH, f"//span[contains(text(), '{filename}')]")
                    file_element.click()
                    
                    time.sleep(1)
                    
                    # ดึงเนื้อหาจาก editor
                    editor_element = driver.find_element(By.CSS_SELECTOR, '.monaco-editor textarea')
                    content = driver.execute_script("return arguments[0].value;", editor_element)
                    
                    if content:
                        return content
                        
                except:
                    continue
                    
            # ถ้าไม่เจอ ให้สร้างโค้ดตัวอย่าง
            return self.generate_sample_code(file_type)
            
        except Exception as e:
            print(f"⚠️ ข้อผิดพลาดในการดึงเนื้อหาไฟล์ {file_type}: {e}")
            return self.generate_sample_code(file_type)
    
    def generate_ai_code(self, prompt: str, code_type: str = 'html') -> str:
        """สร้างโค้ดด้วย AI"""
        print(f"🤖 สร้างโค้ด {code_type} ด้วย AI: {prompt}")
        
        try:
            # ลองใช้ Hugging Face API
            api_url = self.ai_code_generators['huggingface']['api_url']
            headers = self.ai_code_generators['huggingface']['headers']
            
            code_prompt = f"Generate {code_type} code for: {prompt}"
            
            payload = {
                "inputs": code_prompt,
                "parameters": {
                    "max_length": 1000,
                    "temperature": 0.7
                }
            }
            
            response = self.session.post(api_url, headers=headers, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    generated_text = result[0].get('generated_text', '')
                    
                    # ดึงโค้ดจากข้อความที่สร้าง
                    code = self.extract_code_from_ai_response(generated_text, code_type)
                    return code
                    
        except Exception as e:
            print(f"⚠️ ไม่สามารถสร้างโค้ดด้วย AI: {e}")
        
        # ถ้า AI ไม่ได้ ให้สร้างโค้ดตัวอย่าง
        return self.generate_sample_code(code_type, prompt)
    
    def extract_code_from_ai_response(self, response_text: str, code_type: str) -> str:
        """ดึงโค้ดจากการตอบกลับของ AI"""
        try:
            # หา code blocks
            code_patterns = {
                'html': r'```html\s*(.*?)\s*```',
                'css': r'```css\s*(.*?)\s*```',
                'js': r'```javascript\s*(.*?)\s*```'
            }
            
            pattern = code_patterns.get(code_type, r'```\s*(.*?)\s*```')
            match = re.search(pattern, response_text, re.DOTALL | re.IGNORECASE)
            
            if match:
                return match.group(1).strip()
            else:
                # ถ้าไม่มี code block ให้ใช้ทั้งหมด
                return response_text.strip()
                
        except Exception as e:
            print(f"⚠️ ข้อผิดพลาดในการดึงโค้ดจาก AI: {e}")
            return self.generate_sample_code(code_type)
    
    def generate_sample_code(self, code_type: str, prompt: str = '') -> str:
        """สร้างโค้ดตัวอย่าง"""
        templates = {
            'html': f'''<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{prompt or 'Smart AI Project'}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>{prompt or 'Smart AI Project'}</h1>
    </header>
    
    <main>
        <section class="hero">
            <h2>สร้างโดย Smart AI Automation</h2>
            <p>โปรเจคนี้สร้างอัตโนมัติด้วย AI ฟรี 100%</p>
            <button class="cta-button">เริ่มใช้งาน</button>
        </section>
        
        <section class="features">
            <div class="feature">
                <h3>ประสิทธิภาพสูง</h3>
                <p>ใช้ทรัพยากรน้อยที่สุด</p>
            </div>
            <div class="feature">
                <h3>Responsive</h3>
                <p>ใช้งานได้ทุกอุปกรณ์</p>
            </div>
            <div class="feature">
                <h3>Modern</h3>
                <p>ใช้เทคโนโลยีล่าสุด</p>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Smart AI Automation. ฟรี 100%</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>''',
            
            'css': '''/* Smart AI Generated CSS */
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    --text-color: #333;
    --bg-color: #f8f9fa;
    --white: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--bg-color);
}

header {
    background: var(--primary-color);
    color: var(--white);
    text-align: center;
    padding: 2rem 0;
}

.hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.cta-button {
    background: var(--accent-color);
    color: var(--white);
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cta-button:hover {
    background: #c0392b;
    transform: translateY(-2px);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature {
    background: var(--white);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s ease;
}

.feature:hover {
    transform: translateY(-5px);
}

footer {
    background: var(--secondary-color);
    color: var(--white);
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .hero h2 {
        font-size: 2rem;
    }
    
    .features {
        grid-template-columns: 1fr;
        padding: 2rem 1rem;
    }
}''',
            
            'js': '''// Smart AI Generated JavaScript
class SmartAIProject {
    constructor() {
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        console.log('🚀 Smart AI Project initialized');
        this.animateElements();
    }
    
    setupEventListeners() {
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', this.handleCTAClick.bind(this));
        }
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    handleCTAClick(e) {
        e.preventDefault();
        this.showNotification('เริ่มใช้งานแล้ว!', 'success');
        
        // Add your custom logic here
        console.log('CTA button clicked');
    }
    
    animateElements() {
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        document.querySelectorAll('.feature').forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'all 0.6s ease';
            observer.observe(feature);
        });
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            border-radius: 5px;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SmartAIProject();
});

// Performance optimization
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}'''
        }
        
        return templates.get(code_type, f'// Generated {code_type} code for: {prompt}')
    
    def scrape_multiple_sources(self, query: str, sources: List[str] = None) -> Dict:
        """ดึงโค้ดจากหลายแหล่งพร้อมกัน"""
        if sources is None:
            sources = ['codepen', 'github', 'ai_generation']
        
        print(f"🌐 ดึงโค้ดจากหลายแหล่ง: {', '.join(sources)}")
        
        all_results = {}
        
        for source in sources:
            try:
                if source == 'codepen':
                    results = self.search_codepen(query)
                elif source == 'github':
                    results = self.search_github(query)
                elif source == 'codesandbox':
                    results = self.search_codesandbox(query)
                elif source == 'ai_generation':
                    # สร้างโค้ดด้วย AI
                    results = [{
                        'title': f'AI Generated: {query}',
                        'url': 'ai://generated',
                        'source': 'ai',
                        'code': {
                            'html': self.generate_ai_code(query, 'html'),
                            'css': self.generate_ai_code(query, 'css'),
                            'js': self.generate_ai_code(query, 'js')
                        }
                    }]
                else:
                    results = []
                
                all_results[source] = results
                print(f"✅ {source}: {len(results)} ผลลัพธ์")
                
                # หน่วงเวลาเพื่อไม่ให้ถูก rate limit
                time.sleep(random.uniform(1, 3))
                
            except Exception as e:
                print(f"❌ ข้อผิดพลาดจาก {source}: {e}")
                all_results[source] = []
        
        return all_results
    
    def select_best_code(self, all_results: Dict) -> Dict:
        """เลือกโค้ดที่ดีที่สุดจากทุกแหล่ง"""
        print("🎯 เลือกโค้ดที่ดีที่สุด...")
        
        best_code = {
            'html': '',
            'css': '',
            'js': '',
            'metadata': {
                'sources_used': [],
                'total_results': 0
            }
        }
        
        # นับผลลัพธ์ทั้งหมด
        total_results = sum(len(results) for results in all_results.values())
        best_code['metadata']['total_results'] = total_results
        
        # เลือกโค้ดที่ดีที่สุดสำหรับแต่ละประเภท
        for code_type in ['html', 'css', 'js']:
            best_score = 0
            best_source = None
            
            for source, results in all_results.items():
                for result in results:
                    if 'code' in result and code_type in result['code']:
                        code = result['code'][code_type]
                        score = self.calculate_code_quality_score(code, code_type)
                        
                        if score > best_score:
                            best_score = score
                            best_code[code_type] = code
                            best_source = source
            
            if best_source:
                best_code['metadata']['sources_used'].append(f"{code_type}: {best_source}")
        
        # ถ้าไม่มีโค้ดจากแหล่งใดเลย ให้สร้างตัวอย่าง
        for code_type in ['html', 'css', 'js']:
            if not best_code[code_type]:
                best_code[code_type] = self.generate_sample_code(code_type)
                best_code['metadata']['sources_used'].append(f"{code_type}: generated")
        
        print(f"✅ เลือกโค้ดเสร็จสิ้น จาก: {', '.join(best_code['metadata']['sources_used'])}")
        return best_code
    
    def calculate_code_quality_score(self, code: str, code_type: str) -> float:
        """คำนวณคะแนนคุณภาพโค้ด"""
        if not code:
            return 0.0
        
        score = 0.0
        
        # ความยาวโค้ด (ไม่สั้นหรือยาวเกินไป)
        length = len(code)
        if 100 <= length <= 5000:
            score += 20
        elif length > 50:
            score += 10
        
        # ตรวจสอบ syntax ที่ดี
        quality_indicators = {
            'html': ['<!DOCTYPE', 'meta', 'viewport', 'charset'],
            'css': [':', '{', '}', 'px', 'rem', 'var('],
            'js': ['function', 'const', 'let', 'addEventListener', '=>']
        }
        
        indicators = quality_indicators.get(code_type, [])
        for indicator in indicators:
            if indicator in code:
                score += 10
        
        # ตรวจสอบ best practices
        if code_type == 'html':
            if 'semantic' in code.lower() or any(tag in code for tag in ['<header>', '<main>', '<footer>', '<section>']):
                score += 15
        elif code_type == 'css':
            if 'responsive' in code.lower() or '@media' in code:
                score += 15
        elif code_type == 'js':
            if 'addEventListener' in code or 'querySelector' in code:
                score += 15
        
        return min(score, 100.0)

# CLI Interface
def main():
    print("🤖 Web Scraper Bot - ฟรี 100%")
    print("=" * 50)
    
    bot = WebScraperBot()
    
    while True:
        try:
            query = input("\n🔍 ใส่คำค้นหา (หรือ 'exit' เพื่อออก): ").strip()
            
            if query.lower() in ['exit', 'quit', 'ออก']:
                print("👋 ขอบคุณที่ใช้งาน!")
                break
            
            if not query:
                continue
            
            # เลือกแหล่งที่ต้องการ
            print("\n📋 เลือกแหล่งที่ต้องการ:")
            print("1. CodePen")
            print("2. GitHub")
            print("3. CodeSandbox")
            print("4. AI Generation")
            print("5. ทั้งหมด")
            
            choice = input("เลือก (1-5): ").strip()
            
            sources_map = {
                '1': ['codepen'],
                '2': ['github'],
                '3': ['codesandbox'],
                '4': ['ai_generation'],
                '5': ['codepen', 'github', 'ai_generation']
            }
            
            sources = sources_map.get(choice, ['ai_generation'])
            
            # ดึงโค้ด
            print(f"\n🚀 เริ่มดึงโค้ดสำหรับ: {query}")
            all_results = bot.scrape_multiple_sources(query, sources)
            
            # เลือกโค้ดที่ดีที่สุด
            best_code = bot.select_best_code(all_results)
            
            # แสดงผลลัพธ์
            print(f"\n✅ ดึงโค้ดเสร็จสิ้น!")
            print(f"📊 ผลลัพธ์ทั้งหมด: {best_code['metadata']['total_results']}")
            print(f"🎯 แหล่งที่ใช้: {', '.join(best_code['metadata']['sources_used'])}")
            
            # บันทึกไฟล์
            save = input("\n💾 ต้องการบันทึกไฟล์หรือไม่? (y/n): ").strip().lower()
            if save in ['y', 'yes', 'ใช่']:
                project_name = query.replace(' ', '_').lower()
                
                with open(f"{project_name}.html", 'w', encoding='utf-8') as f:
                    f.write(best_code['html'])
                
                with open(f"{project_name}_style.css", 'w', encoding='utf-8') as f:
                    f.write(best_code['css'])
                
                with open(f"{project_name}_script.js", 'w', encoding='utf-8') as f:
                    f.write(best_code['js'])
                
                print(f"✅ บันทึกไฟล์เสร็จสิ้น: {project_name}.html, {project_name}_style.css, {project_name}_script.js")
            
        except KeyboardInterrupt:
            print("\n\n👋 ขอบคุณที่ใช้งาน!")
            break
        except Exception as e:
            print(f"\n💥 เกิดข้อผิดพลาด: {str(e)}")

if __name__ == "__main__":
    main()

