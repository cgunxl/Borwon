#!/bin/bash

echo "🚀 Deploying Futuristic Theme to BORWON Website..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Copy built files to deployment directory
    echo "📁 Copying built files..."
    cp -r dist/* /var/www/borwon/ 2>/dev/null || echo "⚠️  Could not copy to /var/www/borwon/"
    
    # Set proper permissions
    echo "🔐 Setting permissions..."
    chmod -R 755 /var/www/borwon/ 2>/dev/null || echo "⚠️  Could not set permissions"
    
    echo "🎉 Deployment completed!"
    echo "🌐 Website should be available with new Futuristic Theme"
    echo "📱 Visit /demo to see all new components"
    
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi