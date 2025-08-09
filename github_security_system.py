#!/usr/bin/env python3
"""
GitHub Security System - ฟรี 100%
ระบบความปลอดภัยสำหรับป้องกัน API Keys และโค้ดสำคัญ
เชื่อมต่อกับ Cursor AI และ GitHub
"""

import os
import re
import json
import hashlib
import hmac
import time
import base64
import subprocess
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import secrets
import logging

class GitHubSecuritySystem:
    def __init__(self, project_path: str = None):
        self.project_path = Path(project_path) if project_path else Path.cwd()
        self.security_config_file = self.project_path / ".security_config.json"
        self.encrypted_secrets_file = self.project_path / ".encrypted_secrets"
        self.gitignore_file = self.project_path / ".gitignore"
        self.cursor_rules_file = self.project_path / ".cursor" / "rules"
        
        # ตั้งค่า logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # รายการ patterns ที่อันตราย
        self.dangerous_patterns = [
            r'api[_-]?key\s*[=:]\s*["\']?([a-zA-Z0-9_-]{20,})["\']?',
            r'secret[_-]?key\s*[=:]\s*["\']?([a-zA-Z0-9_-]{20,})["\']?',
            r'access[_-]?token\s*[=:]\s*["\']?([a-zA-Z0-9_-]{20,})["\']?',
            r'private[_-]?key\s*[=:]\s*["\']?([a-zA-Z0-9_-]{20,})["\']?',
            r'password\s*[=:]\s*["\']?([a-zA-Z0-9_-]{8,})["\']?',
            r'github[_-]?token\s*[=:]\s*["\']?(ghp_[a-zA-Z0-9]{36})["\']?',
            r'openai[_-]?api[_-]?key\s*[=:]\s*["\']?(sk-[a-zA-Z0-9]{48})["\']?',
            r'aws[_-]?access[_-]?key\s*[=:]\s*["\']?(AKIA[a-zA-Z0-9]{16})["\']?',
            r'bearer\s+([a-zA-Z0-9_-]{20,})',
            r'authorization:\s*["\']?bearer\s+([a-zA-Z0-9_-]{20,})["\']?'
        ]
        
        # ไฟล์ที่ต้องป้องกัน
        self.protected_files = [
            '.env', '.env.local', '.env.production', '.env.development',
            '*.pem', '*.key', '*.p12', '*.keystore', '*.jks',
            'config.json', 'secrets.json', 'credentials.json',
            '.aws/credentials', '.ssh/id_rsa', '.ssh/id_ed25519'
        ]
        
        self.init_security_system()
    
    def init_security_system(self):
        """เริ่มต้นระบบความปลอดภัย"""
        self.logger.info("🔒 เริ่มต้นระบบความปลอดภัย GitHub Security System")
        
        # สร้างโฟลเดอร์ที่จำเป็น
        (self.project_path / ".cursor").mkdir(exist_ok=True)
        (self.project_path / ".github" / "workflows").mkdir(parents=True, exist_ok=True)
        
        # ตั้งค่าระบบ
        self.setup_gitignore()
        self.setup_cursor_rules()
        self.setup_pre_commit_hooks()
        self.setup_github_actions_security()
        self.create_security_config()
        
        self.logger.info("✅ ระบบความปลอดภัยพร้อมใช้งาน")
    
    def setup_gitignore(self):
        """ตั้งค่า .gitignore เพื่อป้องกันไฟล์สำคัญ"""
        gitignore_content = """# Security - API Keys และ Secrets
.env
.env.local
.env.development
.env.production
.env.test
*.pem
*.key
*.p12
*.keystore
*.jks
config.json
secrets.json
credentials.json
.aws/
.ssh/
*.log

# Security System Files
.security_config.json
.encrypted_secrets
.cursor/cache/
.cursor/logs/

# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/

# Build outputs
dist/
build/
.next/
.nuxt/

# IDE
.vscode/settings.json
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
.cache/
"""
        
        try:
            with open(self.gitignore_file, 'w', encoding='utf-8') as f:
                f.write(gitignore_content)
            self.logger.info("✅ ตั้งค่า .gitignore เสร็จสิ้น")
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง .gitignore: {e}")
    
    def setup_cursor_rules(self):
        """ตั้งค่ากฎสำหรับ Cursor AI"""
        cursor_rules = """# Cursor AI Security Rules

## 🔒 ความปลอดภัย - ห้ามเด็ดขาด

### ห้ามอ่าน/แสดง/คัดลอกเนื้อหาจากไฟล์เหล่านี้:
- .env, .env.*, *.pem, *.key, *.keystore
- config.json, secrets.json, credentials.json
- .aws/credentials, .ssh/id_rsa, .ssh/id_ed25519
- ไฟล์ใดๆ ที่มี API keys, passwords, tokens

### ห้ามสร้างโค้ดที่:
- ใส่ API keys ในฝั่ง frontend/client-side
- hardcode passwords หรือ secrets
- เปิดเผยข้อมูลสำคัญใน console.log
- ส่ง sensitive data ผ่าน URL parameters

### ต้องทำเสมอ:
- ใช้ environment variables สำหรับ secrets
- สร้าง proxy/backend สำหรับ API calls
- ตรวจสอบ secrets ก่อน commit
- ใช้ HTTPS สำหรับ production

## 🛡️ Best Practices

### เมื่อสร้าง API integration:
1. สร้าง backend proxy แทนการเรียก API ตรงจาก frontend
2. ใช้ rate limiting และ authentication
3. validate input และ sanitize output
4. ใช้ CORS policy ที่เหมาะสม

### เมื่อทำงานกับ secrets:
1. ใช้ .env files (ไม่ commit)
2. สร้าง .env.example สำหรับทีม
3. ใช้ platform secrets (Vercel, Netlify, etc.)
4. rotate keys เป็นประจำ

### เมื่อ deploy:
1. ตรวจสอบไม่มี secrets ใน build output
2. ใช้ environment variables บน platform
3. เปิด security headers
4. ใช้ HTTPS เท่านั้น

## 🚨 Emergency Response

ถ้าเผลอ commit secrets:
1. Rotate/เปลี่ยน key ทันที
2. ลบออกจาก git history
3. force push และแจ้งทีม
4. ตรวจสอบ usage logs

## 📋 Checklist ก่อน Commit

- [ ] ไม่มี API keys ในโค้ด
- [ ] ไม่มี passwords hardcoded
- [ ] ใช้ environment variables
- [ ] ตรวจสอบด้วย gitleaks
- [ ] ทดสอบ security headers
- [ ] ตรวจสอบ CORS settings

## 🔧 Tools Integration

ใช้เครื่องมือเหล่านี้:
- gitleaks: ตรวจสอบ secrets
- pre-commit: hooks ก่อน commit
- OWASP ZAP: security testing
- Snyk: dependency scanning

---
⚠️ กฎเหล่านี้มีไว้เพื่อความปลอดภัย กรุณาปฏิบัติตามอย่างเคร่งครัด
"""
        
        try:
            with open(self.cursor_rules_file, 'w', encoding='utf-8') as f:
                f.write(cursor_rules)
            self.logger.info("✅ ตั้งค่า Cursor rules เสร็จสิ้น")
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง Cursor rules: {e}")
    
    def setup_pre_commit_hooks(self):
        """ตั้งค่า pre-commit hooks สำหรับตรวจสอบความปลอดภัย"""
        pre_commit_config = """# Pre-commit hooks for security
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
        name: Detect secrets
        description: Detect secrets in staged files
        entry: gitleaks protect --staged --redact --verbose
        language: golang
        types: [text]

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-added-large-files
        args: ['--maxkb=1000']
      - id: check-merge-conflict
      - id: detect-private-key

  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black
        language_version: python3

  - repo: local
    hooks:
      - id: security-check
        name: Custom Security Check
        entry: python .security/check_security.py
        language: python
        types: [text]
        pass_filenames: true
"""
        
        pre_commit_file = self.project_path / ".pre-commit-config.yaml"
        
        try:
            with open(pre_commit_file, 'w', encoding='utf-8') as f:
                f.write(pre_commit_config)
            
            # สร้างสคริปต์ตรวจสอบความปลอดภัยแบบกำหนดเอง
            self.create_custom_security_check()
            
            self.logger.info("✅ ตั้งค่า pre-commit hooks เสร็จสิ้น")
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง pre-commit config: {e}")
    
    def create_custom_security_check(self):
        """สร้างสคริปต์ตรวจสอบความปลอดภัยแบบกำหนดเอง"""
        security_dir = self.project_path / ".security"
        security_dir.mkdir(exist_ok=True)
        
        security_check_script = '''#!/usr/bin/env python3
"""
Custom Security Check Script
ตรวจสอบความปลอดภัยก่อน commit
"""

import sys
import re
import os
from pathlib import Path

# Patterns ที่อันตราย
DANGEROUS_PATTERNS = [
    (r'api[_-]?key\s*[=:]\s*["\']?([a-zA-Z0-9_-]{20,})["\']?', 'API Key detected'),
    (r'secret[_-]?key\s*[=:]\s*["\']?([a-zA-Z0-9_-]{20,})["\']?', 'Secret Key detected'),
    (r'password\s*[=:]\s*["\']?([a-zA-Z0-9_-]{8,})["\']?', 'Password detected'),
    (r'token\s*[=:]\s*["\']?([a-zA-Z0-9_-]{20,})["\']?', 'Token detected'),
    (r'ghp_[a-zA-Z0-9]{36}', 'GitHub Personal Access Token detected'),
    (r'sk-[a-zA-Z0-9]{48}', 'OpenAI API Key detected'),
    (r'AKIA[a-zA-Z0-9]{16}', 'AWS Access Key detected'),
]

def check_file_security(file_path):
    """ตรวจสอบความปลอดภัยของไฟล์"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        issues = []
        for pattern, message in DANGEROUS_PATTERNS:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                line_num = content[:match.start()].count('\\n') + 1
                issues.append(f"Line {line_num}: {message}")
        
        return issues
    except Exception as e:
        return [f"Error reading file: {e}"]

def main():
    """Main function"""
    if len(sys.argv) < 2:
        print("Usage: python check_security.py <file1> <file2> ...")
        sys.exit(1)
    
    total_issues = 0
    
    for file_path in sys.argv[1:]:
        if not os.path.exists(file_path):
            continue
            
        # ข้าม binary files
        if file_path.endswith(('.jpg', '.png', '.gif', '.pdf', '.zip', '.exe')):
            continue
        
        issues = check_file_security(file_path)
        if issues:
            print(f"🚨 Security issues in {file_path}:")
            for issue in issues:
                print(f"  - {issue}")
            total_issues += len(issues)
    
    if total_issues > 0:
        print(f"\\n❌ Found {total_issues} security issues!")
        print("Please remove sensitive data before committing.")
        sys.exit(1)
    else:
        print("✅ No security issues found.")
        sys.exit(0)

if __name__ == "__main__":
    main()
'''
        
        security_check_file = security_dir / "check_security.py"
        
        try:
            with open(security_check_file, 'w', encoding='utf-8') as f:
                f.write(security_check_script)
            
            # ทำให้ executable
            os.chmod(security_check_file, 0o755)
            
            self.logger.info("✅ สร้างสคริปต์ตรวจสอบความปลอดภัยเสร็จสิ้น")
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้างสคริปต์ตรวจสอบ: {e}")
    
    def setup_github_actions_security(self):
        """ตั้งค่า GitHub Actions สำหรับความปลอดภัย"""
        workflow_content = """name: Security Check

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security-check:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Run Gitleaks
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results to GitHub Security tab
      uses: github/codeql-action/upload-sarif@v2
      if: always()
      with:
        sarif_file: 'trivy-results.sarif'
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install bandit safety
    
    - name: Run Bandit security check
      run: |
        bandit -r . -f json -o bandit-report.json || true
    
    - name: Run Safety check
      run: |
        safety check --json --output safety-report.json || true
    
    - name: Custom Security Check
      run: |
        python .security/check_security.py $(find . -type f -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.json" | head -100)

  dependency-check:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Run Snyk to check for vulnerabilities
      uses: snyk/actions/node@master
      continue-on-error: true
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
"""
        
        workflow_file = self.project_path / ".github" / "workflows" / "security.yml"
        
        try:
            with open(workflow_file, 'w', encoding='utf-8') as f:
                f.write(workflow_content)
            self.logger.info("✅ ตั้งค่า GitHub Actions security เสร็จสิ้น")
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง GitHub Actions: {e}")
    
    def create_security_config(self):
        """สร้างไฟล์ config สำหรับระบบความปลอดภัย"""
        config = {
            "version": "1.0",
            "enabled": True,
            "scan_on_save": True,
            "scan_on_commit": True,
            "auto_encrypt_secrets": True,
            "allowed_domains": [],
            "blocked_patterns": self.dangerous_patterns,
            "protected_files": self.protected_files,
            "notification_webhook": "",
            "emergency_contacts": [],
            "last_scan": None,
            "scan_results": []
        }
        
        try:
            with open(self.security_config_file, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2, ensure_ascii=False)
            self.logger.info("✅ สร้างไฟล์ config เสร็จสิ้น")
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง config: {e}")
    
    def scan_project_for_secrets(self) -> Dict:
        """สแกนโปรเจคหา secrets และข้อมูลสำคัญ"""
        self.logger.info("🔍 เริ่มสแกนโปรเจคหา secrets...")
        
        results = {
            "timestamp": time.time(),
            "total_files_scanned": 0,
            "issues_found": [],
            "files_with_issues": [],
            "risk_level": "low"
        }
        
        # สแกนไฟล์ในโปรเจค
        for file_path in self.project_path.rglob("*"):
            if file_path.is_file() and not self._should_skip_file(file_path):
                results["total_files_scanned"] += 1
                issues = self._scan_file_for_secrets(file_path)
                
                if issues:
                    results["files_with_issues"].append(str(file_path))
                    results["issues_found"].extend(issues)
        
        # กำหนดระดับความเสี่ยง
        issue_count = len(results["issues_found"])
        if issue_count == 0:
            results["risk_level"] = "low"
        elif issue_count <= 5:
            results["risk_level"] = "medium"
        else:
            results["risk_level"] = "high"
        
        self.logger.info(f"✅ สแกนเสร็จสิ้น: {issue_count} ปัญหา ใน {results['total_files_scanned']} ไฟล์")
        
        # บันทึกผลลัพธ์
        self._save_scan_results(results)
        
        return results
    
    def _should_skip_file(self, file_path: Path) -> bool:
        """ตรวจสอบว่าควรข้ามไฟล์นี้หรือไม่"""
        skip_patterns = [
            ".git/", "node_modules/", "__pycache__/", ".venv/", "venv/",
            ".jpg", ".png", ".gif", ".pdf", ".zip", ".exe", ".dll",
            ".security_config.json", ".encrypted_secrets"
        ]
        
        file_str = str(file_path)
        return any(pattern in file_str for pattern in skip_patterns)
    
    def _scan_file_for_secrets(self, file_path: Path) -> List[Dict]:
        """สแกนไฟล์หา secrets"""
        issues = []
        
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            for pattern in self.dangerous_patterns:
                matches = re.finditer(pattern, content, re.IGNORECASE)
                for match in matches:
                    line_num = content[:match.start()].count('\n') + 1
                    
                    issues.append({
                        "file": str(file_path),
                        "line": line_num,
                        "pattern": pattern,
                        "match": match.group(0)[:50] + "..." if len(match.group(0)) > 50 else match.group(0),
                        "severity": self._get_severity(pattern),
                        "timestamp": time.time()
                    })
        
        except Exception as e:
            self.logger.warning(f"⚠️ ไม่สามารถอ่านไฟล์ {file_path}: {e}")
        
        return issues
    
    def _get_severity(self, pattern: str) -> str:
        """กำหนดระดับความรุนแรงของ pattern"""
        high_risk_keywords = ['api_key', 'secret_key', 'private_key', 'password']
        medium_risk_keywords = ['token', 'access']
        
        pattern_lower = pattern.lower()
        
        if any(keyword in pattern_lower for keyword in high_risk_keywords):
            return "high"
        elif any(keyword in pattern_lower for keyword in medium_risk_keywords):
            return "medium"
        else:
            return "low"
    
    def _save_scan_results(self, results: Dict):
        """บันทึกผลการสแกน"""
        try:
            # อัปเดต config
            if self.security_config_file.exists():
                with open(self.security_config_file, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                
                config["last_scan"] = results["timestamp"]
                config["scan_results"].append(results)
                
                # เก็บแค่ 10 ผลลัพธ์ล่าสุด
                if len(config["scan_results"]) > 10:
                    config["scan_results"] = config["scan_results"][-10:]
                
                with open(self.security_config_file, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2, ensure_ascii=False)
        
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถบันทึกผลการสแกน: {e}")
    
    def encrypt_secrets(self, secrets_dict: Dict[str, str], password: str) -> bool:
        """เข้ารหัส secrets"""
        try:
            # สร้าง key จาก password
            password_bytes = password.encode()
            salt = os.urandom(16)
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=100000,
            )
            key = base64.urlsafe_b64encode(kdf.derive(password_bytes))
            
            # เข้ารหัส
            fernet = Fernet(key)
            encrypted_data = fernet.encrypt(json.dumps(secrets_dict).encode())
            
            # บันทึกไฟล์
            with open(self.encrypted_secrets_file, 'wb') as f:
                f.write(salt + encrypted_data)
            
            self.logger.info("✅ เข้ารหัส secrets เสร็จสิ้น")
            return True
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถเข้ารหัส secrets: {e}")
            return False
    
    def decrypt_secrets(self, password: str) -> Optional[Dict[str, str]]:
        """ถอดรหัส secrets"""
        try:
            if not self.encrypted_secrets_file.exists():
                return None
            
            with open(self.encrypted_secrets_file, 'rb') as f:
                data = f.read()
            
            # แยก salt และ encrypted data
            salt = data[:16]
            encrypted_data = data[16:]
            
            # สร้าง key จาก password
            password_bytes = password.encode()
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=100000,
            )
            key = base64.urlsafe_b64encode(kdf.derive(password_bytes))
            
            # ถอดรหัส
            fernet = Fernet(key)
            decrypted_data = fernet.decrypt(encrypted_data)
            
            return json.loads(decrypted_data.decode())
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถถอดรหัส secrets: {e}")
            return None
    
    def create_secure_proxy(self, api_configs: List[Dict]) -> str:
        """สร้าง secure proxy สำหรับ API calls"""
        proxy_code = '''#!/usr/bin/env python3
"""
Secure API Proxy - ฟรี 100%
Proxy สำหรับเรียก APIs อย่างปลอดภัย
"""

import os
import time
import hmac
import hashlib
import json
from fastapi import FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import httpx
import redis
from typing import Optional

app = FastAPI(title="Secure API Proxy", version="1.0.0")

# Security Configuration
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))

# Redis for rate limiting (optional)
try:
    redis_client = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379"))
except:
    redis_client = None

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Trusted Host Middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]  # Configure this properly in production
)

class SecurityMiddleware:
    def __init__(self):
        self.rate_limits = {}
    
    def check_rate_limit(self, client_ip: str) -> bool:
        """ตรวจสอบ rate limit"""
        current_time = time.time()
        minute_window = int(current_time // 60)
        
        if redis_client:
            # ใช้ Redis
            key = f"rate_limit:{client_ip}:{minute_window}"
            current_count = redis_client.get(key)
            
            if current_count is None:
                redis_client.setex(key, 60, 1)
                return True
            elif int(current_count) < RATE_LIMIT_PER_MINUTE:
                redis_client.incr(key)
                return True
            else:
                return False
        else:
            # ใช้ memory (สำหรับ development)
            if client_ip not in self.rate_limits:
                self.rate_limits[client_ip] = {}
            
            if minute_window not in self.rate_limits[client_ip]:
                self.rate_limits[client_ip][minute_window] = 1
                return True
            elif self.rate_limits[client_ip][minute_window] < RATE_LIMIT_PER_MINUTE:
                self.rate_limits[client_ip][minute_window] += 1
                return True
            else:
                return False
    
    def verify_signature(self, payload: str, signature: str) -> bool:
        """ตรวจสอบ HMAC signature"""
        expected_signature = hmac.new(
            SECRET_KEY.encode(),
            payload.encode(),
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(signature, expected_signature)

security = SecurityMiddleware()

@app.middleware("http")
async def security_middleware(request: Request, call_next):
    """Security middleware"""
    client_ip = request.client.host
    
    # Rate limiting
    if not security.check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    
    # HMAC verification (optional)
    signature = request.headers.get("X-Signature")
    if signature:
        body = await request.body()
        if not security.verify_signature(body.decode(), signature):
            raise HTTPException(status_code=401, detail="Invalid signature")
    
    response = await call_next(request)
    
    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    
    return response

# API Endpoints
'''

        # เพิ่ม API endpoints สำหรับแต่ละ config
        for config in api_configs:
            api_name = config.get('name', 'api')
            api_url = config.get('url', '')
            api_key_env = config.get('api_key_env', 'API_KEY')
            
            proxy_code += f'''
@app.get("/{api_name}")
async def {api_name}_proxy(request: Request):
    """Proxy สำหรับ {api_name}"""
    api_key = os.getenv("{api_key_env}")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {{
                "Authorization": f"Bearer {{api_key}}",
                "User-Agent": "Secure-Proxy/1.0"
            }}
            
            response = await client.get("{api_url}", headers=headers)
            response.raise_for_status()
            
            return response.json()
            
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"API request failed: {{str(e)}}")
'''

        proxy_code += '''
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": time.time()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
'''
        
        # บันทึกไฟล์ proxy
        proxy_file = self.project_path / "secure_proxy.py"
        
        try:
            with open(proxy_file, 'w', encoding='utf-8') as f:
                f.write(proxy_code)
            
            self.logger.info("✅ สร้าง secure proxy เสร็จสิ้น")
            return str(proxy_file)
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้าง proxy: {e}")
            return ""
    
    def install_security_tools(self):
        """ติดตั้งเครื่องมือความปลอดภัย"""
        self.logger.info("🔧 ติดตั้งเครื่องมือความปลอดภัย...")
        
        tools = [
            "pip install pre-commit",
            "pip install gitleaks",
            "pip install bandit",
            "pip install safety",
            "npm install -g @gitguardian/ggshield"
        ]
        
        for tool in tools:
            try:
                subprocess.run(tool.split(), check=True, capture_output=True)
                self.logger.info(f"✅ ติดตั้ง {tool} เสร็จสิ้น")
            except subprocess.CalledProcessError as e:
                self.logger.warning(f"⚠️ ไม่สามารถติดตั้ง {tool}: {e}")
    
    def generate_security_report(self) -> str:
        """สร้างรายงานความปลอดภัย"""
        scan_results = self.scan_project_for_secrets()
        
        report = f"""# 🔒 รายงานความปลอดภัย

## 📊 สรุปผลการสแกน
- **วันที่สแกน:** {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(scan_results['timestamp']))}
- **ไฟล์ที่สแกน:** {scan_results['total_files_scanned']} ไฟล์
- **ปัญหาที่พบ:** {len(scan_results['issues_found'])} ปัญหา
- **ระดับความเสี่ยง:** {scan_results['risk_level'].upper()}

## 🚨 ปัญหาที่พบ
"""
        
        if scan_results['issues_found']:
            for issue in scan_results['issues_found']:
                report += f"""
### {issue['file']} (บรรทัด {issue['line']})
- **ความรุนแรง:** {issue['severity'].upper()}
- **รูปแบบ:** {issue['pattern'][:50]}...
- **ข้อมูลที่พบ:** `{issue['match']}`
"""
        else:
            report += "\n✅ ไม่พบปัญหาด้านความปลอดภัย\n"
        
        report += f"""
## 📋 คำแนะนำ

### ถ้าพบ API Keys หรือ Secrets:
1. **เปลี่ยน/Rotate keys ทันที**
2. **ลบออกจาก git history**
3. **ใช้ environment variables แทน**
4. **ตั้งค่า .gitignore ให้ถูกต้อง**

### Best Practices:
- ใช้ .env files (ไม่ commit)
- สร้าง backend proxy สำหรับ API calls
- ใช้ pre-commit hooks
- ตรวจสอบ dependencies เป็นประจำ

### เครื่องมือที่แนะนำ:
- **gitleaks:** ตรวจสอบ secrets
- **bandit:** ตรวจสอบ Python security
- **npm audit:** ตรวจสอบ Node.js dependencies
- **Snyk:** ตรวจสอบ vulnerabilities

---
🛡️ รายงานนี้สร้างโดย GitHub Security System
"""
        
        # บันทึกรายงาน
        report_file = self.project_path / "security_report.md"
        
        try:
            with open(report_file, 'w', encoding='utf-8') as f:
                f.write(report)
            
            self.logger.info(f"✅ สร้างรายงานความปลอดภัย: {report_file}")
            return str(report_file)
            
        except Exception as e:
            self.logger.error(f"❌ ไม่สามารถสร้างรายงาน: {e}")
            return ""

# CLI Interface
def main():
    print("🔒 GitHub Security System - ฟรี 100%")
    print("=" * 60)
    
    # รับ path ของโปรเจค
    project_path = input("📁 ใส่ path ของโปรเจค (หรือ Enter สำหรับ current directory): ").strip()
    if not project_path:
        project_path = os.getcwd()
    
    # สร้างระบบความปลอดภัย
    security_system = GitHubSecuritySystem(project_path)
    
    while True:
        print("\n🛡️ เลือกการทำงาน:")
        print("1. สแกนหา secrets")
        print("2. สร้างรายงานความปลอดภัย")
        print("3. เข้ารหัส secrets")
        print("4. ถอดรหัส secrets")
        print("5. สร้าง secure proxy")
        print("6. ติดตั้งเครื่องมือความปลอดภัย")
        print("7. ออกจากโปรแกรม")
        
        choice = input("\nเลือก (1-7): ").strip()
        
        try:
            if choice == "1":
                results = security_system.scan_project_for_secrets()
                print(f"\n✅ สแกนเสร็จสิ้น: พบ {len(results['issues_found'])} ปัญหา")
                
            elif choice == "2":
                report_file = security_system.generate_security_report()
                print(f"\n✅ สร้างรายงาน: {report_file}")
                
            elif choice == "3":
                secrets = {}
                print("\n🔐 ใส่ secrets ที่ต้องการเข้ารหัส (พิมพ์ 'done' เมื่อเสร็จ):")
                
                while True:
                    key = input("Key: ").strip()
                    if key.lower() == 'done':
                        break
                    value = input("Value: ").strip()
                    secrets[key] = value
                
                password = input("ใส่ password สำหรับเข้ารหัส: ").strip()
                
                if security_system.encrypt_secrets(secrets, password):
                    print("✅ เข้ารหัสเสร็จสิ้น")
                else:
                    print("❌ เข้ารหัสล้มเหลว")
                    
            elif choice == "4":
                password = input("ใส่ password สำหรับถอดรหัส: ").strip()
                secrets = security_system.decrypt_secrets(password)
                
                if secrets:
                    print("✅ ถอดรหัสเสร็จสิ้น:")
                    for key, value in secrets.items():
                        print(f"  {key}: {value}")
                else:
                    print("❌ ถอดรหัสล้มเหลว")
                    
            elif choice == "5":
                api_configs = []
                print("\n🌐 ตั้งค่า APIs สำหรับ proxy (พิมพ์ 'done' เมื่อเสร็จ):")
                
                while True:
                    name = input("API Name: ").strip()
                    if name.lower() == 'done':
                        break
                    url = input("API URL: ").strip()
                    api_key_env = input("Environment Variable สำหรับ API Key: ").strip()
                    
                    api_configs.append({
                        'name': name,
                        'url': url,
                        'api_key_env': api_key_env
                    })
                
                proxy_file = security_system.create_secure_proxy(api_configs)
                print(f"✅ สร้าง proxy: {proxy_file}")
                
            elif choice == "6":
                security_system.install_security_tools()
                print("✅ ติดตั้งเครื่องมือเสร็จสิ้น")
                
            elif choice == "7":
                print("👋 ขอบคุณที่ใช้งาน!")
                break
                
            else:
                print("❌ กรุณาเลือก 1-7")
                
        except KeyboardInterrupt:
            print("\n\n👋 ขอบคุณที่ใช้งาน!")
            break
        except Exception as e:
            print(f"\n💥 เกิดข้อผิดพลาด: {str(e)}")

if __name__ == "__main__":
    main()

