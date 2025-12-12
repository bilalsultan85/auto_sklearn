# Setup Guide: Display the Main Interface

This guide shows you three ways to display and interact with the Global Contexts & Services module.

## 🚀 Quick Start (Easiest - No Installation)

### Method 1: Standalone HTML Demo

**⏱️ Time: 30 seconds**

1. Open the standalone demo file:
   ```bash
   # On Mac/Linux
   open demo/standalone.html
   
   # On Windows
   start demo/standalone.html
   
   # Or just double-click the file
   ```

2. That's it! The demo runs entirely in your browser with no build step.

**Features:**
- ✅ No installation required
- ✅ Works offline
- ✅ All contexts functional
- ✅ localStorage persistence
- ✅ Instant feedback

---

## 🔥 Full Demo (Recommended - Best Experience)

### Method 2: Next.js Application

**⏱️ Time: 3-5 minutes**

This gives you the complete experience with all features.

#### Step 1: Navigate to Demo Directory
```bash
cd demo
```

#### Step 2: Install Dependencies
```bash
npm install
```

**What gets installed:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Firebase SDK

#### Step 3: Run Development Server
```bash
npm run dev
```

#### Step 4: Open Browser
Navigate to: **http://localhost:3000**

**Features:**
- ✅ Full TypeScript support
- ✅ Hot reload (instant updates)
- ✅ All contexts and services
- ✅ Production-ready code
- ✅ Fully customizable

### Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 🛠️ Production Build

### Method 3: Build and Deploy

**⏱️ Time: 5-10 minutes**

#### Build for Production
```bash
cd demo
npm run build
npm start
```

#### Deploy to Vercel (Free)
```bash
npm install -g vercel
vercel
```

Follow the prompts, and you'll get a live URL!

#### Deploy to Netlify (Free)
```bash
npm run build
# Drag the .next folder to Netlify's deploy zone
```

---

## 📱 What You'll See

### Interface Overview

```
┌─────────────────────────────────────────────┐
│  🌐 Header                                   │
│  [EN/AR] [USD/SAR/YER] [☀️/🌙]             │
├─────────────────────────────────────────────┤
│                                             │
│  📊 Context Status                          │
│  ┌───────────┬───────────┬───────────┐     │
│  │ Language  │ Currency  │  Theme    │     │
│  │   Info    │   Info    │   Info    │     │
│  └───────────┴───────────┴───────────┘     │
│                                             │
│  🔐 Authentication Demo                     │
│  [Sign In Form] or [User Profile]          │
│                                             │
│  💾 Storage Service Demo                    │
│  [➕ Add Service]                           │
│  ┌─────────┬─────────┬─────────┐          │
│  │ Service │ Service │ Service │          │
│  │  Card   │  Card   │  Card   │          │
│  └─────────┴─────────┴─────────┘          │
│                                             │
│  🤖 AI Services Demo                        │
│  [Generate Exam]                            │
│  [Question 1, Question 2, ...]             │
│                                             │
│  ⚡ Automation Demo                         │
│  [🤖 Bot] [💰 Payment]                     │
│  [Webhook History...]                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎯 Interactive Features to Try

### 1. **Multi-Language Testing**

**Try this:**
1. Click the language dropdown
2. Select "🇸🇦 العربية"
3. Watch the entire interface flip to RTL (right-to-left)
4. All text aligns right, layout mirrors

**What's happening:**
- `LanguageContext` updates state
- `document.dir` changes to 'rtl'
- CSS automatically flips layout
- Preference saved to localStorage

### 2. **Currency Testing**

**Try this:**
1. Add a few services with "Add Service" button
2. Note the prices (e.g., "$ 450")
3. Change currency to "SAR"
4. Watch all prices update automatically

**What's happening:**
- `CurrencyContext` recalculates all amounts
- Real-time conversion using exchange rates
- Formatting updates with proper symbols
- Components re-render with new values

### 3. **Theme Testing**

**Try this:**
1. Click the "🌙 Dark" button
2. Watch smooth transition to dark mode
3. All colors invert elegantly
4. Refresh page - theme persists!

**What's happening:**
- `ThemeContext` toggles state
- Tailwind's `dark:` classes activate
- `document.documentElement` gets 'dark' class
- Saved to localStorage

### 4. **Authentication Flow**

**Try this:**
1. Enter email: `demo@example.com`
2. Enter password: `password123`
3. Click "Sign In (Demo Mode)"
4. See user profile appear
5. Refresh page - still signed in!

**What's happening:**
- `authService` validates credentials
- User object saved to localStorage
- `useAuth` hook provides user state
- Session persists across refreshes

### 5. **Storage Operations**

**Try this:**
1. Click "➕ Add Random Service" multiple times
2. See services appear instantly
3. Refresh the page
4. Services are still there!
5. Click "Delete" on any service

**What's happening:**
- `storageService` writes to localStorage
- `useStorage` hook manages state
- Data persists across sessions
- Real-time CRUD operations

### 6. **AI Generation**

**Try this:**
1. Click "🤖 Generate Exam (Mock)"
2. See 3 questions with multiple choice options
3. Correct answers are highlighted in green
4. Switch to Arabic language
5. Generate again - questions now in Arabic!

**What's happening:**
- `geminiService` generates mock exam
- Language-aware content creation
- Questions adapt to current language
- Mock data fallback (no API needed)

### 7. **Automation Triggers**

**Try this:**
1. Click "🤖 Trigger Bot"
2. See webhook appear in history
3. Note the status (completed/failed)
4. Click "💰 Trigger Payment"
5. Another webhook added to history

**What's happening:**
- `automationService` simulates webhook
- Random success/failure for realism
- History tracked in memory
- Execution metadata captured

---

## 🔍 Understanding the Code

### How Contexts Work

```tsx
// In your app
<GlobalProviders>
  <YourComponent />
</GlobalProviders>

// In YourComponent
function YourComponent() {
  const { language, setLanguage } = useLanguage();
  const { formatAmount } = useCurrency();
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'dark-style' : 'light-style'}>
      <p>{formatAmount(100)}</p>
    </div>
  );
}
```

### How Services Work

```tsx
// Direct service usage
import { geminiService, storageService } from '../src/services';

// Generate content
const exam = await geminiService.generateExam({
  subject: 'Math',
  difficulty: 'medium',
  questionCount: 5,
  language: 'en',
  includeAnswers: true
});

// Store data
const newItem = await storageService.create('services', {
  name: 'My Service',
  price: 100,
  currency: 'USD',
  // ...
});
```

### How Hooks Work

```tsx
// Using the custom hooks
const { user, signIn, signOut } = useAuth();
const { data, create, update, remove } = useStorage('services');

// Sign in
await signIn('email@example.com', 'password');

// Create item
await create({
  name: 'New Service',
  price: 100,
  // ...
});
```

---

## 📦 File Structure

```
project/
├── src/                    # Core module
│   ├── contexts/          # React contexts
│   ├── services/          # Service layer
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
│
├── demo/                   # Demo application
│   ├── pages/             # Next.js pages
│   │   ├── _app.tsx       # App wrapper
│   │   └── index.tsx      # Main demo
│   ├── styles/            # CSS styles
│   ├── standalone.html    # No-build demo
│   └── package.json       # Dependencies
│
└── examples/              # Usage examples
    └── usage.tsx          # Example code
```

---

## 🎨 Customization

### Change Theme Colors

Edit `demo/tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Add New Language

Edit `src/contexts/LanguageContext.tsx`:
```tsx
const LANGUAGE_CONFIGS: Record<Language, LanguageConfig> = {
  en: { /* ... */ },
  ar: { /* ... */ },
  fr: {  // Add French
    code: 'fr',
    name: 'Français',
    direction: 'ltr',
    flag: '🇫🇷',
  },
};
```

### Add New Currency

Edit `src/contexts/CurrencyContext.tsx`:
```tsx
const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  USD: { /* ... */ },
  SAR: { /* ... */ },
  YER: { /* ... */ },
  EUR: {  // Add Euro
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
  },
};
```

---

## 🌐 Connect Real Services

### Firebase Setup

1. Create Firebase project at https://console.firebase.google.com
2. Get your config from Project Settings
3. Create `demo/.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
# ... etc
```
4. Services automatically detect and use Firebase!

### Gemini AI Setup

1. Get API key from https://makersuite.google.com/app/apikey
2. Add to `demo/.env.local`:
```env
GEMINI_API_KEY=your-gemini-key
```
3. Configure in your code:
```tsx
geminiService.setApiKey(process.env.GEMINI_API_KEY);
```

---

## 🐛 Debugging

### View Context State

Open browser console:
```javascript
// Check localStorage
console.log(localStorage.getItem('app_language'));
console.log(localStorage.getItem('app_currency'));
console.log(localStorage.getItem('app_theme'));

// Check stored data
console.log(localStorage.getItem('collection_services'));
```

### Enable Service Logging

All services log their status:
```
✓ Service initialized
⚠ Falling back to localStorage
✗ Operation failed
```

---

## 📚 Next Steps

1. **Explore the Code**: Look at `demo/pages/index.tsx`
2. **Read Documentation**: Check `src/README.md`
3. **Run Tests**: `npm test` in root directory
4. **Deploy**: Use Vercel or Netlify
5. **Customize**: Make it your own!

---

## 💡 Tips

- **Persistence**: All settings save automatically
- **Offline**: Everything works without internet
- **Mobile**: Interface is fully responsive
- **Testing**: Use demo mode for development
- **Production**: Connect real Firebase for production

---

## ❓ Common Questions

**Q: Do I need Node.js?**
A: Not for standalone.html. Yes for Next.js demo.

**Q: Can I use this in production?**
A: Yes! Just connect real Firebase/Gemini services.

**Q: Does it work offline?**
A: Yes! Uses localStorage when Firebase unavailable.

**Q: Can I customize the UI?**
A: Absolutely! All code is fully editable.

**Q: Is TypeScript required?**
A: No, but highly recommended for type safety.

---

## 🆘 Support

- **Documentation**: See `/src/README.md`
- **Architecture**: See `/ARCHITECTURE.md`
- **Examples**: See `/examples/usage.tsx`
- **Issues**: Check browser console for errors

---

**Ready? Pick a method above and start exploring! 🚀**
