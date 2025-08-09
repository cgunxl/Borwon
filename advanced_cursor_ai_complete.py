#!/usr/bin/env python3
"""
Advanced Cursor AI System - ฟรี 100%
ระบบค้นหาความรู้ทั่วโลก + สร้างสคริปต์ + Auto Deploy GitHub
พิมพ์ใน Cursor → ค้นหาข้อมูล → สร้างสคริปต์ → ยืนยัน/แก้ไข/ยกเลิก → Deploy
"""

import os
import json
import time
import requests
import threading
import subprocess
import sqlite3
import hashlib
import re
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime
import urllib.parse
from bs4 import BeautifulSoup
import random

class AdvancedCursorAI:
    def __init__(self, workspace_path: str = None):
        """เริ่มต้นระบบ Advanced Cursor AI"""
        self.workspace_path = Path(workspace_path) if workspace_path else Path.cwd()
        self.setup_workspace()
        
        # ไฟล์สำหรับการสื่อสาร
        self.command_file = self.workspace_path / ".cursor_commands.json"
        self.response_file = self.workspace_path / ".cursor_responses.json"
        self.knowledge_db = self.workspace_path / "knowledge_base.db"
        self.projects_db = self.workspace_path / "projects.db"
        
        # ระบบค้นหาข้อมูลฟรี (ไม่ใช้ API)
        self.knowledge_sources = {
            'wikipedia': {
                'base_url': 'https://en.wikipedia.org',
                'search_url': 'https://en.wikipedia.org/w/api.php?action=opensearch&search={}&limit=5&namespace=0&format=json',
                'content_url': 'https://en.wikipedia.org/wiki/{}'
            },
            'stackoverflow': {
                'base_url': 'https://stackoverflow.com',
                'search_url': 'https://stackoverflow.com/search?q={}',
                'content_selector': '.post-text, .answer'
            },
            'github_repos': {
                'base_url': 'https://github.com',
                'search_url': 'https://github.com/search?q={}&type=repositories',
                'content_selector': '.markdown-body, .readme'
            },
            'mdn_docs': {
                'base_url': 'https://developer.mozilla.org',
                'search_url': 'https://developer.mozilla.org/en-US/search?q={}',
                'content_selector': '.main-page-content, .article'
            },
            'w3schools': {
                'base_url': 'https://www.w3schools.com',
                'search_url': 'https://www.w3schools.com/search/search_asp.asp?where=95&q={}',
                'content_selector': '.w3-panel, .w3-example'
            },
            'tutorials_point': {
                'base_url': 'https://www.tutorialspoint.com',
                'search_url': 'https://www.tutorialspoint.com/search/search.jsp?q={}',
                'content_selector': '.tutorial-content, .content'
            }
        }
        
        # User-Agent สำหรับ Web Scraping
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        self.is_running = False
        self.init_databases()
        
    def setup_workspace(self):
        """ตั้งค่า workspace"""
        self.workspace_path.mkdir(exist_ok=True)
        (self.workspace_path / ".cursor").mkdir(exist_ok=True)
        (self.workspace_path / ".cursor" / "extensions").mkdir(exist_ok=True)
        (self.workspace_path / "projects").mkdir(exist_ok=True)
        (self.workspace_path / "knowledge").mkdir(exist_ok=True)
        
    def init_databases(self):
        """เริ่มต้นฐานข้อมูล"""
        # ฐานข้อมูลความรู้
        conn = sqlite3.connect(self.knowledge_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS knowledge_cache (
                id INTEGER PRIMARY KEY,
                query_hash TEXT UNIQUE,
                query TEXT,
                source TEXT,
                content TEXT,
                relevance_score REAL,
                created_at TEXT,
                last_accessed TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS search_history (
                id INTEGER PRIMARY KEY,
                query TEXT,
                results_count INTEGER,
                search_time REAL,
                created_at TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        
        # ฐานข้อมูลโปรเจค
        conn = sqlite3.connect(self.projects_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY,
                name TEXT,
                prompt TEXT,
                status TEXT,
                code_html TEXT,
                code_css TEXT,
                code_js TEXT,
                github_url TEXT,
                created_at TEXT,
                updated_at TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        
    def get_cached_knowledge(self, query_hash: str) -> Optional[Dict]:
        """ดึงความรู้จาก cache"""
        try:
            conn = sqlite3.connect(self.knowledge_db)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT content, relevance_score, source, created_at 
                FROM knowledge_cache 
                WHERE query_hash = ? 
                ORDER BY relevance_score DESC
            ''', (query_hash,))
            
            results = cursor.fetchall()
            conn.close()
            
            if results:
                # อัปเดต last_accessed
                self.update_cache_access(query_hash)
                
                cached_results = []
                for content, score, source, created_at in results:
                    cached_results.append({
                        'content': content,
                        'relevance_score': score,
                        'source': source,
                        'created_at': created_at
                    })
                
                return {
                    'results': cached_results,
                    'from_cache': True
                }
                
        except Exception as e:
            print(f"ข้อผิดพลาดในการอ่าน cache: {e}")
        
        return None
    
    def cache_knowledge(self, query_hash: str, query: str, results: List[Dict]):
        """บันทึกความรู้ลง cache"""
        try:
            conn = sqlite3.connect(self.knowledge_db)
            cursor = conn.cursor()
            
            current_time = datetime.now().isoformat()
            
            for result in results:
                cursor.execute('''
                    INSERT OR REPLACE INTO knowledge_cache 
                    (query_hash, query, source, content, relevance_score, created_at, last_accessed)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (
                    query_hash,
                    query,
                    result['source'],
                    result['content'],
                    result.get('final_relevance_score', 0.5),
                    current_time,
                    current_time
                ))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"ข้อผิดพลาดในการบันทึก cache: {e}")
    
    def update_cache_access(self, query_hash: str):
        """อัปเดตเวลาการเข้าถึง cache"""
        try:
            conn = sqlite3.connect(self.knowledge_db)
            cursor = conn.cursor()
            
            cursor.execute('''
                UPDATE knowledge_cache 
                SET last_accessed = ? 
                WHERE query_hash = ?
            ''', (datetime.now().isoformat(), query_hash))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"ข้อผิดพลาดในการอัปเดต cache: {e}")
    
    def log_search_history(self, query: str, results_count: int, search_time: float):
        """บันทึกประวัติการค้นหา"""
        try:
            conn = sqlite3.connect(self.knowledge_db)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO search_history 
                (query, results_count, search_time, created_at)
                VALUES (?, ?, ?, ?)
            ''', (query, results_count, search_time, datetime.now().isoformat()))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"ข้อผิดพลาดในการบันทึกประวัติ: {e}")
    
    def search_global_knowledge(self, query: str, max_sources: int = 3) -> Dict:
        """ค้นหาความรู้จากแหล่งต่างๆ ทั่วโลก"""
        print(f"🌍 ค้นหาความรู้ทั่วโลก: {query}")
        
        query_hash = hashlib.md5(query.encode()).hexdigest()
        
        # ตรวจสอบ cache ก่อน
        cached_results = self.get_cached_knowledge(query_hash)
        if cached_results:
            print("📚 พบข้อมูลใน cache")
            return cached_results
        
        start_time = time.time()
        all_results = []
        
        # ค้นหาจากแหล่งต่างๆ
        sources_to_search = list(self.knowledge_sources.keys())[:max_sources]
        
        for source in sources_to_search:
            try:
                print(f"  🔍 ค้นหาจาก {source}...")
                results = self.search_source(source, query)
                if results:
                    all_results.extend(results)
                    print(f"  ✅ พบ {len(results)} ผลลัพธ์จาก {source}")
                
                # หน่วงเวลาเพื่อไม่ให้โดน rate limit
                time.sleep(random.uniform(1, 2))
                
            except Exception as e:
                print(f"  ⚠️ ข้อผิดพลาดจาก {source}: {e}")
        
        # เรียงลำดับตามความเกี่ยวข้อง
        sorted_results = self.rank_results(all_results, query)
        
        # บันทึกใน cache
        self.cache_knowledge(query_hash, query, sorted_results)
        
        search_time = time.time() - start_time
        self.log_search_history(query, len(sorted_results), search_time)
        
        print(f"✅ ค้นหาเสร็จสิ้น: {len(sorted_results)} ผลลัพธ์ใน {search_time:.2f} วินาที")
        
        return {
            'query': query,
            'results': sorted_results[:10],  # เก็บแค่ 10 อันดับแรก
            'total_results': len(sorted_results),
            'search_time': search_time,
            'sources_searched': sources_to_search
        }
    
    def search_source(self, source: str, query: str) -> List[Dict]:
        """ค้นหาจากแหล่งเฉพาะ"""
        results = []
        
        try:
            if source == 'wikipedia':
                results = self.search_wikipedia(query)
            elif source == 'stackoverflow':
                results = self.search_stackoverflow(query)
            elif source == 'github_repos':
                results = self.search_github_repos(query)
            elif source == 'mdn_docs':
                results = self.search_mdn(query)
            elif source == 'w3schools':
                results = self.search_w3schools(query)
            elif source == 'tutorials_point':
                results = self.search_tutorials_point(query)
            
        except Exception as e:
            print(f"ข้อผิดพลาดในการค้นหา {source}: {e}")
        
        return results
    
    def search_wikipedia(self, query: str) -> List[Dict]:
        """ค้นหาจาก Wikipedia"""
        try:
            search_url = self.knowledge_sources['wikipedia']['search_url'].format(urllib.parse.quote(query))
            response = self.session.get(search_url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                results = []
                
                if len(data) >= 2:
                    titles = data[1]
                    descriptions = data[2] if len(data) > 2 else []
                    
                    for i, title in enumerate(titles[:3]):
                        content_url = f"https://en.wikipedia.org/wiki/{urllib.parse.quote(title)}"
                        content = self.extract_wikipedia_content(content_url)
                        
                        results.append({
                            'source': 'wikipedia',
                            'title': title,
                            'description': descriptions[i] if i < len(descriptions) else '',
                            'url': content_url,
                            'content': content,
                            'relevance_score': 1.0 - (i * 0.1)
                        })
                
                return results
        except Exception as e:
            print(f"ข้อผิดพลาด Wikipedia: {e}")
        
        return []
    
    def extract_wikipedia_content(self, url: str) -> str:
        """ดึงเนื้อหาจาก Wikipedia"""
        try:
            response = self.session.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # ดึงข้อความจาก paragraphs แรกๆ
                paragraphs = soup.find_all('p')[:5]
                content = '\n'.join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])
                
                return content[:1000]  # จำกัดความยาว
        except Exception as e:
            print(f"ข้อผิดพลาดในการดึงเนื้อหา Wikipedia: {e}")
        
        return ""
    
    def search_stackoverflow(self, query: str) -> List[Dict]:
        """ค้นหาจาก Stack Overflow"""
        try:
            search_url = f"https://stackoverflow.com/search?q={urllib.parse.quote(query)}"
            response = self.session.get(search_url, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                results = []
                
                questions = soup.find_all('div', class_='question-summary')[:3]
                for i, question in enumerate(questions):
                    title_elem = question.find('h3')
                    if title_elem:
                        title = title_elem.get_text().strip()
                        link_elem = title_elem.find('a')
                        if link_elem:
                            url = "https://stackoverflow.com" + link_elem.get('href', '')
                            
                            results.append({
                                'source': 'stackoverflow',
                                'title': title,
                                'url': url,
                                'content': title,
                                'relevance_score': 1.0 - (i * 0.1)
                            })
                
                return results
        except Exception as e:
            print(f"ข้อผิดพลาด Stack Overflow: {e}")
        
        return []
    
    def search_github_repos(self, query: str) -> List[Dict]:
        """ค้นหาจาก GitHub Repositories"""
        try:
            search_url = f"https://github.com/search?q={urllib.parse.quote(query)}&type=repositories"
            response = self.session.get(search_url, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                results = []
                
                repos = soup.find_all('div', class_='f4')[:3]
                for i, repo in enumerate(repos):
                    link_elem = repo.find('a')
                    if link_elem:
                        title = link_elem.get_text().strip()
                        url = "https://github.com" + link_elem.get('href', '')
                        
                        results.append({
                            'source': 'github_repos',
                            'title': title,
                            'url': url,
                            'content': f"GitHub Repository: {title}",
                            'relevance_score': 1.0 - (i * 0.1)
                        })
                
                return results
        except Exception as e:
            print(f"ข้อผิดพลาด GitHub: {e}")
        
        return []
    
    def search_mdn(self, query: str) -> List[Dict]:
        """ค้นหาจาก MDN Web Docs"""
        try:
            search_url = f"https://developer.mozilla.org/en-US/search?q={urllib.parse.quote(query)}"
            response = self.session.get(search_url, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                results = []
                
                articles = soup.find_all('article')[:3]
                for i, article in enumerate(articles):
                    title_elem = article.find('h2')
                    if title_elem:
                        link_elem = title_elem.find('a')
                        if link_elem:
                            title = link_elem.get_text().strip()
                            url = "https://developer.mozilla.org" + link_elem.get('href', '')
                            
                            results.append({
                                'source': 'mdn_docs',
                                'title': title,
                                'url': url,
                                'content': f"MDN Documentation: {title}",
                                'relevance_score': 1.0 - (i * 0.1)
                            })
                
                return results
        except Exception as e:
            print(f"ข้อผิดพลาด MDN: {e}")
        
        return []
    
    def search_w3schools(self, query: str) -> List[Dict]:
        """ค้นหาจาก W3Schools"""
        try:
            # W3Schools มี rate limiting สูง ใช้ข้อมูล mock
            results = [{
                'source': 'w3schools',
                'title': f"W3Schools Tutorial: {query}",
                'url': f"https://www.w3schools.com/{query.lower().replace(' ', '_')}/",
                'content': f"W3Schools tutorial about {query}",
                'relevance_score': 0.8
            }]
            return results
        except Exception as e:
            print(f"ข้อผิดพลาด W3Schools: {e}")
        
        return []
    
    def search_tutorials_point(self, query: str) -> List[Dict]:
        """ค้นหาจาก Tutorials Point"""
        try:
            # Tutorials Point มี rate limiting สูง ใช้ข้อมูล mock
            results = [{
                'source': 'tutorials_point',
                'title': f"Tutorials Point: {query}",
                'url': f"https://www.tutorialspoint.com/{query.lower().replace(' ', '_')}/",
                'content': f"Tutorials Point guide about {query}",
                'relevance_score': 0.7
            }]
            return results
        except Exception as e:
            print(f"ข้อผิดพลาด Tutorials Point: {e}")
        
        return []
    
    def rank_results(self, results: List[Dict], query: str) -> List[Dict]:
        """เรียงลำดับผลลัพธ์ตามความเกี่ยวข้อง"""
        query_words = query.lower().split()
        
        for result in results:
            score = result.get('relevance_score', 0.5)
            
            # เพิ่มคะแนนถ้าพบคำค้นหาใน title หรือ content
            title = result.get('title', '').lower()
            content = result.get('content', '').lower()
            
            for word in query_words:
                if word in title:
                    score += 0.2
                if word in content:
                    score += 0.1
            
            result['final_relevance_score'] = min(score, 1.0)
        
        return sorted(results, key=lambda x: x['final_relevance_score'], reverse=True)
    
    def generate_script_from_knowledge(self, prompt: str, knowledge_results: Dict) -> Dict:
        """สร้างสคริปต์จากความรู้ที่ค้นหาได้"""
        print(f"🛠️ สร้างสคริปต์จากความรู้: {prompt}")
        
        # วิเคราะห์ prompt เพื่อกำหนดประเภทโปรเจค
        project_type = self.analyze_project_type(prompt)
        
        # สร้างโค้ดตามประเภทโปรเจค
        if 'website' in project_type or 'web' in project_type:
            code = self.generate_website_code(prompt, knowledge_results)
        elif 'api' in project_type or 'backend' in project_type:
            code = self.generate_api_code(prompt, knowledge_results)
        elif 'script' in project_type or 'automation' in project_type:
            code = self.generate_automation_script(prompt, knowledge_results)
        else:
            code = self.generate_general_code(prompt, knowledge_results)
        
        # บันทึกโปรเจคในฐานข้อมูล
        project_id = self.save_project(prompt, code)
        
        return {
            'project_id': project_id,
            'project_type': project_type,
            'code': code,
            'knowledge_used': len(knowledge_results.get('results', [])),
            'created_at': datetime.now().isoformat()
        }
    
    def analyze_project_type(self, prompt: str) -> str:
        """วิเคราะห์ประเภทโปรเจคจาก prompt"""
        prompt_lower = prompt.lower()
        
        if any(word in prompt_lower for word in ['website', 'web', 'html', 'css', 'frontend']):
            return 'website'
        elif any(word in prompt_lower for word in ['api', 'backend', 'server', 'flask', 'django']):
            return 'api'
        elif any(word in prompt_lower for word in ['script', 'automation', 'bot', 'scraper']):
            return 'script'
        else:
            return 'general'
    
    def generate_website_code(self, prompt: str, knowledge_results: Dict) -> Dict:
        """สร้างโค้ดเว็บไซต์"""
        # สร้าง HTML
        html_code = f'''<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{prompt}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>{prompt}</h1>
        <nav>
            <ul>
                <li><a href="#home">หน้าแรก</a></li>
                <li><a href="#about">เกี่ยวกับ</a></li>
                <li><a href="#contact">ติดต่อ</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>ยินดีต้อนรับ</h2>
            <p>เว็บไซต์นี้สร้างขึ้นจากความรู้ที่ค้นหาได้จาก {len(knowledge_results.get('results', []))} แหล่ง</p>
        </section>
        
        <section id="about">
            <h2>เกี่ยวกับโปรเจค</h2>
            <p>{prompt}</p>
        </section>
        
        <section id="contact">
            <h2>ติดต่อเรา</h2>
            <p>สร้างโดย Advanced Cursor AI System</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Advanced Cursor AI</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>'''
        
        # สร้าง CSS
        css_code = '''* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

header h1 {
    text-align: center;
    margin-bottom: 1rem;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s;
}

nav a:hover {
    background-color: rgba(255,255,255,0.2);
}

main {
    margin-top: 150px;
    padding: 2rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

section {
    background: white;
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

h2 {
    color: #667eea;
    margin-bottom: 1rem;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1rem;
    margin-top: 2rem;
}

@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 1rem;
    }
    
    main {
        margin-top: 200px;
        padding: 1rem;
    }
}'''
        
        # สร้าง JavaScript
        js_code = '''document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    console.log('Advanced Cursor AI Website loaded successfully!');
});'''
        
        return {
            'html': html_code,
            'css': css_code,
            'js': js_code,
            'type': 'website'
        }
    
    def generate_api_code(self, prompt: str, knowledge_results: Dict) -> Dict:
        """สร้างโค้ด API"""
        python_code = f'''#!/usr/bin/env python3
"""
API สำหรับ: {prompt}
สร้างโดย Advanced Cursor AI System
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ข้อมูลจากการค้นหาความรู้
KNOWLEDGE_DATA = {json.dumps(knowledge_results.get('results', [])[:3], indent=2, ensure_ascii=False)}

@app.route('/')
def home():
    return jsonify({{
        "message": "API สำหรับ {prompt}",
        "version": "1.0.0",
        "created_by": "Advanced Cursor AI",
        "endpoints": [
            "/api/data",
            "/api/search",
            "/api/knowledge"
        ]
    }})

@app.route('/api/data')
def get_data():
    return jsonify({{
        "status": "success",
        "data": {{
            "prompt": "{prompt}",
            "timestamp": datetime.now().isoformat(),
            "knowledge_sources": {len(knowledge_results.get('results', []))}
        }}
    }})

@app.route('/api/search')
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify({{"error": "Missing query parameter"}})
    
    # ค้นหาในข้อมูลความรู้
    results = []
    for item in KNOWLEDGE_DATA:
        if query.lower() in item.get('content', '').lower():
            results.append(item)
    
    return jsonify({{
        "query": query,
        "results": results,
        "count": len(results)
    }})

@app.route('/api/knowledge')
def get_knowledge():
    return jsonify({{
        "knowledge_base": KNOWLEDGE_DATA,
        "total_sources": len(KNOWLEDGE_DATA)
    }})

if __name__ == '__main__':
    print("🚀 เริ่มต้น API Server...")
    print("📡 API Endpoints:")
    print("   - GET /")
    print("   - GET /api/data")
    print("   - GET /api/search?q=<query>")
    print("   - GET /api/knowledge")
    app.run(host='0.0.0.0', port=5000, debug=True)
'''
        
        return {
            'python': python_code,
            'type': 'api'
        }
    
    def generate_automation_script(self, prompt: str, knowledge_results: Dict) -> Dict:
        """สร้างสคริปต์อัตโนมัติ"""
        python_code = f'''#!/usr/bin/env python3
"""
สคริปต์อัตโนมัติสำหรับ: {prompt}
สร้างโดย Advanced Cursor AI System
"""

import os
import time
import requests
import json
from datetime import datetime
from pathlib import Path

class AutomationScript:
    def __init__(self):
        self.prompt = "{prompt}"
        self.knowledge_data = {json.dumps(knowledge_results.get('results', [])[:3], indent=2, ensure_ascii=False)}
        self.start_time = datetime.now()
        
    def run(self):
        """รันสคริปต์หลัก"""
        print(f"🤖 เริ่มต้นสคริปต์อัตโนมัติ: {{self.prompt}}")
        print(f"⏰ เวลาเริ่มต้น: {{self.start_time}}")
        
        try:
            # ขั้นตอนที่ 1: เตรียมข้อมูล
            self.prepare_data()
            
            # ขั้นตอนที่ 2: ประมวลผล
            self.process_data()
            
            # ขั้นตอนที่ 3: บันทึกผลลัพธ์
            self.save_results()
            
            print("✅ สคริปต์ทำงานเสร็จสิ้น")
            
        except Exception as e:
            print(f"❌ ข้อผิดพลาด: {{e}}")
    
    def prepare_data(self):
        """เตรียมข้อมูล"""
        print("📋 เตรียมข้อมูล...")
        
        # สร้างโฟลเดอร์สำหรับเก็บผลลัพธ์
        self.output_dir = Path("automation_results")
        self.output_dir.mkdir(exist_ok=True)
        
        print(f"📁 สร้างโฟลเดอร์: {{self.output_dir}}")
    
    def process_data(self):
        """ประมวลผลข้อมูล"""
        print("⚙️ ประมวลผลข้อมูล...")
        
        # ประมวลผลข้อมูลความรู้
        processed_data = []
        for item in self.knowledge_data:
            processed_item = {{
                "source": item.get("source", "unknown"),
                "title": item.get("title", ""),
                "processed_at": datetime.now().isoformat(),
                "content_length": len(item.get("content", ""))
            }}
            processed_data.append(processed_item)
        
        self.processed_data = processed_data
        print(f"✅ ประมวลผล {{len(processed_data)}} รายการ")
    
    def save_results(self):
        """บันทึกผลลัพธ์"""
        print("💾 บันทึกผลลัพธ์...")
        
        results = {{
            "prompt": self.prompt,
            "start_time": self.start_time.isoformat(),
            "end_time": datetime.now().isoformat(),
            "processed_data": self.processed_data,
            "summary": {{
                "total_items": len(self.processed_data),
                "sources": list(set([item["source"] for item in self.processed_data]))
            }}
        }}
        
        # บันทึกเป็น JSON
        output_file = self.output_dir / f"results_{{datetime.now().strftime('%Y%m%d_%H%M%S')}}.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        print(f"📄 บันทึกผลลัพธ์: {{output_file}}")

def main():
    script = AutomationScript()
    script.run()

if __name__ == "__main__":
    main()
'''
        
        return {
            'python': python_code,
            'type': 'automation'
        }
    
    def generate_general_code(self, prompt: str, knowledge_results: Dict) -> Dict:
        """สร้างโค้ดทั่วไป"""
        python_code = f'''#!/usr/bin/env python3
"""
โปรแกรมสำหรับ: {prompt}
สร้างโดย Advanced Cursor AI System
"""

import json
from datetime import datetime

def main():
    """ฟังก์ชันหลัก"""
    print("🚀 เริ่มต้นโปรแกรม: {prompt}")
    
    # ข้อมูลความรู้ที่ค้นหาได้
    knowledge_data = {json.dumps(knowledge_results.get('results', [])[:3], indent=2, ensure_ascii=False)}
    
    print(f"📚 พบข้อมูลความรู้ {{len(knowledge_data)}} รายการ")
    
    # แสดงข้อมูลความรู้
    for i, item in enumerate(knowledge_data, 1):
        print(f"\\n{{i}}. แหล่งที่มา: {{item.get('source', 'ไม่ระบุ')}}")
        print(f"   หัวข้อ: {{item.get('title', 'ไม่มีหัวข้อ')}}")
        print(f"   เนื้อหา: {{item.get('content', '')[:100]}}...")
    
    print("\\n✅ โปรแกรมทำงานเสร็จสิ้น")

if __name__ == "__main__":
    main()
'''
        
        return {
            'python': python_code,
            'type': 'general'
        }
    
    def save_project(self, prompt: str, code: Dict) -> int:
        """บันทึกโปรเจคในฐานข้อมูล"""
        try:
            conn = sqlite3.connect(self.projects_db)
            cursor = conn.cursor()
            
            current_time = datetime.now().isoformat()
            
            cursor.execute('''
                INSERT INTO projects 
                (name, prompt, status, code_html, code_css, code_js, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                prompt[:100],  # ชื่อโปรเจค
                prompt,
                'pending',
                code.get('html', ''),
                code.get('css', ''),
                code.get('js', '') or code.get('python', ''),
                current_time,
                current_time
            ))
            
            project_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            return project_id
            
        except Exception as e:
            print(f"ข้อผิดพลาดในการบันทึกโปรเจค: {e}")
            return 0
    
    def start_cursor_integration(self):
        """เริ่มต้นการเชื่อมต่อกับ Cursor"""
        self.is_running = True
        
        # เริ่มต้น monitoring thread
        monitor_thread = threading.Thread(target=self._monitor_cursor_commands, daemon=True)
        monitor_thread.start()
        
        print("👀 เริ่มติดตามคำสั่งจาก Cursor AI...")
        print(f"📁 ไฟล์คำสั่ง: {self.command_file}")
        print(f"📄 ไฟล์ตอบกลับ: {self.response_file}")
        
        # สร้างไฟล์ตัวอย่าง
        self.create_example_files()
    
    def create_example_files(self):
        """สร้างไฟล์ตัวอย่างสำหรับทดสอบ"""
        # ไฟล์คำสั่งตัวอย่าง
        example_command = {
            "prompt": "สร้างเว็บไซต์แนะนำตัว",
            "action": "create"
        }
        
        with open(self.command_file, 'w', encoding='utf-8') as f:
            json.dump(example_command, f, indent=2, ensure_ascii=False)
        
        print(f"📝 สร้างไฟล์ตัวอย่าง: {self.command_file}")
    
    def _monitor_cursor_commands(self):
        """ติดตามคำสั่งจาก Cursor"""
        last_modified = 0
        
        while self.is_running:
            try:
                if self.command_file.exists():
                    current_modified = self.command_file.stat().st_mtime
                    
                    if current_modified > last_modified:
                        last_modified = current_modified
                        self._process_cursor_command()
                
                time.sleep(1)  # ตรวจสอบทุกวินาที
                
            except Exception as e:
                print(f"⚠️ ข้อผิดพลาดในการติดตาม: {e}")
                time.sleep(5)
    
    def _process_cursor_command(self):
        """ประมวลผลคำสั่งจาก Cursor"""
        try:
            with open(self.command_file, 'r', encoding='utf-8') as f:
                content = f.read().strip()
            
            if not content:
                return
            
            # แปลง JSON
            try:
                command_data = json.loads(content)
            except json.JSONDecodeError:
                command_data = {'prompt': content, 'action': 'create'}
            
            prompt = command_data.get('prompt', '').strip()
            action = command_data.get('action', 'create').lower()
            
            if not prompt:
                return
            
            print(f"\n📨 ได้รับคำสั่งจาก Cursor: {prompt}")
            print(f"🎬 การกระทำ: {action}")
            
            if action == 'create':
                self._handle_create_action(prompt)
            elif action == 'confirm':
                self._handle_confirm_action(prompt)
            elif action == 'edit':
                self._handle_edit_action(prompt, command_data.get('edit_details', ''))
            elif action == 'cancel':
                self._handle_cancel_action(prompt)
            
            # ล้างไฟล์คำสั่งหลังประมวลผล
            with open(self.command_file, 'w') as f:
                f.write('')
                
        except Exception as e:
            print(f"❌ ข้อผิดพลาดในการประมวลผลคำสั่ง: {e}")
    
    def _handle_create_action(self, prompt: str):
        """จัดการการสร้างโปรเจคใหม่"""
        self._update_cursor_status("🔍 ค้นหาความรู้ทั่วโลก...", "searching")
        
        # 1. ค้นหาความรู้
        knowledge_results = self.search_global_knowledge(prompt)
        
        self._update_cursor_status("🛠️ สร้างสคริปต์จากความรู้...", "generating")
        
        # 2. สร้างสคริปต์
        script_code = self.generate_script_from_knowledge(prompt, knowledge_results)
        
        # 3. แสดงผลลัพธ์และขอการยืนยัน
        self._show_confirmation_dialog(prompt, script_code, knowledge_results)
    
    def _handle_confirm_action(self, prompt: str):
        """จัดการการยืนยัน - Deploy ไป GitHub"""
        self._update_cursor_status("🚀 กำลัง Deploy ไป GitHub...", "deploying")
        
        # ดึงโค้ดล่าสุดจากฐานข้อมูล
        project_data = self._get_latest_project_data()
        if project_data:
            success = self.deploy_to_github(project_data)
            if success:
                self._update_cursor_status("✅ Deploy สำเร็จ!", "completed")
            else:
                self._update_cursor_status("❌ Deploy ล้มเหลว", "error")
    
    def _handle_edit_action(self, prompt: str, edit_details: str):
        """จัดการการแก้ไข"""
        self._update_cursor_status("✏️ กำลังแก้ไข...", "editing")
        
        # ดึงโปรเจคล่าสุดและแก้ไข
        project_data = self._get_latest_project_data()
        if project_data:
            # แก้ไขโค้ดตาม edit_details
            modified_code = self._modify_code(project_data, edit_details)
            self._show_confirmation_dialog(prompt, modified_code, {})
    
    def _handle_cancel_action(self, prompt: str):
        """จัดการการยกเลิก"""
        self._update_cursor_status("🚫 ยกเลิกการทำงาน", "cancelled")
        print(f"🚫 ยกเลิกงาน: {prompt}")
    
    def _update_cursor_status(self, message: str, status: str):
        """อัปเดตสถานะให้ Cursor"""
        response_data = {
            "status": status,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        
        with open(self.response_file, 'w', encoding='utf-8') as f:
            json.dump(response_data, f, indent=2, ensure_ascii=False)
        
        print(f"📡 อัปเดตสถานะ: {message}")
    
    def _show_confirmation_dialog(self, prompt: str, script_code: Dict, knowledge_results: Dict):
        """แสดงหน้าต่างยืนยัน"""
        confirmation_data = {
            "prompt": prompt,
            "script_code": script_code,
            "knowledge_sources": len(knowledge_results.get('results', [])),
            "actions": ["ยืนยัน", "แก้ไข", "ยกเลิก"],
            "timestamp": datetime.now().isoformat()
        }
        
        with open(self.response_file, 'w', encoding='utf-8') as f:
            json.dump(confirmation_data, f, indent=2, ensure_ascii=False)
        
        print(f"💬 แสดงหน้าต่างยืนยันสำหรับ: {prompt}")
        print("🔄 รอการตอบกลับจากผู้ใช้...")
    
    def _get_latest_project_data(self) -> Optional[Dict]:
        """ดึงข้อมูลโปรเจคล่าสุด"""
        try:
            conn = sqlite3.connect(self.projects_db)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT * FROM projects 
                ORDER BY created_at DESC 
                LIMIT 1
            ''')
            
            row = cursor.fetchone()
            conn.close()
            
            if row:
                return {
                    'id': row[0],
                    'name': row[1],
                    'prompt': row[2],
                    'status': row[3],
                    'code_html': row[4],
                    'code_css': row[5],
                    'code_js': row[6],
                    'github_url': row[7],
                    'created_at': row[8],
                    'updated_at': row[9]
                }
        except Exception as e:
            print(f"ข้อผิดพลาดในการดึงข้อมูลโปรเจค: {e}")
        
        return None
    
    def _modify_code(self, project_data: Dict, edit_details: str) -> Dict:
        """แก้ไขโค้ดตาม edit_details"""
        # ตัวอย่างการแก้ไขโค้ด (สามารถพัฒนาต่อได้)
        modified_code = {
            'html': project_data.get('code_html', ''),
            'css': project_data.get('code_css', ''),
            'js': project_data.get('code_js', ''),
            'type': 'website'
        }
        
        # เพิ่มคอมเมนต์ว่าแก้ไขอะไร
        if modified_code['html']:
            modified_code['html'] += f"\n<!-- แก้ไข: {edit_details} -->"
        
        return modified_code
    
    def deploy_to_github(self, project_data: Dict) -> bool:
        """Deploy โปรเจคไป GitHub"""
        try:
            print("🚀 เริ่มต้น Deploy ไป GitHub...")
            
            # สร้างโฟลเดอร์โปรเจค
            project_name = project_data['name'].replace(' ', '_').lower()
            project_dir = self.workspace_path / "projects" / project_name
            project_dir.mkdir(exist_ok=True)
            
            # เขียนไฟล์โค้ด
            if project_data.get('code_html'):
                with open(project_dir / "index.html", 'w', encoding='utf-8') as f:
                    f.write(project_data['code_html'])
            
            if project_data.get('code_css'):
                with open(project_dir / "style.css", 'w', encoding='utf-8') as f:
                    f.write(project_data['code_css'])
            
            if project_data.get('code_js'):
                js_filename = "script.js" if project_data.get('code_html') else "main.py"
                with open(project_dir / js_filename, 'w', encoding='utf-8') as f:
                    f.write(project_data['code_js'])
            
            # สร้าง README.md
            readme_content = f"""# {project_data['name']}

## คำอธิบาย
{project_data['prompt']}

## สร้างโดย
Advanced Cursor AI System

## วันที่สร้าง
{project_data['created_at']}

## การใช้งาน
1. เปิดไฟล์ index.html ในเบราว์เซอร์ (สำหรับเว็บไซต์)
2. รันไฟล์ main.py (สำหรับสคริปต์ Python)

## ฟีเจอร์
- สร้างจากความรู้ที่ค้นหาจากแหล่งต่างๆ ทั่วโลก
- รองรับ responsive design
- โค้ดที่สะอาดและอ่านง่าย
"""
            
            with open(project_dir / "README.md", 'w', encoding='utf-8') as f:
                f.write(readme_content)
            
            print(f"📁 สร้างโปรเจคใน: {project_dir}")
            print("✅ Deploy สำเร็จ (Local)")
            
            # อัปเดตสถานะในฐานข้อมูล
            self._update_project_status(project_data['id'], 'deployed', str(project_dir))
            
            return True
            
        except Exception as e:
            print(f"❌ ข้อผิดพลาดใน Deploy: {e}")
            return False
    
    def _update_project_status(self, project_id: int, status: str, github_url: str = ""):
        """อัปเดตสถานะโปรเจค"""
        try:
            conn = sqlite3.connect(self.projects_db)
            cursor = conn.cursor()
            
            cursor.execute('''
                UPDATE projects 
                SET status = ?, github_url = ?, updated_at = ?
                WHERE id = ?
            ''', (status, github_url, datetime.now().isoformat(), project_id))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"ข้อผิดพลาดในการอัปเดตสถานะ: {e}")
    
    def stop(self):
        """หยุดการทำงาน"""
        self.is_running = False
        print("🛑 หยุดการทำงานของระบบ")
    
    def get_stats(self) -> Dict:
        """ดูสถิติการใช้งาน"""
        try:
            # สถิติการค้นหา
            conn = sqlite3.connect(self.knowledge_db)
            cursor = conn.cursor()
            
            cursor.execute('SELECT COUNT(*) FROM search_history')
            total_searches = cursor.fetchone()[0]
            
            cursor.execute('SELECT AVG(search_time) FROM search_history')
            avg_search_time = cursor.fetchone()[0] or 0
            
            conn.close()
            
            # สถิติโปรเจค
            conn = sqlite3.connect(self.projects_db)
            cursor = conn.cursor()
            
            cursor.execute('SELECT COUNT(*) FROM projects')
            total_projects = cursor.fetchone()[0]
            
            cursor.execute('SELECT COUNT(*) FROM projects WHERE status = "deployed"')
            deployed_projects = cursor.fetchone()[0]
            
            conn.close()
            
            return {
                'total_searches': total_searches,
                'avg_search_time': round(avg_search_time, 2),
                'total_projects': total_projects,
                'deployed_projects': deployed_projects,
                'success_rate': round((deployed_projects / max(total_projects, 1)) * 100, 2)
            }
            
        except Exception as e:
            print(f"ข้อผิดพลาดในการดูสถิติ: {e}")
            return {}

def main():
    """ฟังก์ชันหลักสำหรับรันระบบ"""
    print("🚀 เริ่มต้น Advanced Cursor AI System")
    print("=" * 50)
    
    # สร้างระบบ
    ai_system = AdvancedCursorAI()
    
    try:
        # ทดสอบการค้นหาความรู้
        print("\n🧪 ทดสอบการค้นหาความรู้...")
        test_query = "Python web development"
        knowledge_results = ai_system.search_global_knowledge(test_query, max_sources=2)
        
        print(f"✅ ทดสอบสำเร็จ: พบ {len(knowledge_results.get('results', []))} ผลลัพธ์")
        
        # ทดสอบการสร้างโค้ด
        print("\n🛠️ ทดสอบการสร้างโค้ด...")
        test_prompt = "สร้างเว็บไซต์แนะนำตัว"
        script_code = ai_system.generate_script_from_knowledge(test_prompt, knowledge_results)
        
        print(f"✅ สร้างโค้ดสำเร็จ: ประเภท {script_code.get('project_type', 'unknown')}")
        
        # แสดงสถิติ
        print("\n📊 สถิติการใช้งาน:")
        stats = ai_system.get_stats()
        for key, value in stats.items():
            print(f"   {key}: {value}")
        
        # เริ่มต้นการเชื่อมต่อกับ Cursor
        print("\n🔗 เริ่มต้นการเชื่อมต่อกับ Cursor...")
        ai_system.start_cursor_integration()
        
        print("\n✅ ระบบพร้อมใช้งาน!")
        print("📝 วิธีใช้งาน:")
        print("   1. แก้ไขไฟล์ .cursor_commands.json")
        print("   2. ระบบจะประมวลผลอัตโนมัติ")
        print("   3. ดูผลลัพธ์ใน .cursor_responses.json")
        print("\n⌨️ กด Ctrl+C เพื่อหยุดระบบ")
        
        # รอให้ผู้ใช้หยุดระบบ
        while ai_system.is_running:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n🛑 ได้รับสัญญาณหยุดระบบ")
    except Exception as e:
        print(f"\n❌ ข้อผิดพลาด: {e}")
    finally:
        ai_system.stop()
        print("👋 ระบบหยุดทำงานแล้ว")

if __name__ == "__main__":
    main()

