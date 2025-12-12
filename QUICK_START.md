# ⚡ Quick Start

## 🎯 Fastest Way (30 seconds)

Open the demo file in your browser:

```bash
# Mac/Linux
open demo/standalone.html

# Windows  
start demo/standalone.html

# Or just double-click: demo/standalone.html
```

**Done!** No installation, no setup, just works.

---

## 🚀 Full Demo (3 minutes)

```bash
cd demo
npm install
npm run dev
```

Open: **http://localhost:3000**

---

## 📖 What to Try

1. **Switch Language**: EN ↔ AR (watch RTL/LTR flip)
2. **Change Currency**: USD → SAR → YER (see prices update)
3. **Toggle Theme**: Light ☀️ ↔ Dark 🌙
4. **Add Services**: Click "Add Service" button
5. **Refresh Page**: Everything persists!

---

## 🔧 Use in Your Project

```tsx
// 1. Wrap your app
import { GlobalProviders } from './src/contexts';

<GlobalProviders>
  <YourApp />
</GlobalProviders>

// 2. Use hooks in components
import { useLanguage, useCurrency, useTheme } from './src/contexts';

function Component() {
  const { language, t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { isDark } = useTheme();
  
  return <div>{formatAmount(100)}</div>;
}
```

---

## 📚 Learn More

- **Full Guide**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Documentation**: [src/README.md](src/README.md)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Examples**: [examples/usage.tsx](examples/usage.tsx)

---

## 🎓 Key Concepts

| Context | Purpose | Example |
|---------|---------|---------|
| Language | AR/EN + RTL/LTR | `useLanguage()` |
| Currency | USD/SAR/YER + formatting | `useCurrency()` |
| Theme | Light/Dark mode | `useTheme()` |

| Service | Purpose | Example |
|---------|---------|---------|
| Storage | Firebase + localStorage | `storageService` |
| Auth | Firebase Auth + demo | `authService` |
| Gemini | AI exam/image gen | `geminiService` |
| Automation | Webhook triggers | `automationService` |

---

**Questions?** Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed help!
