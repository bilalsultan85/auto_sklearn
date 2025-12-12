# 🚀 Getting Started

## Choose Your Path

```
┌─────────────────────────────────────────────┐
│  How do you want to see the interface?     │
└─────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   🎯 Quick Demo            🚀 Full Demo
   (30 seconds)             (3 minutes)
        │                         │
        │                         │
        ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│  Standalone HTML │      │   Next.js App    │
│                  │      │                  │
│ • No setup       │      │ • Full features  │
│ • Just open file │      │ • TypeScript     │
│ • Works offline  │      │ • Hot reload     │
│ • Basic features │      │ • Production     │
└──────────────────┘      └──────────────────┘
```

---

## Path 1: Quick Demo ⚡

### Step 1: Locate the File
```
project/
└── demo/
    └── standalone.html  ← This file!
```

### Step 2: Open It
Double-click the file **OR** run:
```bash
# Mac
open demo/standalone.html

# Windows
start demo/standalone.html

# Linux
xdg-open demo/standalone.html
```

### Step 3: Explore! 🎉
You'll see:
- ✅ Language switcher (EN ↔ AR)
- ✅ Currency selector (USD/SAR/YER)
- ✅ Theme toggle (Light/Dark)
- ✅ Interactive demos
- ✅ Persistent storage

**Time:** 30 seconds
**Requirements:** Just a browser!

---

## Path 2: Full Demo 🚀

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

Check: `node --version` (should show v16+)

### Step 1: Navigate
```bash
cd demo
```

### Step 2: Install
```bash
npm install
```
Wait ~2 minutes for dependencies to install

### Step 3: Run
```bash
npm run dev
```

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

### Step 5: Explore! 🎉
You'll see everything from Quick Demo **PLUS**:
- ✅ Authentication flow
- ✅ AI exam generation
- ✅ Automation webhooks
- ✅ Full TypeScript support
- ✅ Hot reload (changes update instantly)

**Time:** 3 minutes
**Requirements:** Node.js + npm

---

## Visual Comparison

### Quick Demo
```
┌─────────────────────┐
│  Standalone HTML    │
├─────────────────────┤
│ ✅ Language         │
│ ✅ Currency         │
│ ✅ Theme            │
│ ✅ Storage          │
│ ⚠️  Basic Auth      │
│ ⚠️  Limited AI      │
│ ⚠️  Limited Auto    │
└─────────────────────┘
```

### Full Demo
```
┌─────────────────────┐
│   Next.js App       │
├─────────────────────┤
│ ✅ Language         │
│ ✅ Currency         │
│ ✅ Theme            │
│ ✅ Storage          │
│ ✅ Full Auth        │
│ ✅ Full AI          │
│ ✅ Full Automation  │
│ ✅ TypeScript       │
│ ✅ Hot Reload       │
│ ✅ Production Ready │
└─────────────────────┘
```

---

## What You'll Experience

### 1. Language Switching
```
[English ▼]  →  [العربية ▼]

Before:                After:
┌─────────────┐       ┌─────────────┐
│ Hello       │       │       مرحبا │
│ Welcome  →  │       │  ←  أهلا    │
│ LTR         │       │         RTL │
└─────────────┘       └─────────────┘
```

### 2. Currency Conversion
```
[USD ▼]  →  [SAR ▼]

Price Updates:
$ 100.00  →  ر.س 375.00
$ 450.00  →  ر.س 1,687.50
```

### 3. Theme Toggle
```
[☀️ Light]  →  [🌙 Dark]

┌────────────┐       ┌────────────┐
│ White BG   │   →   │ Dark BG    │
│ Dark Text  │   →   │ Light Text │
└────────────┘       └────────────┘
```

---

## Decision Tree

```
Do you have Node.js installed?
│
├─ NO → Use Quick Demo (standalone.html)
│       ✅ No installation needed
│
└─ YES → Do you need full features?
         │
         ├─ NO → Use Quick Demo
         │       ✅ Faster
         │       ✅ Simpler
         │
         └─ YES → Use Full Demo
                 ✅ All features
                 ✅ Development ready
```

---

## Troubleshooting

### Quick Demo Issues

**Problem:** File won't open
**Solution:** Make sure JavaScript is enabled in browser

**Problem:** Features not working
**Solution:** Try a different browser (Chrome recommended)

### Full Demo Issues

**Problem:** `npm: command not found`
**Solution:** Install Node.js from https://nodejs.org/

**Problem:** Port 3000 in use
**Solution:** Run `npm run dev -- -p 3001`

**Problem:** Dependencies won't install
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## Next Steps

### After Opening the Demo:

1. **Try the features:**
   - Switch language
   - Change currency
   - Toggle theme
   - Add/delete items

2. **Read the docs:**
   - [QUICK_START.md](QUICK_START.md)
   - [SETUP_GUIDE.md](SETUP_GUIDE.md)
   - [HOW_TO_DISPLAY_INTERFACE.md](HOW_TO_DISPLAY_INTERFACE.md)

3. **Explore the code:**
   - Look at `demo/pages/index.tsx`
   - Check `src/contexts/`
   - Review `src/services/`

4. **Customize:**
   - Change colors
   - Add features
   - Connect real services

---

## Quick Reference Card

| Need | File/Command | Time |
|------|-------------|------|
| Quick look | `open demo/standalone.html` | 30s |
| Full demo | `cd demo && npm run dev` | 3min |
| Production | `cd demo && npm run build` | 5min |
| Help | Read `HOW_TO_DISPLAY_INTERFACE.md` | - |
| All docs | See `INDEX.md` | - |

---

## Still Confused?

### For Quick Demo:
1. Find `demo/standalone.html`
2. Double-click it
3. Done!

### For Full Demo:
1. Open terminal
2. Type: `cd demo`
3. Type: `npm install`
4. Type: `npm run dev`
5. Open: http://localhost:3000

---

## Get Help

- **Detailed guide:** [HOW_TO_DISPLAY_INTERFACE.md](HOW_TO_DISPLAY_INTERFACE.md)
- **Quick start:** [QUICK_START.md](QUICK_START.md)
- **Setup guide:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **All documentation:** [INDEX.md](INDEX.md)

---

**Choose your path and start exploring! 🎉**
