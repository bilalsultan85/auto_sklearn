# SaaS App - Modern Application Platform

A fully-featured SaaS application built with **Vite**, **React 18**, **TypeScript**, **Tailwind CSS**, with RTL support and dark mode.

## 🚀 Features

- ⚡ **Vite** - Next generation build tool for lightning-fast development
- ⚛️ **React 18** - Latest React with concurrent features
- 🎨 **TypeScript** - Full type safety and better DX
- 🎯 **Tailwind CSS** - Utility-first CSS framework with dark mode support
- 🌐 **RTL Support** - Right-to-left language support (Arabic, Hebrew, etc.)
- 🎨 **Custom Color Palette** - Primary blues, secondary teal, accent gold
- 🔤 **Custom Typography** - Inter + Cairo font families via @fontsource
- 🎭 **Dark Mode** - Class-based dark mode strategy with localStorage persistence
- 🧭 **HashRouter** - Client-side routing without server configuration
- 📦 **Lucide React Icons** - Beautiful, consistent icon system
- 🔧 **Code Quality** - ESLint + Prettier for consistent code style
- 📁 **Organized Structure** - Clear separation of concerns with utility folders

## 📋 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx
│   └── Footer.tsx
├── hooks/             # Custom React hooks
│   ├── useDarkMode.ts
│   └── useRtl.ts
├── layouts/           # Layout components
│   └── MainLayout.tsx
├── pages/             # Page components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── configs/           # Configuration files
│   ├── routes.ts
│   └── app.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
│   └── cn.ts
├── App.tsx            # Main App component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles with Tailwind imports
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 16+ 
- pnpm (or npm/yarn)

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Create environment configuration:**
   ```bash
   cp .env.example .env.local
   ```

3. **Edit `.env.local` with your credentials:**
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   # ... other Firebase config
   ```

### Development

Start the development server with hot module replacement:

```bash
pnpm dev
```

The app will open automatically at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

### Linting

Check code quality and style:

```bash
pnpm lint
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: { ... },    // Main brand color (blues)
  secondary: { ... },  // Secondary color (teal)
  accent: { ... },     // Accent color (gold)
}
```

### Typography

Fonts are imported via @fontsource in `src/index.css`:
- **Inter** - Default sans-serif font
- **Cairo** - Arabic-optimized font for RTL content

Update the `fontFamily` in `tailwind.config.ts` to use different fonts.

### Dark Mode

Dark mode is enabled via the class strategy. Toggle with the moon icon in the header or use the `useDarkMode` hook:

```typescript
const { theme, toggleTheme } = useDarkMode()
```

### RTL Support

Toggle RTL mode with the globe icon in the header or use the `useRtl` hook:

```typescript
const { isRtl, toggleRtl } = useRtl()
```

The HTML `dir` attribute and `rtl` class are automatically managed.

## 🔧 Configuration

### Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the browser:

```env
VITE_APP_NAME=SaaS App
VITE_APP_ENV=development
VITE_GEMINI_API_KEY=...
VITE_FIREBASE_*=...
```

Access them in code via `import.meta.env`:

```typescript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
```

### ESLint & Prettier

Code is automatically formatted on save in most editors. To manually format:

```bash
# Lint check
pnpm lint

# Format with Prettier (manual)
pnpm prettier --write .
```

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM bindings
- `react-router-dom` - Client-side routing

### UI & Icons
- `lucide-react` - Beautiful icon system
- `@fontsource/inter` - Inter font
- `@fontsource/cairo` - Cairo font

### Styling
- `tailwindcss` - Utility-first CSS
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

### Development
- `typescript` - Type safety
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code quality
- `prettier` - Code formatter

## 🌐 Routing

The app uses `HashRouter` for client-side routing. Routes are defined in `src/configs/routes.ts`:

```typescript
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  NOT_FOUND: '*',
}
```

Access routes via:
- Anchor tags: `<a href="/#/dashboard">Dashboard</a>`
- React Router: `<Link to={ROUTES.DASHBOARD}>Dashboard</Link>`

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

The optimized bundle will be created in the `dist/` directory.

### Hosting

The app can be deployed to any static hosting service:
- **Vercel** - Optimal for Vite + React
- **Netlify** - Simple drag-and-drop or git-based deployment
- **GitHub Pages** - Update `vite.config.ts` with `base: '/repo-name/'`
- **AWS S3 + CloudFront** - For enterprise deployments

## 📚 Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

## 📄 License

MIT - Feel free to use this template for your projects!
