import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, CurrencyConfig } from '../types';

interface CurrencyContextType {
  currency: Currency;
  config: CurrencyConfig;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number, options?: FormatOptions) => string;
  convert: (amount: number, from: Currency, to: Currency) => number;
}

interface FormatOptions {
  showSymbol?: boolean;
  decimals?: number;
  useGrouping?: boolean;
}

const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
  },
  SAR: {
    code: 'SAR',
    symbol: 'ر.س',
    name: 'Saudi Riyal',
    locale: 'ar-SA',
  },
  YER: {
    code: 'YER',
    symbol: '﷼',
    name: 'Yemeni Rial',
    locale: 'ar-YE',
  },
};

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1.0,
  SAR: 3.75,
  YER: 250.0,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'app_currency';

interface CurrencyProviderProps {
  children: ReactNode;
  defaultCurrency?: Currency;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
  defaultCurrency = 'USD',
}) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Currency;
      if (stored && CURRENCY_CONFIGS[stored]) {
        return stored;
      }
    }
    return defaultCurrency;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const setCurrency = (curr: Currency) => {
    if (CURRENCY_CONFIGS[curr]) {
      setCurrencyState(curr);
    }
  };

  const formatAmount = (
    amount: number,
    options: FormatOptions = {}
  ): string => {
    const {
      showSymbol = true,
      decimals = 2,
      useGrouping = true,
    } = options;

    const config = CURRENCY_CONFIGS[currency];
    
    const formattedNumber = new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    }).format(amount);

    if (showSymbol) {
      return `${config.symbol} ${formattedNumber}`;
    }

    return formattedNumber;
  };

  const convert = (amount: number, from: Currency, to: Currency): number => {
    if (from === to) return amount;
    
    const amountInUSD = amount / EXCHANGE_RATES[from];
    const convertedAmount = amountInUSD * EXCHANGE_RATES[to];
    
    return Math.round(convertedAmount * 100) / 100;
  };

  const config = CURRENCY_CONFIGS[currency];

  const value: CurrencyContextType = {
    currency,
    config,
    setCurrency,
    formatAmount,
    convert,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const useCurrencyFormatter = () => {
  const { formatAmount, convert } = useCurrency();
  return { formatAmount, convert };
};

export const updateExchangeRate = (currency: Currency, rate: number): void => {
  if (rate > 0) {
    EXCHANGE_RATES[currency] = rate;
  }
};
