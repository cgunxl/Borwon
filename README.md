# 🌊 BwnX Platform

**Deep Ocean Recommendations for Life, Money & Lifestyle**

A modern, AI-powered recommendation platform built with React, featuring a stunning Deep Ocean theme and seamless Cursor AI integration.

![BwnX Platform](https://img.shields.io/badge/BwnX-Platform-06b6d4?style=for-the-badge&logo=react)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=for-the-badge&logo=github)
![Cursor AI](https://img.shields.io/badge/Cursor-AI-00D4FF?style=for-the-badge&logo=cursor)

## ✨ Features

- 🎨 **Deep Ocean Theme** - Beautiful dark theme with cyan/blue accents
- 🤖 **AI-Powered Recommendations** - OpenAI integration for personalized suggestions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **Auto Deploy** - GitHub Actions for seamless deployment
- 🔍 **Smart Search** - AI-enhanced search capabilities
- 🌐 **Multi-language Support** - 10 languages supported
- 📊 **Real-time Analytics** - Supabase integration for live data
- 🎯 **Cursor AI Integration** - Full development workflow automation

## 🚀 Live Demo

Visit the live platform: [https://cgunxlcb.github.io/BwnX-Platform/](https://cgunxlcb.github.io/BwnX-Platform/)

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React
- **Backend**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-3.5/4
- **Deployment**: GitHub Pages
- **Development**: Cursor AI Plus

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/cgunxlcb/BwnX-Platform.git
cd BwnX-Platform

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
REACT_APP_SUPABASE_URL=https://fztszhpbkztfzzzhktxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_OPENAI_API_KEY=your_openai_api_key
REACT_APP_CURSOR_API_KEY=your_cursor_api_key
```

## 🤖 Cursor AI Integration

This project is fully integrated with Cursor AI Plus for seamless development:

### Quick Commands

```javascript
// Deploy to GitHub Pages
await cursorCommands.deploy()

// Create new component
await cursorCommands.createComponent('MyComponent', 'A beautiful component')

// Fix responsive issues
await cursorCommands.fixResponsive(componentCode)

// Optimize performance
await cursorCommands.optimize(code)

// Add AI feature
await cursorCommands.addAIFeature('Smart recommendation engine')
```

### Cursor AI Features

- ✅ **Auto Code Generation** - Generate React components with AI
- ✅ **Bug Fixing** - AI-powered debugging and error resolution
- ✅ **Performance Optimization** - Automatic code optimization
- ✅ **Responsive Design** - AI-assisted responsive layout fixes
- ✅ **Feature Development** - Complete feature implementation with AI
- ✅ **Auto Deployment** - One-click deployment to GitHub Pages

## 📊 Database Schema

### Recommendations Table
```sql
CREATE TABLE recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  url TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  count INTEGER DEFAULT 0
);
```

## 🚀 Deployment

### Automatic Deployment
Every push to the `main` branch automatically deploys to GitHub Pages via GitHub Actions.

### Manual Deployment
```bash
# Build for production
pnpm run build

# Deploy with Cursor AI
await cursorCommands.deploy()
```

## 🎨 Theme Customization

The Deep Ocean theme uses these primary colors:

```css
:root {
  --background: #0a0f1c;
  --foreground: #e2e8f0;
  --primary: #06b6d4;
  --accent: #0ea5e9;
}
```

## 📱 Categories

- 🧳 **แอปท่องเที่ยว** - Travel Apps (500+ recommendations)
- 💰 **การลงทุน** - Investment (300+ recommendations)
- 🎮 **เกมเติมเงิน** - Gaming (200+ recommendations)
- 💄 **ความงาม** - Beauty (400+ recommendations)
- 💻 **เทคโนโลยี** - Technology (600+ recommendations)
- 📚 **การศึกษา** - Education (250+ recommendations)
- 🌟 **ไลฟ์สไตล์** - Lifestyle (350+ recommendations)
- 🏢 **ธุรกิจ** - Business (180+ recommendations)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Email**: cgunxlcb@gmail.com  
**Platform**: BwnX Platform  
**AI**: Cursor AI Plus Integration  

## 🙏 Acknowledgments

- Built with ❤️ using Cursor AI Plus
- Powered by OpenAI GPT-4
- Database by Supabase
- Deployed on GitHub Pages
- UI Components by shadcn/ui

---

**🌊 Dive into the Deep Ocean of Recommendations with BwnX Platform!**

