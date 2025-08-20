# 🚀 BORWON Futuristic Theme Makefile
# Easy commands for development and deployment

.PHONY: help dev build preview test clean reset deploy install format lint analyze

# Default target
help:
	@echo "🌟 BORWON Futuristic Theme - Available Commands"
	@echo "=============================================="
	@echo ""
	@echo "🚀 Development:"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make preview      - Preview production build"
	@echo "  make test         - Test components and build"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  make clean        - Clean build files"
	@echo "  make reset        - Reset entire project"
	@echo "  make install      - Install dependencies"
	@echo ""
	@echo "🔧 Code Quality:"
	@echo "  make format       - Format code with Prettier"
	@echo "  make lint         - Lint code with ESLint"
	@echo "  make analyze      - Analyze bundle size"
	@echo ""
	@echo "🚀 Deployment:"
	@echo "  make deploy       - Deploy to GitHub Pages"
	@echo "  make deploy:quick - Quick deploy to GitHub"
	@echo ""
	@echo "📱 Utilities:"
	@echo "  make mobile       - Mobile testing guide"
	@echo "  make theme        - Theme customization guide"
	@echo "  make status       - Check project status"
	@echo ""

# Development commands
dev:
	@echo "🚀 Starting development server..."
	@echo "📍 Available at: http://localhost:5173"
	@echo "⏹️  Press Ctrl+C to stop"
	@npm run dev

build:
	@echo "🏗️  Building Futuristic Theme..."
	@npm run build
	@echo "✅ Build completed! Check 'dist/' directory"

preview:
	@echo "👀 Building and previewing..."
	@npm run build
	@echo "📍 Preview available at: http://localhost:4173"
	@echo "⏹️  Press Ctrl+C to stop"
	@npm run preview

test:
	@echo "🧪 Testing Futuristic Theme..."
	@echo "✅ Testing components..."
	@test -f "src/components/ui/AnimatedBackground.jsx" && echo "  ✓ AnimatedBackground" || echo "  ✗ AnimatedBackground"
	@test -f "src/components/ui/FuturisticButton.jsx" && echo "  ✓ FuturisticButton" || echo "  ✗ FuturisticButton"
	@test -f "src/components/ui/FuturisticCard.jsx" && echo "  ✓ FuturisticCard" || echo "  ✗ FuturisticCard"
	@test -f "src/components/ui/FuturisticInput.jsx" && echo "  ✓ FuturisticInput" || echo "  ✗ FuturisticInput"
	@test -f "src/components/ui/FuturisticHero.jsx" && echo "  ✓ FuturisticHero" || echo "  ✗ FuturisticHero"
	@echo ""
	@echo "🏗️  Testing build process..."
	@npm run build > /dev/null 2>&1 && echo "✅ Build test passed!" || echo "❌ Build test failed!"
	@echo ""
	@echo "🎉 Testing completed!"

# Maintenance commands
clean:
	@echo "🧹 Cleaning project..."
	@rm -rf dist
	@rm -rf node_modules/.vite
	@echo "✅ Project cleaned!"

reset:
	@echo "🔄 Resetting project..."
	@echo "⚠️  This will remove node_modules and reinstall everything"
	@read -p "Continue? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		make clean; \
		rm -rf node_modules; \
		echo "📦 Installing dependencies..."; \
		npm install; \
		echo "✅ Project reset successfully!"; \
	else \
		echo "❌ Reset cancelled."; \
	fi

install:
	@echo "📦 Installing dependencies..."
	@npm install
	@echo "✅ Dependencies installed!"

# Code quality commands
format:
	@echo "📝 Formatting code..."
	@if command -v prettier > /dev/null; then \
		npm run format; \
		echo "✅ Code formatted!"; \
	else \
		echo "📦 Installing Prettier..."; \
		npm install --save-dev prettier; \
		npm run format; \
		echo "✅ Code formatted!"; \
	fi

lint:
	@echo "✅ Linting code..."
	@npm run lint

analyze:
	@echo "📊 Analyzing bundle..."
	@npm run analyze

# Deployment commands
deploy:
	@echo "🚀 Deploying to GitHub Pages..."
	@if [ -d ".git" ]; then \
		make build; \
		echo "📝 Committing changes..."; \
		git add .; \
		git commit -m "🚀 Deploy Futuristic Theme - $$(date '+%Y-%m-%d %H:%M:%S')"; \
		echo "📤 Pushing to GitHub..."; \
		git push origin main; \
		echo "✅ Deployed successfully!"; \
		echo "🌐 GitHub Actions will deploy to Pages automatically"; \
		echo "📊 Check: https://github.com/cgunxl/Borwon/actions"; \
	else \
		echo "❌ Not a git repository!"; \
	fi

deploy:quick:
	@echo "⚡ Quick deploy to GitHub..."
	@if [ -d ".git" ]; then \
		make build; \
		git add .; \
		git commit -m "⚡ Quick deploy - $$(date '+%Y-%m-%d %H:%M:%S')"; \
		git push origin main; \
		echo "✅ Quick deploy completed!"; \
	else \
		echo "❌ Not a git repository!"; \
	fi

# Utility commands
mobile:
	@echo "📱 Mobile Testing Guide"
	@echo "======================="
	@echo ""
	@echo "1. 🚀 Start development server:"
	@echo "   make dev"
	@echo ""
	@echo "2. 🌐 Get your local IP address:"
	@echo "   ip addr show | grep inet"
	@echo ""
	@echo "3. 📱 Access from mobile:"
	@echo "   http://YOUR_IP:5173"
	@echo ""
	@echo "4. 🧪 Test responsive design:"
	@echo "   Chrome DevTools → Toggle device toolbar"
	@echo ""
	@echo "5. 👆 Test touch interactions:"
	@echo "   Use mobile device or touch simulator"

theme:
	@echo "🎨 Theme Customization Guide"
	@echo "============================"
	@echo ""
	@echo "🎨 Colors:"
	@echo "  src/index.css - CSS variables"
	@echo "  tailwind.config.js - Tailwind colors"
	@echo ""
	@echo "🧩 Components:"
	@echo "  src/components/ui/ - All UI components"
	@echo "  src/components/layout/ - Layout components"
	@echo ""
	@echo "📄 Pages:"
	@echo "  src/pages/ - All page components"
	@echo ""
	@echo "⚡ Quick color changes:"
	@echo "  Change --accent-primary in src/index.css"
	@echo "  Update tailwind.config.js colors"
	@echo ""
	@echo "⏱️  Animation speed:"
	@echo "  Modify animation-duration in CSS keyframes"

status:
	@echo "📊 Project Status"
	@echo "================="
	@echo ""
	@echo "📁 Project structure:"
	@test -f "package.json" && echo "  ✅ package.json" || echo "  ❌ package.json"
	@test -f "tailwind.config.js" && echo "  ✅ tailwind.config.js" || echo "  ❌ tailwind.config.js"
	@test -d "src" && echo "  ✅ src/ directory" || echo "  ❌ src/ directory"
	@test -d "src/components/ui" && echo "  ✅ UI components" || echo "  ❌ UI components"
	@echo ""
	@echo "🔧 Dependencies:"
	@test -d "node_modules" && echo "  ✅ node_modules" || echo "  ❌ node_modules"
	@echo ""
	@echo "🏗️  Build:"
	@test -d "dist" && echo "  ✅ dist/ (built)" || echo "  ❌ dist/ (not built)"
	@echo ""
	@echo "📱 Live website:"
	@echo "  🌐 https://cgunxl.github.io/Borwon/"
	@echo "  🎮 https://cgunxl.github.io/Borwon/demo"

# Scripts directory commands
scripts:
	@echo "📜 Available Scripts"
	@echo "===================="
	@echo ""
	@echo "🚀 Deployment:"
	@echo "  ./scripts/deploy.sh - Full deployment script"
	@echo ""
	@echo "🔧 Development:"
	@echo "  ./scripts/dev.sh - Development helper script"
	@echo ""
	@echo "📝 Make commands:"
	@echo "  make help - Show this help"
	@echo "  make dev - Start development server"
	@echo "  make build - Build project"
	@echo "  make deploy - Deploy to GitHub"

# Make scripts executable
setup:
	@echo "🔧 Setting up scripts..."
	@chmod +x scripts/*.sh
	@echo "✅ Scripts are now executable!"
	@echo ""
	@echo "🚀 You can now use:"
	@echo "  ./scripts/deploy.sh"
	@echo "  ./scripts/dev.sh"
	@echo "  make dev"
	@echo "  make deploy"