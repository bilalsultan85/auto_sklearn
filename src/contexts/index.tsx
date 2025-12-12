import React, { ReactNode } from 'react';
import { LanguageProvider } from './LanguageContext';
import { CurrencyProvider } from './CurrencyContext';
import { ThemeProvider } from './ThemeContext';

export * from './LanguageContext';
export * from './CurrencyContext';
export * from './ThemeContext';

interface GlobalProvidersProps {
  children: ReactNode;
}

export const GlobalProviders: React.FC<GlobalProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
