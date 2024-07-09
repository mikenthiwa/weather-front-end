import { ReactNode } from 'react';

export type TranslationContextType = {
  locale: string;
  toggleLocale: () => void;
};

export type TranslationProviderProps = {
  children: ReactNode;
};
