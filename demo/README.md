# Global Contexts & Services Demo

This is a fully functional Next.js demo application showcasing all the contexts and services.

## Quick Start

### Option 1: Run with Next.js (Recommended)

1. **Install dependencies:**
   ```bash
   cd demo
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Run with Standalone HTML (No Build Required)

See `standalone.html` in this directory - just open it in a browser!

## What You'll See

The demo interface includes:

### 1. **Header with Controls**
   - **Language Selector**: Switch between English 🇺🇸 and Arabic 🇸🇦
   - **Currency Selector**: Choose USD ($), SAR (ر.س), or YER (﷼)
   - **Theme Toggle**: Switch between light ☀️ and dark 🌙 modes

### 2. **Context Status Section**
   - Real-time display of current language, direction (RTL/LTR)
   - Current currency with formatting examples
   - Current theme status

### 3. **Authentication Demo**
   - Sign in with demo credentials (works offline!)
   - Default: `demo@example.com` / `password123`
   - Display authenticated user info
   - Sign out functionality

### 4. **Storage Service Demo**
   - Add random services to localStorage
   - View all stored services
   - Delete individual services
   - Demonstrates localStorage fallback

### 5. **AI Services Demo**
   - Generate mock exams (adapts to selected language)
   - Shows Gemini service integration
   - Displays questions with answers

### 6. **Automation Demo**
   - Trigger bot automations
   - Trigger financial automations
   - View webhook execution history
   - See success/failure statuses

## Features Demonstrated

✅ **Multi-language Support**
- Seamless EN ↔ AR switching
- Automatic RTL/LTR layout
- Persistent language preference

✅ **Multi-currency Support**
- USD, SAR, YER with proper symbols
- Real-time formatting
- Currency conversion

✅ **Theme Management**
- Light/Dark mode toggle
- Automatic system preference detection
- Smooth transitions with Tailwind

✅ **Authentication**
- Demo mode (no backend required)
- User session management
- Profile display

✅ **Storage Operations**
- Create, Read, Delete operations
- localStorage persistence
- Real-time UI updates

✅ **AI Integration**
- Exam generation
- Language-aware responses
- Mock data fallback

✅ **Automation Webhooks**
- Bot triggers
- Financial operations
- History tracking

## Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with dark mode
- **React Context API** - State management
- **localStorage** - Data persistence

## Project Structure

```
demo/
├── pages/
│   ├── _app.tsx          # App wrapper with GlobalProviders
│   └── index.tsx         # Main demo page
├── styles/
│   └── globals.css       # Tailwind styles
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
├── next.config.js        # Next.js config
└── README.md            # This file
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Customization

### Adding New Sections

Edit `demo/pages/index.tsx` and add a new section component:

```tsx
function MyCustomSection() {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  
  return (
    <Section title="My Custom Section">
      {/* Your content */}
    </Section>
  );
}

// Add to main component
<MyCustomSection />
```

### Configuring Services

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
GEMINI_API_KEY=your-key
```

### Styling

Modify `demo/styles/globals.css` or use Tailwind classes directly in components.

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use different port
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Dark Mode Not Working
Make sure Tailwind's dark mode is set to 'class' in `tailwind.config.js`:
```js
darkMode: 'class'
```

## Live Examples

Try these interactions:

1. **Test RTL**: Switch to Arabic and see the entire layout flip
2. **Test Currency**: Add a service, switch currency, see price update
3. **Test Theme**: Toggle dark mode and see smooth transitions
4. **Test Auth**: Sign in, refresh page, stay signed in (localStorage)
5. **Test Storage**: Add services, refresh page, data persists
6. **Test AI**: Generate exam in English, switch to Arabic, generate again
7. **Test Automation**: Trigger webhooks, see execution history

## Next Steps

- Integrate real Firebase backend
- Add Gemini API key for real AI
- Deploy to Vercel/Netlify
- Add more features and sections

## Support

For issues or questions, refer to the main documentation:
- [Main README](../README.md)
- [Architecture Guide](../ARCHITECTURE.md)
- [Source Code Documentation](../src/README.md)
