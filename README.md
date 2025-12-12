# AutoSklearn

A simple example of using autosklearn

---

## 🎯 **Display the Interface - Quick Answer**

### ⚡ Option 1: Instant (No Installation)
**Just double-click:** `demo/standalone.html`

Or from terminal:
```bash
open demo/standalone.html
```

✅ Works immediately | ✅ No setup | ✅ Offline

### 🚀 Option 2: Full Demo (All Features)
```bash
cd demo
npm install
npm run dev
```
Then open: **http://localhost:3000**

✅ Full features | ✅ TypeScript | ✅ Production-ready

### 📖 Need Help?
- **Complete guide:** [HOW_TO_DISPLAY_INTERFACE.md](HOW_TO_DISPLAY_INTERFACE.md)
- **Getting started:** [GETTING_STARTED.md](GETTING_STARTED.md)
- **Quick reference:** [QUICK_START.md](QUICK_START.md)

---

## Additional Features

This repository now includes a comprehensive **Global Contexts and Services** module in the `src/` directory, providing:

### Contexts
- **LanguageContext**: Multi-language support (Arabic/English) with RTL/LTR direction handling
- **CurrencyContext**: Currency management (USD/SAR/YER) with formatting and conversion
- **ThemeContext**: Dark/light theme with Tailwind CSS integration

### Services
- **geminiService**: AI-powered exam generation, hero image creation, and service tools
- **storageService**: Unified storage with Firebase and localStorage fallback
- **authService**: Authentication with Firebase Auth and demo mode
- **automationService**: Mock webhook triggers for bots, financial, and workflow automations

### Custom Hooks
- `useAuth`: Easy authentication management
- `useStorage`: Type-safe storage operations
- `useLanguage`, `useCurrency`, `useTheme`: Context-specific hooks

## 🚀 Quick Start

**Want to see it in action?**

### Option 1: Instant Demo (No Installation)
```bash
open demo/standalone.html  # Just double-click the file!
```

### Option 2: Full Next.js Demo
```bash
cd demo
npm install
npm run dev
# Open http://localhost:3000
```

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get running in 30 seconds
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed setup instructions
- **[Source Documentation](src/README.md)** - API reference and examples
- **[Architecture](ARCHITECTURE.md)** - Design patterns and structure
- **[Changelog](CHANGELOG.md)** - Features and version history

## ✨ What You Get

✅ **Multi-language** (English/Arabic with RTL/LTR)  
✅ **Multi-currency** (USD/SAR/YER with conversion)  
✅ **Theme support** (Light/Dark mode)  
✅ **Authentication** (Firebase + demo mode)  
✅ **Storage** (Firebase + localStorage fallback)  
✅ **AI Integration** (Gemini API + mock data)  
✅ **Automation** (Webhook triggers)  
✅ **Full TypeScript** support  
✅ **Production ready**

## 🎯 Live Demo Features

Try these interactive features:
- Switch languages and watch the interface flip RTL/LTR
- Change currencies and see real-time conversion
- Toggle dark/light mode with smooth transitions
- Add/delete items with automatic persistence
- Generate AI-powered exams in multiple languages
- Trigger automation webhooks with history tracking

See it in action: [demo/standalone.html](demo/standalone.html)