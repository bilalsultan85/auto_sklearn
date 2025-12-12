# Architecture Documentation

## Overview

This module provides a layered architecture for React applications with global contexts, services, and utilities. The design emphasizes separation of concerns, type safety, and graceful fallbacks.

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         React Components                 │
│  (App, NavBar, ServicesList, etc.)      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Custom Hooks Layer               │
│  useAuth, useStorage, useLanguage, etc.  │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Context Layer                    │
│  LanguageContext, CurrencyContext,       │
│  ThemeContext                            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Services Layer                   │
│  geminiService, storageService,          │
│  authService, automationService          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│    External APIs & Storage               │
│  Firebase, Gemini AI, localStorage       │
└─────────────────────────────────────────┘
```

## Design Patterns

### 1. Context Pattern
All contexts follow a consistent pattern:
- Provider component for wrapping the app
- Hook for accessing context values
- Persistence to localStorage
- Type-safe interfaces

```typescript
// Pattern
export const XContext = createContext<XContextType | undefined>(undefined);

export const XProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Persist to localStorage
  }, [state]);
  
  return <XContext.Provider value={value}>{children}</XContext.Provider>;
};

export const useX = () => {
  const context = useContext(XContext);
  if (!context) throw new Error('useX must be used within XProvider');
  return context;
};
```

### 2. Service Pattern
Services are singleton classes with:
- Configuration management
- Automatic fallback mechanisms
- Type-safe async APIs
- Error handling

```typescript
// Pattern
class Service {
  private config: Config;
  private useExternal: boolean = false;

  async initialize() {
    // Try external service
    // Fall back to local if unavailable
  }

  async operation(): Promise<Result> {
    if (this.useExternal) {
      return this.externalOperation();
    }
    return this.localFallback();
  }
}

export const service = new Service();
```

### 3. Fallback Strategy

Every external dependency has a fallback:

| Service | Primary | Fallback |
|---------|---------|----------|
| Storage | Firebase Firestore | localStorage |
| Auth | Firebase Auth | Demo mode with localStorage |
| AI | Gemini API | Mock data generation |
| Automation | External webhooks | Mock execution |

### 4. Type Safety

All data structures are typed:
```typescript
// Strict type definitions
export interface ServiceConfig {
  id: string;
  name: string;
  // ... fully typed
}

// Generic collection handling
type CollectionData = {
  services: ServiceConfig;
  reviews: Review;
  // ... mapped types
};
```

## Data Flow

### Context State Management

```
User Action
    ↓
Hook Function Call
    ↓
Context State Update
    ↓
localStorage Persistence
    ↓
Re-render Components
```

### Service Operations

```
Component Request
    ↓
Service Method Call
    ↓
Check Configuration
    ↓
├─ External API Available → Call API
└─ External API Unavailable → Use Fallback
    ↓
Return Typed Result
    ↓
Update UI
```

## Component Integration

### Recommended App Structure

```tsx
function App() {
  return (
    <GlobalProviders>  {/* Wraps all contexts */}
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </GlobalProviders>
  );
}
```

### Feature Components

```tsx
function Feature() {
  // Use hooks for context access
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { isDark } = useTheme();
  
  // Use hooks for service access
  const { data, create, update } = useStorage('services');
  const { user } = useAuth();
  
  // Render with context-aware styling
  return (
    <div className={isDark ? 'dark-styles' : 'light-styles'}>
      {/* ... */}
    </div>
  );
}
```

## State Persistence

### localStorage Schema

```javascript
{
  "app_language": "en" | "ar",
  "app_currency": "USD" | "SAR" | "YER",
  "app_theme": "light" | "dark",
  "demo_user": { /* AuthUser object */ },
  "collection_services": [ /* ServiceConfig[] */ ],
  "collection_reviews": [ /* Review[] */ ],
  // ... other collections
}
```

### Firebase Schema

```
/services/{serviceId}
  - id: string
  - name: string
  - description: string
  - ...

/reviews/{reviewId}
  - id: string
  - userId: string
  - serviceId: string
  - ...

/payments/{paymentId}
  - id: string
  - userId: string
  - amount: number
  - ...

// ... other collections
```

## Internationalization (i18n)

### Structure

```
/locales
  ├── en.json    # English translations
  └── ar.json    # Arabic translations
```

### Usage

```typescript
// Default translations in code
const translations = {
  en: { 'key': 'English text' },
  ar: { 'key': 'النص العربي' }
};

// Dynamic loading
await loadTranslations(language, setTranslations);

// Usage in components
const text = t('key', 'Fallback text');
```

### RTL Support

The LanguageContext automatically:
1. Sets `document.documentElement.dir`
2. Sets `document.documentElement.lang`
3. Provides `isRTL` boolean
4. Persists language choice

## Error Handling

### Service Level

```typescript
try {
  return await externalAPI();
} catch (error) {
  console.error('External API failed:', error);
  return fallbackImplementation();
}
```

### Component Level

```typescript
const { data, error, loading } = useStorage('services');

if (loading) return <Loading />;
if (error) return <Error message={error} />;
return <DataView data={data} />;
```

## Performance Considerations

### Lazy Loading
- Firebase imports are dynamic (`await import('firebase/...')`)
- Services initialize asynchronously
- Contexts use lazy state initialization

### Memoization
- Context values are memoized
- Service instances are singletons
- Hook dependencies are minimal

### Storage Optimization
- localStorage operations are batched
- Firebase queries use efficient filters
- Cached data when appropriate

## Testing Strategy

### Unit Tests
- Service fallback behavior
- Context state management
- Utility functions
- Type safety

### Integration Tests
- Context + Service interaction
- Hook behavior
- Storage operations
- Authentication flow

### Mock Strategy
```typescript
// Mock localStorage
global.localStorage = new LocalStorageMock();

// Mock fetch
global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({})
}));

// Mock Firebase
jest.mock('firebase/app');
jest.mock('firebase/firestore');
```

## Extension Points

### Adding New Contexts
1. Create context file in `src/contexts/`
2. Follow the established pattern
3. Add to `GlobalProviders`
4. Export from `src/contexts/index.tsx`

### Adding New Services
1. Create service file in `src/services/`
2. Implement fallback mechanism
3. Add TypeScript interfaces to `src/types/`
4. Export from `src/services/index.ts`

### Adding New Collections
1. Add type to `src/types/index.ts`
2. Add to `CollectionData` type map
3. Add to storage service collection list
4. Use with `useStorage<T>('collection')`

## Security Considerations

### API Keys
- Never commit API keys to repository
- Use environment variables
- Validate on server side
- Rotate keys regularly

### Input Validation
- Sanitize all user inputs
- Validate email formats
- Check password strength
- Escape HTML content

### Authentication
- Use Firebase Auth for production
- Demo mode for development only
- Implement proper session management
- Handle token expiration

### Data Privacy
- Don't log sensitive information
- Encrypt stored credentials
- Follow GDPR guidelines
- Implement data deletion

## Monitoring & Debugging

### Logging Strategy
```typescript
console.info('✓ Service initialized');
console.warn('⚠ Falling back to localStorage');
console.error('✗ Operation failed:', error);
```

### Debug Mode
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### Service Status
```typescript
geminiService.isConfigured();
storageService.isUsingFirebase();
authService.isUsingFirebase();
```

## Future Enhancements

Potential improvements:
- [ ] WebSocket support for real-time updates
- [ ] Offline-first architecture with sync
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] A/B testing framework
- [ ] Analytics integration
- [ ] Push notifications
- [ ] Progressive Web App support
