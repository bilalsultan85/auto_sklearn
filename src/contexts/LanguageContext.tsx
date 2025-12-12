import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, LanguageConfig } from '../types';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  config: LanguageConfig;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
}

const LANGUAGE_CONFIGS: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
  },
};

const defaultTranslations: Translations = {
  en: {
    'app.title': 'Application',
    'app.welcome': 'Welcome',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
  },
  ar: {
    'app.title': 'التطبيق',
    'app.welcome': 'مرحبا',
    'common.submit': 'إرسال',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'app_language';

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'en',
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Language;
      if (stored && (stored === 'en' || stored === 'ar')) {
        return stored;
      }
    }
    return defaultLanguage;
  });

  const [translations, setTranslations] = useState<Translations>(defaultTranslations);

  useEffect(() => {
    const config = LANGUAGE_CONFIGS[language];
    
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = config.direction;
    }

    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang === 'en' || lang === 'ar') {
      setLanguageState(lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || fallback || key;
  };

  const config = LANGUAGE_CONFIGS[language];
  const isRTL = config.direction === 'rtl';

  const value: LanguageContextType = {
    language,
    direction: config.direction,
    config,
    translations,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t } = useLanguage();
  return { t };
};

export const useDirection = () => {
  const { direction, isRTL } = useLanguage();
  return { direction, isRTL };
};

export const loadTranslations = async (
  lang: Language,
  setTranslations: React.Dispatch<React.SetStateAction<Translations>>
): Promise<void> => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (response.ok) {
      const data = await response.json();
      setTranslations((prev) => ({
        ...prev,
        [lang]: { ...prev[lang], ...data },
      }));
    }
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}:`, error);
  }
};
