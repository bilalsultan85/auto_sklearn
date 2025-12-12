# 🔧 Troubleshooting Guide

## Problem: "No interfaces" / Nothing displays

### Quick Fix #1: Try Standalone HTML

The fastest way to see if everything works:

```bash
# Just open this file in your browser
open demo/standalone.html

# Or double-click: demo/standalone.html
```

**This should work immediately with NO setup required.**

---

### Quick Fix #2: Verify Files Exist

Check if these critical files exist:

```bash
# Check source files
ls src/contexts/LanguageContext.tsx
ls src/contexts/CurrencyContext.tsx
ls src/contexts/ThemeContext.tsx
ls src/services/geminiService.ts
ls src/services/storageService.ts

# Check demo files
ls demo/standalone.html
ls demo/pages/index.tsx
ls demo/pages/_app.tsx
```

If any are missing, they need to be created.

---

## Common Issues & Solutions

### Issue 1: "Cannot find module" errors

**Problem:** Import errors when trying to run Next.js demo

**Solution:**
```bash
cd demo
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Next.js won't start

**Problem:** `npm run dev` fails

**Solutions:**

**A. Install dependencies first:**
```bash
cd demo
npm install
npm run dev
```

**B. Check Node.js version:**
```bash
node --version
# Should be 16+
```

**C. Try different port:**
```bash
npm run dev -- -p 3001
```

### Issue 3: Standalone HTML not working

**Problem:** Opens but shows blank page or errors

**Solutions:**

**A. Check browser console (F12):**
- Look for errors
- JavaScript might be disabled

**B. Try different browser:**
- Chrome (recommended)
- Firefox
- Safari

**C. Make sure you're opening the actual file:**
```
/home/engine/project/demo/standalone.html
```

### Issue 4: TypeScript errors

**Problem:** Type errors in IDE or when running

**Solution:**
```bash
# Install peer dependencies
npm install react react-dom

# Run type check
npm run type-check
```

### Issue 5: "React is not defined"

**Problem:** React context errors

**Solution:** Make sure React is imported:
```typescript
import React from 'react';
```

---

## Diagnostic Steps

### Step 1: Test Standalone HTML

```bash
open demo/standalone.html
```

**Expected:** Browser opens, interface displays

**If it works:** ✅ Core system is fine
**If it doesn't:** ❌ See Issue 3 above

### Step 2: Check File Structure

```bash
find src -type f -name "*.tsx" -o -name "*.ts" | head -20
```

**Expected:** Should list all source files

### Step 3: Try Next.js Demo

```bash
cd demo
npm install
npm run dev
```

**Expected:** Server starts on port 3000

**Success message:**
```
ready - started server on 0.0.0.0:3000
```

### Step 4: Open in Browser

Navigate to: http://localhost:3000

**Expected:** Interface displays with:
- Header with language/currency/theme controls
- Context status cards
- Auth demo section
- Storage demo section
- AI demo section
- Automation demo section

---

## Verification Checklist

Use this to verify everything is working:

### ✅ Files Exist

- [ ] `src/contexts/LanguageContext.tsx`
- [ ] `src/contexts/CurrencyContext.tsx`
- [ ] `src/contexts/ThemeContext.tsx`
- [ ] `src/services/geminiService.ts`
- [ ] `src/services/storageService.ts`
- [ ] `src/services/authService.ts`
- [ ] `src/services/automationService.ts`
- [ ] `src/types/index.ts`
- [ ] `src/hooks/useAuth.ts`
- [ ] `src/hooks/useStorage.ts`
- [ ] `demo/standalone.html`
- [ ] `demo/pages/index.tsx`
- [ ] `demo/pages/_app.tsx`

### ✅ Standalone Works

- [ ] Can open `demo/standalone.html`
- [ ] Interface displays
- [ ] Can switch language
- [ ] Can change currency
- [ ] Can toggle theme
- [ ] Can add/delete items

### ✅ Next.js Works

- [ ] Dependencies installed (`node_modules` exists in `demo/`)
- [ ] Server starts with `npm run dev`
- [ ] Can access http://localhost:3000
- [ ] Interface displays
- [ ] All features work

---

## Manual Test

If you want to manually verify everything works, follow these steps:

### Test 1: Standalone HTML

1. Open `demo/standalone.html` in browser
2. Click language dropdown → Select Arabic
3. **Expected:** Layout flips to RTL, text in Arabic
4. Click currency dropdown → Select SAR
5. **Expected:** Prices update with ر.س symbol
6. Click theme button
7. **Expected:** Colors invert smoothly

### Test 2: Next.js Demo

1. Run: `cd demo && npm install && npm run dev`
2. Open: http://localhost:3000
3. Sign in with: `demo@example.com` / `password123`
4. **Expected:** User profile displays
5. Click "Add Random Service"
6. **Expected:** Service card appears
7. Refresh page (F5)
8. **Expected:** Service still there, user still logged in

---

## Still Having Issues?

### Get More Information

**Check console for errors:**
```bash
# Browser console (F12)
# Look for red error messages

# Terminal output
# Check for error messages when running npm run dev
```

**Verify environment:**
```bash
node --version    # Should be 16+
npm --version     # Should be 7+
pwd               # Should be in /home/engine/project
```

**Check file permissions:**
```bash
ls -la demo/standalone.html
# Should be readable (-r--)
```

### Create Minimal Test

Create a simple test file to verify React works:

```bash
cat > test.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    const { createElement } = React;
    const { createRoot } = ReactDOM;
    
    const root = createRoot(document.getElementById('root'));
    root.render(createElement('h1', null, 'React Works! ✅'));
  </script>
</body>
</html>
EOF

open test.html
```

If this shows "React Works! ✅", then React itself is fine.

---

## Emergency: Start from Scratch

If nothing works, here's the nuclear option:

```bash
# Backup first
cp -r /home/engine/project /home/engine/project.backup

# Clean everything
cd /home/engine/project
rm -rf demo/node_modules
rm -rf demo/.next
rm -rf node_modules

# Reinstall
cd demo
npm install

# Try again
npm run dev
```

---

## Get Help

If you've tried everything above and it still doesn't work:

1. **Check the error message** - What exactly is the error?
2. **Check browser console** (F12) - Any red errors?
3. **Check terminal output** - What does `npm run dev` say?
4. **Try standalone HTML** - Does that at least work?

Provide these details when asking for help:
- Node version: `node --version`
- NPM version: `npm --version`
- Operating system
- Exact error message
- What you tried from this guide

---

## Quick Reference

**Problem → Solution**

| Problem | Solution |
|---------|----------|
| Nothing displays | Try `open demo/standalone.html` |
| Can't find module | Run `cd demo && npm install` |
| Port in use | Run `npm run dev -- -p 3001` |
| TypeScript errors | Run `npm run type-check` |
| React errors | Check imports, install react |
| Blank page | Check browser console (F12) |
| Server won't start | Check Node.js version (16+) |

---

**Most Common Solution:**

```bash
cd demo
npm install
npm run dev
# Open http://localhost:3000
```

**Fastest Solution:**

```bash
open demo/standalone.html
```

---

Need more help? See:
- [SETUP_GUIDE.md](SETUP_GUIDE.md)
- [HOW_TO_DISPLAY_INTERFACE.md](HOW_TO_DISPLAY_INTERFACE.md)
- [START_HERE.md](START_HERE.md)
