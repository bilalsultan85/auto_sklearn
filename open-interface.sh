#!/bin/bash

echo "================================================"
echo "🖥️  OPENING INTERFACE"
echo "================================================"
echo ""

# Check if file exists
if [ -f "demo/standalone.html" ]; then
    echo "✅ Interface file found!"
    echo "📁 Location: $(pwd)/demo/standalone.html"
    echo "📊 Size: $(du -h demo/standalone.html | cut -f1)"
    echo ""
    echo "🚀 Attempting to open interface..."
    echo ""
    
    # Try different methods to open the file
    if command -v xdg-open &> /dev/null; then
        echo "Using xdg-open..."
        xdg-open demo/standalone.html 2>/dev/null &
    elif command -v open &> /dev/null; then
        echo "Using open command..."
        open demo/standalone.html 2>/dev/null
    elif command -v firefox &> /dev/null; then
        echo "Using Firefox..."
        firefox demo/standalone.html 2>/dev/null &
    elif command -v google-chrome &> /dev/null; then
        echo "Using Chrome..."
        google-chrome demo/standalone.html 2>/dev/null &
    elif command -v chromium &> /dev/null; then
        echo "Using Chromium..."
        chromium demo/standalone.html 2>/dev/null &
    else
        echo "⚠️  No browser command found."
        echo ""
        echo "Manual options:"
        echo "1. Copy this path and paste in browser:"
        echo "   file://$(pwd)/demo/standalone.html"
        echo ""
        echo "2. Or open the file directly:"
        echo "   $(pwd)/demo/standalone.html"
    fi
    
    echo ""
    echo "================================================"
    echo "✅ Command executed!"
    echo ""
    echo "If browser didn't open automatically:"
    echo "1. Open your browser manually"
    echo "2. Press Ctrl+O (or Cmd+O on Mac)"
    echo "3. Navigate to: $(pwd)/demo/standalone.html"
    echo "================================================"
else
    echo "❌ Error: Interface file not found!"
    echo "Expected location: $(pwd)/demo/standalone.html"
    echo ""
    echo "Run this to verify files:"
    echo "  ./verify-setup.sh"
fi
