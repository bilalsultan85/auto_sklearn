# AutoSklearn

A simple example of using autosklearn

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

See [src/README.md](src/README.md) for detailed documentation and usage examples