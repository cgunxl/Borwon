#!/bin/bash

# 🚀 BORWON Futuristic Theme Development Script
# This script helps with development tasks for the futuristic theme

set -e  # Exit on any error

echo "🌟 BORWON Futuristic Theme Development"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_highlight() {
    echo -e "${PURPLE}[HIGHLIGHT]${NC} $1"
}

print_code() {
    echo -e "${CYAN}[CODE]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Function to show menu
show_menu() {
    echo ""
    echo "🔧 Development Options:"
    echo "======================"
    echo "1. 🚀 Start Development Server"
    echo "2. 🏗️  Build Project"
    echo "3. 👀 Preview Build"
    echo "4. 🧪 Test Components"
    echo "5. 🧹 Clean Project"
    echo "6. 🔄 Reset Project"
    echo "7. 📊 Analyze Bundle"
    echo "8. 🔍 Check Dependencies"
    echo "9. 📝 Format Code"
    echo "10. ✅ Lint Code"
    echo "11. 🎨 Theme Customization"
    echo "12. 📱 Mobile Testing"
    echo "13. 🚀 Quick Deploy"
    echo "0. ❌ Exit"
    echo ""
    read -p "Choose an option (0-13): " choice
}

# Function to start development server
start_dev() {
    print_status "Starting development server..."
    print_highlight "Your site will be available at: http://localhost:5173"
    print_highlight "Press Ctrl+C to stop the server"
    echo ""
    npm run dev
}

# Function to build project
build_project() {
    print_status "Building Futuristic Theme..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Build completed successfully!"
        
        # Show build output
        print_status "Build output:"
        ls -la dist/
        
        # Show bundle sizes
        if command -v du &> /dev/null; then
            print_status "Bundle sizes:"
            du -h dist/assets/* 2>/dev/null || echo "Could not display bundle sizes"
        fi
    else
        print_error "Build failed!"
        exit 1
    fi
}

# Function to preview build
preview_build() {
    print_status "Building project for preview..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Build completed! Starting preview server..."
        print_highlight "Preview will be available at: http://localhost:4173"
        print_highlight "Press Ctrl+C to stop the preview"
        echo ""
        npm run preview
    else
        print_error "Build failed! Cannot start preview."
        exit 1
    fi
}

# Function to test components
test_components() {
    print_status "Testing Futuristic Theme components..."
    echo ""
    
    # Check if components exist
    components=(
        "src/components/ui/AnimatedBackground.jsx"
        "src/components/ui/FuturisticButton.jsx"
        "src/components/ui/FuturisticCard.jsx"
        "src/components/ui/FuturisticInput.jsx"
        "src/components/ui/FuturisticHero.jsx"
    )
    
    for component in "${components[@]}"; do
        if [ -f "$component" ]; then
            print_success "✅ $component"
        else
            print_error "❌ $component (missing)"
        fi
    done
    
    echo ""
    print_status "Testing build process..."
    npm run build > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        print_success "✅ Build test passed!"
    else
        print_error "❌ Build test failed!"
    fi
    
    echo ""
    print_success "Component testing completed!"
}

# Function to clean project
clean_project() {
    print_status "Cleaning project..."
    
    if [ -d "dist" ]; then
        rm -rf dist
        print_success "✅ Build directory cleaned"
    fi
    
    if [ -d "node_modules/.vite" ]; then
        rm -rf node_modules/.vite
        print_success "✅ Vite cache cleaned"
    fi
    
    print_success "Project cleaned successfully!"
}

# Function to reset project
reset_project() {
    print_warning "This will completely reset the project. Are you sure? (y/N)"
    read -p "Continue? " confirm
    
    if [[ $confirm =~ ^[Yy]$ ]]; then
        print_status "Resetting project..."
        
        clean_project
        
        if [ -d "node_modules" ]; then
            print_status "Removing node_modules..."
            rm -rf node_modules
            print_success "✅ node_modules removed"
        fi
        
        print_status "Installing dependencies..."
        npm install
        
        if [ $? -eq 0 ]; then
            print_success "✅ Dependencies installed"
            print_success "Project reset successfully!"
        else
            print_error "❌ Failed to install dependencies"
            exit 1
        fi
    else
        print_status "Reset cancelled."
    fi
}

# Function to analyze bundle
analyze_bundle() {
    print_status "Analyzing bundle..."
    npm run analyze
}

# Function to check dependencies
check_dependencies() {
    print_status "Checking dependencies..."
    echo ""
    
    print_highlight "Current dependencies:"
    npm list --depth=0
    
    echo ""
    print_highlight "Outdated packages:"
    npm outdated || echo "All packages are up to date!"
    
    echo ""
    print_highlight "Security audit:"
    npm audit || echo "No security vulnerabilities found!"
}

# Function to format code
format_code() {
    print_status "Formatting code..."
    
    if command -v prettier &> /dev/null; then
        npm run format
        print_success "Code formatted successfully!"
    else
        print_warning "Prettier not installed. Installing..."
        npm install --save-dev prettier
        npm run format
        print_success "Code formatted successfully!"
    fi
}

# Function to lint code
lint_code() {
    print_status "Linting code..."
    npm run lint
}

# Function to show theme customization
theme_customization() {
    echo ""
    echo "🎨 Theme Customization Guide"
    echo "============================"
    echo ""
    print_highlight "Colors:"
    print_code "src/index.css - CSS variables"
    print_code "tailwind.config.js - Tailwind colors"
    echo ""
    print_highlight "Components:"
    print_code "src/components/ui/ - All UI components"
    print_code "src/components/layout/ - Layout components"
    echo ""
    print_highlight "Pages:"
    print_code "src/pages/ - All page components"
    echo ""
    print_highlight "Quick color changes:"
    print_code "Change --accent-primary in src/index.css"
    print_code "Update tailwind.config.js colors"
    echo ""
    print_highlight "Animation speed:"
    print_code "Modify animation-duration in CSS keyframes"
    echo ""
}

# Function to mobile testing
mobile_testing() {
    echo ""
    echo "📱 Mobile Testing Guide"
    echo "======================="
    echo ""
    print_highlight "1. Start development server:"
    print_code "npm run dev"
    echo ""
    print_highlight "2. Get your local IP address:"
    print_code "ip addr show | grep inet"
    echo ""
    print_highlight "3. Access from mobile:"
    print_code "http://YOUR_IP:5173"
    echo ""
    print_highlight "4. Test responsive design:"
    print_code "Chrome DevTools → Toggle device toolbar"
    echo ""
    print_highlight "5. Test touch interactions:"
    print_code "Use mobile device or touch simulator"
    echo ""
}

# Function to quick deploy
quick_deploy() {
    print_status "Quick deploy to GitHub..."
    
    if [ -d ".git" ]; then
        build_project
        
        print_status "Committing and pushing changes..."
        git add .
        git commit -m "🚀 Quick deploy - $(date '+%Y-%m-%d %H:%M:%S')"
        git push origin main
        
        print_success "✅ Deployed successfully!"
        print_highlight "GitHub Actions will deploy to Pages automatically"
        print_highlight "Check: https://github.com/cgunxl/Borwon/actions"
    else
        print_error "Not a git repository!"
    fi
}

# Main loop
while true; do
    show_menu
    
    case $choice in
        1)
            start_dev
            ;;
        2)
            build_project
            ;;
        3)
            preview_build
            ;;
        4)
            test_components
            ;;
        5)
            clean_project
            ;;
        6)
            reset_project
            ;;
        7)
            analyze_bundle
            ;;
        8)
            check_dependencies
            ;;
        9)
            format_code
            ;;
        10)
            lint_code
            ;;
        11)
            theme_customization
            ;;
        12)
            mobile_testing
            ;;
        13)
            quick_deploy
            ;;
        0)
            print_success "Goodbye! 👋"
            exit 0
            ;;
        *)
            print_error "Invalid option. Please choose 0-13."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done