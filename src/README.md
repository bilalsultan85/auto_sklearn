# Global Contexts and Services

This module provides a comprehensive set of global contexts, services, and utilities for building modern React/Next.js applications with multi-language support, currency handling, theming, and backend service integrations.

## Structure

```
src/
├── contexts/          # React Context providers
│   ├── LanguageContext.tsx
│   ├── CurrencyContext.tsx
│   ├── ThemeContext.tsx
│   └── index.tsx
├── services/          # Backend service integrations
│   ├── geminiService.ts
│   ├── storageService.ts
│   ├── authService.ts
│   ├── automationService.ts
│   └── index.ts
├── hooks/             # Custom React hooks
│   ├── useAuth.ts
│   ├── useStorage.ts
│   └── index.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── index.ts
└── __tests__/         # Test files
```

## Contexts

### LanguageContext

Manages application language (Arabic/English) with RTL/LTR support.

```tsx
import { useLanguage, LanguageProvider } from './contexts';

function App() {
  return (
    <LanguageProvider defaultLanguage="en">
      <YourApp />
    </LanguageProvider>
  );
}

function Component() {
  const { language, direction, t, setLanguage, isRTL } = useLanguage();
  
  return (
    <div dir={direction}>
      <h1>{t('app.welcome', 'Welcome')}</h1>
      <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
        Toggle Language
      </button>
    </div>
  );
}
```

**Features:**
- Automatic RTL/LTR direction switching
- Persistent language preference
- Translation loader
- Helper hooks: `useTranslation()`, `useDirection()`

### CurrencyContext

Handles multiple currencies (USD, SAR, YER) with formatting and conversion.

```tsx
import { useCurrency, CurrencyProvider } from './contexts';

function App() {
  return (
    <CurrencyProvider defaultCurrency="USD">
      <YourApp />
    </CurrencyProvider>
  );
}

function Component() {
  const { currency, formatAmount, convert, setCurrency } = useCurrency();
  
  return (
    <div>
      <p>{formatAmount(100)}</p>
      <p>Converted: {convert(100, 'USD', 'SAR')}</p>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="SAR">SAR</option>
        <option value="YER">YER</option>
      </select>
    </div>
  );
}
```

**Features:**
- Currency formatting with locale support
- Currency conversion
- Persistent currency preference
- Helper hook: `useCurrencyFormatter()`

### ThemeContext

Manages light/dark theme with Tailwind CSS integration.

```tsx
import { useTheme, ThemeProvider } from './contexts';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}

function Component() {
  const { theme, toggleTheme, isDark, getThemeClass } = useTheme();
  
  return (
    <div className={getThemeClass('bg-white', 'bg-gray-900')}>
      <button onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
```

**Features:**
- Automatic dark/light mode detection
- Tailwind CSS class toggling
- Persistent theme preference
- Helper hooks: `useThemeToggle()`, `useThemeClass()`

### GlobalProviders

Combines all providers for easy setup:

```tsx
import { GlobalProviders } from './contexts';

function App() {
  return (
    <GlobalProviders>
      <YourApp />
    </GlobalProviders>
  );
}
```

## Services

### geminiService

AI-powered service for exam generation, image creation, and tool execution.

```typescript
import { geminiService } from './services';

// Configure with API key
geminiService.setApiKey('your-api-key');

// Generate exam
const exam = await geminiService.generateExam({
  subject: 'Mathematics',
  difficulty: 'medium',
  questionCount: 10,
  language: 'en',
  includeAnswers: true,
});

// Generate hero image
const imageUrl = await geminiService.generateHeroImage({
  prompt: 'Beautiful sunset',
  style: 'photographic',
  aspectRatio: '16:9',
});

// Run service tool
const result = await geminiService.runServiceTool({
  toolName: 'dataAnalysis',
  parameters: { dataset: 'sales' },
});

// Chat
const response = await geminiService.chat('Hello!');
```

**Features:**
- Automatic fallback to mock data when not configured
- Exam generation with multiple question types
- Hero image generation
- Service tool runner
- Chat interface

### storageService

Unified storage service with Firebase and localStorage fallback.

```typescript
import { storageService } from './services';

// Create item
const service = await storageService.create('services', {
  name: 'Web Development',
  description: 'Professional web development service',
  category: 'development',
  price: 1000,
  currency: 'USD',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Get all items
const services = await storageService.getAll('services');

// Get by ID
const item = await storageService.getById('services', id);

// Update item
await storageService.update('services', id, { price: 1200 });

// Delete item
await storageService.delete('services', id);

// Query with filter
const activeServices = await storageService.query(
  'services',
  (item) => item.isActive === true
);
```

**Collections:**
- `services` - Service configurations
- `reviews` - User reviews
- `payments` - Payment records
- `jobs` - Job postings
- `history` - History entries
- `visitors` - Visitor logs
- `notifications` - User notifications

**Features:**
- Automatic Firebase/localStorage fallback
- Type-safe operations
- Query filtering
- Collection management

### authService

Authentication service with Firebase Auth and demo mode fallback.

```typescript
import { authService } from './services';

// Sign in
const user = await authService.signIn({
  email: 'user@example.com',
  password: 'password123',
});

// Sign up
const newUser = await authService.signUp({
  email: 'newuser@example.com',
  password: 'password123',
  displayName: 'John Doe',
});

// Sign out
await authService.signOut();

// Reset password
await authService.resetPassword('user@example.com');

// Update profile
await authService.updateProfile({
  displayName: 'Jane Doe',
  photoURL: 'https://example.com/photo.jpg',
});

// Listen to auth state changes
const unsubscribe = authService.onAuthStateChanged((state) => {
  console.log('User:', state.user);
  console.log('Loading:', state.loading);
  console.log('Error:', state.error);
});
```

**Features:**
- Firebase Auth integration
- Demo mode fallback
- Auth state listeners
- Profile management
- Email verification

### automationService

Mock webhook service for bot, financial, notification, and workflow automations.

```typescript
import { automationService } from './services';

// Trigger bot automation
const webhook = await automationService.triggerBotAutomation({
  botType: 'telegram',
  action: 'sendMessage',
  recipients: ['user1', 'user2'],
  message: 'Hello!',
});

// Trigger financial automation
await automationService.triggerFinancialAutomation({
  type: 'payment',
  amount: 100,
  currency: 'USD',
  userId: 'user123',
});

// Trigger notification
await automationService.triggerNotificationAutomation({
  type: 'email',
  recipients: ['user@example.com'],
  subject: 'Welcome!',
  message: 'Welcome to our platform',
  priority: 'high',
});

// Trigger workflow
await automationService.triggerWorkflowAutomation({
  workflowId: 'workflow_123',
  steps: [
    {
      id: 'step1',
      name: 'Fetch Data',
      action: 'fetchData',
      parameters: { source: 'api' },
    },
  ],
});

// Schedule automation
await automationService.scheduleAutomation(
  'financial',
  payload,
  '0 9 * * 1' // Cron expression
);

// Get webhook history
const history = automationService.getWebhookHistory(10);
```

**Features:**
- Bot automations (Telegram, WhatsApp, Slack, Discord)
- Financial automations (Payments, Invoices, Subscriptions)
- Notification automations (Email, SMS, Push)
- Workflow automations
- Scheduled and event-based triggers
- Webhook history tracking
- Retry mechanism

## Custom Hooks

### useAuth

```typescript
import { useAuth } from './hooks';

function Component() {
  const {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    isAuthenticated,
  } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.displayName}</p>
      ) : (
        <button onClick={() => signIn('email', 'password')}>Sign In</button>
      )}
    </div>
  );
}
```

### useStorage

```typescript
import { useStorage } from './hooks';

function Component() {
  const { data, loading, error, refetch, create, update, remove } =
    useStorage('services');

  const handleCreate = async () => {
    await create({
      name: 'New Service',
      description: 'Description',
      category: 'category',
      price: 100,
      currency: 'USD',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => <div key={item.id}>{item.name}</div>)
      )}
    </div>
  );
}
```

## Utilities

### Formatters

```typescript
import { formatCurrency, formatDate, formatRelativeTime } from './utils';

formatCurrency(100, 'USD'); // "$100.00"
formatDate(new Date(), 'en-US'); // "January 1, 2024"
formatRelativeTime(new Date()); // "just now"
```

### Validators

```typescript
import { isValidEmail, isValidPassword, sanitizeInput } from './utils';

isValidEmail('user@example.com'); // true
isValidPassword('12345678'); // true
sanitizeInput('<script>alert("xss")</script>'); // "scriptalert(\"xss\")/script"
```

## Testing

Run tests:

```bash
npm test
```

Test files are located in `src/__tests__/` and cover:
- Storage service with localStorage fallback
- Gemini service mock functionality
- Automation service webhook triggers

## Configuration

### Firebase Setup

Set environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

If not configured, services automatically fall back to localStorage and demo modes.

### Gemini AI Setup

```typescript
import { geminiService } from './services';

geminiService.setApiKey('your-gemini-api-key');
```

If not configured, service returns mock data.

## License

This module is part of the AutoSklearn project.
