#!/bin/bash

echo "🔍 Verifying Global Contexts & Services Setup"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        ((FAIL++))
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1/ - MISSING"
        ((FAIL++))
    fi
}

echo "📁 Checking Directory Structure..."
echo "-----------------------------------"
check_dir "src"
check_dir "src/contexts"
check_dir "src/services"
check_dir "src/hooks"
check_dir "src/types"
check_dir "src/utils"
check_dir "demo"
check_dir "demo/pages"
echo ""

echo "📄 Checking Critical Files..."
echo "-----------------------------------"

# Contexts
echo "Contexts:"
check_file "src/contexts/LanguageContext.tsx"
check_file "src/contexts/CurrencyContext.tsx"
check_file "src/contexts/ThemeContext.tsx"
check_file "src/contexts/index.tsx"
echo ""

# Services
echo "Services:"
check_file "src/services/geminiService.ts"
check_file "src/services/storageService.ts"
check_file "src/services/authService.ts"
check_file "src/services/automationService.ts"
check_file "src/services/index.ts"
echo ""

# Hooks
echo "Hooks:"
check_file "src/hooks/useAuth.ts"
check_file "src/hooks/useStorage.ts"
check_file "src/hooks/index.ts"
echo ""

# Types & Utils
echo "Types & Utils:"
check_file "src/types/index.ts"
check_file "src/utils/formatters.ts"
check_file "src/utils/validators.ts"
echo ""

# Demo files
echo "Demo Files:"
check_file "demo/standalone.html"
check_file "demo/pages/index.tsx"
check_file "demo/pages/_app.tsx"
check_file "demo/package.json"
check_file "demo/tsconfig.json"
echo ""

# Config files
echo "Config Files:"
check_file "package.json"
check_file "tsconfig.json"
check_file ".gitignore"
echo ""

# Documentation
echo "Documentation:"
check_file "README.md"
check_file "START_HERE.md"
check_file "QUICK_START.md"
check_file "HOW_TO_DISPLAY_INTERFACE.md"
echo ""

echo "=============================================="
echo -e "Results: ${GREEN}${PASS} passed${NC}, ${RED}${FAIL} failed${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "🚀 Quick Start Options:"
    echo "   1. Standalone: open demo/standalone.html"
    echo "   2. Full demo:  cd demo && npm install && npm run dev"
    echo ""
else
    echo -e "${RED}❌ Some files are missing!${NC}"
    echo ""
    echo "See TROUBLESHOOTING.md for help"
fi

echo "=============================================="
