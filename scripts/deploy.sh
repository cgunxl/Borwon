#!/bin/bash

# 🚀 BORWON Futuristic Theme Deployment Script
# This script automatically builds and deploys the futuristic theme to GitHub Pages

set -e  # Exit on any error

echo "🌟 BORWON Futuristic Theme Deployment"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully!"
else
    print_status "Dependencies already installed."
fi

# Clean previous build
if [ -d "dist" ]; then
    print_status "Cleaning previous build..."
    rm -rf dist
    print_success "Previous build cleaned!"
fi

# Build the project
print_status "Building Futuristic Theme..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
else
    print_error "Build failed! Please check for errors."
    exit 1
fi

# Check if build output exists
if [ ! -d "dist" ]; then
    print_error "Build output directory 'dist' not found!"
    exit 1
fi

# Display build information
print_status "Build output:"
ls -la dist/
echo ""

# Check bundle sizes
if command -v du &> /dev/null; then
    print_status "Bundle sizes:"
    du -h dist/assets/* 2>/dev/null || echo "Could not display bundle sizes"
    echo ""
fi

# Git operations
if [ -d ".git" ]; then
    print_status "Checking git status..."
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "There are uncommitted changes. Committing them..."
        git add .
        git commit -m "🚀 Auto-deploy Futuristic Theme - $(date '+%Y-%m-%d %H:%M:%S')"
        print_success "Changes committed!"
    else
        print_status "No uncommitted changes found."
    fi
    
    # Push to GitHub
    print_status "Pushing to GitHub..."
    if git push origin main; then
        print_success "Successfully pushed to GitHub!"
        print_status "GitHub Actions will automatically deploy to GitHub Pages."
    else
        print_error "Failed to push to GitHub!"
        exit 1
    fi
else
    print_warning "Not a git repository. Skipping git operations."
fi

# Display deployment information
echo ""
echo "🎉 Deployment Summary"
echo "===================="
print_success "Build completed successfully!"
print_success "Files generated in 'dist/' directory"
print_success "Ready for deployment to any web server"

if [ -d ".git" ]; then
    print_success "Code pushed to GitHub"
    print_status "GitHub Pages will be updated automatically via GitHub Actions"
fi

echo ""
echo "🌐 Next Steps:"
echo "1. Wait for GitHub Actions to complete (check Actions tab)"
echo "2. Your site will be available at: https://cgunxl.github.io/Borwon/"
echo "3. Demo page: https://cgunxl.github.io/Borwon/demo"
echo ""

print_success "🎊 Futuristic Theme deployment completed successfully!"
print_status "Your website will be live shortly on GitHub Pages!"