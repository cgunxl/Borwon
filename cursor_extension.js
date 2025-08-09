// Cursor Extension สำหรับ Advanced Cursor AI System
// ไฟล์นี้ใช้สำหรับเชื่อมต่อ Cursor กับระบบ AI

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * เปิดใช้งาน Extension
 */
function activate(context) {
    console.log('🚀 Advanced Cursor AI Extension is now active!');
    
    // คำสั่งหลักสำหรับสร้างโปรเจค
    let createCommand = vscode.commands.registerCommand('advanced-cursor-ai.create', async function () {
        const prompt = await vscode.window.showInputBox({
            prompt: 'พิมพ์สิ่งที่ต้องการสร้าง',
            placeHolder: 'เช่น: สร้างเว็บไซต์แนะนำตัว, สร้าง API สำหรับจัดการข้อมูล'
        });
        
        if (prompt) {
            await sendCommandToAI(prompt, 'create');
            vscode.window.showInformationMessage(`🔍 กำลังค้นหาความรู้และสร้างโค้ดสำหรับ: ${prompt}`);
        }
    });
    
    // คำสั่งยืนยัน
    let confirmCommand = vscode.commands.registerCommand('advanced-cursor-ai.confirm', async function () {
        await sendCommandToAI('', 'confirm');
        vscode.window.showInformationMessage('✅ ยืนยันการ Deploy โปรเจค');
    });
    
    // คำสั่งแก้ไข
    let editCommand = vscode.commands.registerCommand('advanced-cursor-ai.edit', async function () {
        const editDetails = await vscode.window.showInputBox({
            prompt: 'พิมพ์รายละเอียดการแก้ไข',
            placeHolder: 'เช่น: เปลี่ยนสีพื้นหลังเป็นสีน้ำเงิน, เพิ่มปุ่มติดต่อเรา'
        });
        
        if (editDetails) {
            await sendCommandToAI('', 'edit', editDetails);
            vscode.window.showInformationMessage(`✏️ กำลังแก้ไข: ${editDetails}`);
        }
    });
    
    // คำสั่งยกเลิก
    let cancelCommand = vscode.commands.registerCommand('advanced-cursor-ai.cancel', async function () {
        await sendCommandToAI('', 'cancel');
        vscode.window.showInformationMessage('🚫 ยกเลิกการทำงาน');
    });
    
    // คำสั่งดูสถิติ
    let statsCommand = vscode.commands.registerCommand('advanced-cursor-ai.stats', async function () {
        const statsPanel = vscode.window.createWebviewPanel(
            'advancedCursorAIStats',
            'Advanced Cursor AI - สถิติ',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );
        
        statsPanel.webview.html = getStatsWebviewContent();
    });
    
    // เพิ่มคำสั่งทั้งหมดใน context
    context.subscriptions.push(createCommand);
    context.subscriptions.push(confirmCommand);
    context.subscriptions.push(editCommand);
    context.subscriptions.push(cancelCommand);
    context.subscriptions.push(statsCommand);
    
    // ติดตามการเปลี่ยนแปลงไฟล์ response
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (workspaceFolder) {
        const responseFile = path.join(workspaceFolder.uri.fsPath, '.cursor_responses.json');
        
        // ตรวจสอบไฟล์ response ทุก 2 วินาที
        setInterval(() => {
            checkResponseFile(responseFile);
        }, 2000);
    }
}

/**
 * ส่งคำสั่งไปยังระบบ AI
 */
async function sendCommandToAI(prompt, action, editDetails = '') {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('❌ ไม่พบ workspace folder');
        return;
    }
    
    const commandFile = path.join(workspaceFolder.uri.fsPath, '.cursor_commands.json');
    
    const commandData = {
        prompt: prompt,
        action: action,
        edit_details: editDetails,
        timestamp: new Date().toISOString()
    };
    
    try {
        fs.writeFileSync(commandFile, JSON.stringify(commandData, null, 2), 'utf8');
        console.log(`📤 ส่งคำสั่ง: ${action} - ${prompt}`);
    } catch (error) {
        vscode.window.showErrorMessage(`❌ ไม่สามารถส่งคำสั่งได้: ${error.message}`);
    }
}

/**
 * ตรวจสอบไฟล์ response จากระบบ AI
 */
function checkResponseFile(responseFile) {
    try {
        if (fs.existsSync(responseFile)) {
            const content = fs.readFileSync(responseFile, 'utf8');
            if (content.trim()) {
                const responseData = JSON.parse(content);
                handleAIResponse(responseData);
            }
        }
    } catch (error) {
        console.error('ข้อผิดพลาดในการอ่านไฟล์ response:', error);
    }
}

/**
 * จัดการ response จากระบบ AI
 */
function handleAIResponse(responseData) {
    const status = responseData.status;
    const message = responseData.message;
    
    switch (status) {
        case 'searching':
            vscode.window.showInformationMessage(`🔍 ${message}`);
            break;
        case 'generating':
            vscode.window.showInformationMessage(`🛠️ ${message}`);
            break;
        case 'deploying':
            vscode.window.showInformationMessage(`🚀 ${message}`);
            break;
        case 'completed':
            vscode.window.showInformationMessage(`✅ ${message}`);
            showCompletionNotification(responseData);
            break;
        case 'error':
            vscode.window.showErrorMessage(`❌ ${message}`);
            break;
        default:
            if (responseData.actions) {
                showConfirmationDialog(responseData);
            }
    }
}

/**
 * แสดงหน้าต่างยืนยัน
 */
function showConfirmationDialog(responseData) {
    const panel = vscode.window.createWebviewPanel(
        'advancedCursorAIConfirmation',
        'Advanced Cursor AI - ยืนยันการทำงาน',
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );
    
    panel.webview.html = getConfirmationWebviewContent(responseData);
    
    // จัดการข้อความจาก webview
    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'confirm':
                    vscode.commands.executeCommand('advanced-cursor-ai.confirm');
                    panel.dispose();
                    break;
                case 'edit':
                    vscode.commands.executeCommand('advanced-cursor-ai.edit');
                    panel.dispose();
                    break;
                case 'cancel':
                    vscode.commands.executeCommand('advanced-cursor-ai.cancel');
                    panel.dispose();
                    break;
            }
        }
    );
}

/**
 * แสดงการแจ้งเตือนเมื่อเสร็จสิ้น
 */
function showCompletionNotification(responseData) {
    const action = vscode.window.showInformationMessage(
        '🎉 โปรเจคสร้างเสร็จแล้ว!',
        'ดูโปรเจค',
        'สร้างใหม่'
    );
    
    action.then(selection => {
        if (selection === 'ดูโปรเจค') {
            // เปิดโฟลเดอร์โปรเจค
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (workspaceFolder) {
                const projectsFolder = path.join(workspaceFolder.uri.fsPath, 'projects');
                vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(projectsFolder));
            }
        } else if (selection === 'สร้างใหม่') {
            vscode.commands.executeCommand('advanced-cursor-ai.create');
        }
    });
}

/**
 * สร้าง HTML สำหรับหน้าต่างยืนยัน
 */
function getConfirmationWebviewContent(responseData) {
    return `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Cursor AI - ยืนยันการทำงาน</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            background-color: #1e1e1e;
            color: #ffffff;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .prompt {
            background-color: #2d2d30;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .code-preview {
            background-color: #1e1e1e;
            border: 1px solid #3e3e42;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-height: 300px;
            overflow-y: auto;
        }
        .actions {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        button {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        }
        .btn-confirm {
            background-color: #007acc;
            color: white;
        }
        .btn-edit {
            background-color: #f39c12;
            color: white;
        }
        .btn-cancel {
            background-color: #e74c3c;
            color: white;
        }
        button:hover {
            opacity: 0.8;
        }
        .stats {
            text-align: center;
            margin-bottom: 20px;
            color: #cccccc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 Advanced Cursor AI</h1>
            <h2>ยืนยันการทำงาน</h2>
        </div>
        
        <div class="prompt">
            <h3>📝 คำสั่ง:</h3>
            <p>${responseData.prompt}</p>
        </div>
        
        <div class="stats">
            <p>🌍 ค้นหาความรู้จาก ${responseData.knowledge_sources} แหล่ง</p>
            <p>⏰ สร้างเมื่อ: ${new Date(responseData.timestamp).toLocaleString('th-TH')}</p>
        </div>
        
        <div class="code-preview">
            <h3>👀 ตัวอย่างโค้ดที่สร้าง:</h3>
            <pre>${JSON.stringify(responseData.script_code, null, 2)}</pre>
        </div>
        
        <div class="actions">
            <button class="btn-confirm" onclick="sendMessage('confirm')">
                ✅ ยืนยัน & Deploy
            </button>
            <button class="btn-edit" onclick="sendMessage('edit')">
                ✏️ แก้ไข
            </button>
            <button class="btn-cancel" onclick="sendMessage('cancel')">
                🚫 ยกเลิก
            </button>
        </div>
    </div>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        function sendMessage(command) {
            vscode.postMessage({
                command: command
            });
        }
    </script>
</body>
</html>`;
}

/**
 * สร้าง HTML สำหรับหน้าสถิติ
 */
function getStatsWebviewContent() {
    return `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Cursor AI - สถิติ</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            background-color: #1e1e1e;
            color: #ffffff;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background-color: #2d2d30;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #007acc;
        }
        .stat-label {
            margin-top: 10px;
            color: #cccccc;
        }
        .features {
            background-color: #2d2d30;
            padding: 20px;
            border-radius: 8px;
        }
        .feature-list {
            list-style: none;
            padding: 0;
        }
        .feature-list li {
            padding: 8px 0;
            border-bottom: 1px solid #3e3e42;
        }
        .feature-list li:last-child {
            border-bottom: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Advanced Cursor AI - สถิติ</h1>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalSearches">-</div>
                <div class="stat-label">การค้นหาทั้งหมด</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalProjects">-</div>
                <div class="stat-label">โปรเจคที่สร้าง</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="deployedProjects">-</div>
                <div class="stat-label">โปรเจคที่ Deploy</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="successRate">-%</div>
                <div class="stat-label">อัตราความสำเร็จ</div>
            </div>
        </div>
        
        <div class="features">
            <h3>🚀 ฟีเจอร์ของระบบ</h3>
            <ul class="feature-list">
                <li>🌍 ค้นหาความรู้จาก 6 แหล่งทั่วโลก (Wikipedia, Stack Overflow, GitHub, MDN, W3Schools, Tutorials Point)</li>
                <li>🧠 ระบบ Cache ความรู้เพื่อความเร็ว</li>
                <li>🛠️ สร้างโค้ดอัตโนมัติ (Website, API, Automation Script)</li>
                <li>💾 ฐานข้อมูล SQLite สำหรับเก็บประวัติ</li>
                <li>🔄 ระบบยืนยัน/แก้ไข/ยกเลิก</li>
                <li>🚀 Auto Deploy ไป GitHub</li>
                <li>📊 ระบบสถิติและรายงาน</li>
                <li>🎨 Responsive Design</li>
            </ul>
        </div>
    </div>
    
    <script>
        // โหลดสถิติจริงจากระบบ (ในอนาคต)
        document.getElementById('totalSearches').textContent = '0';
        document.getElementById('totalProjects').textContent = '0';
        document.getElementById('deployedProjects').textContent = '0';
        document.getElementById('successRate').textContent = '0';
    </script>
</body>
</html>`;
}

/**
 * ปิดการใช้งาน Extension
 */
function deactivate() {
    console.log('👋 Advanced Cursor AI Extension deactivated');
}

module.exports = {
    activate,
    deactivate
};

