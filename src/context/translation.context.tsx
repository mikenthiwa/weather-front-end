'use client';
import { createContext, useState, useContext, ReactNode, FC } from 'react';
import { IntlProvider } from 'react-intl';
import EnglishMessage from '@/assets/locales/en/common.json';
import SwahiliMessage from '@/assets/locales/sw/common.json';
import { TranslationContextType, TranslationProviderProps } from '@/context/model';

const messages: Record<string, Record<string, string>> = {
  en: EnglishMessage,
  sw: SwahiliMessage,
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: FC<TranslationProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === 'en' ? 'sw' : 'en'));
  };

  return (
    <TranslationContext.Provider value={{ locale, toggleLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
