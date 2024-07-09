import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { WeatherProvider } from '@/context/current-weather/current-weather.context';
import EnglishMessages from '../assets/locales/en/common.json';
import SwahiliMessages from '../assets/locales/sw/common.json';

const messages: Record<string, Record<string, string>> = {
  en: EnglishMessages,
  sw: SwahiliMessages,
};

const AllTheProviders: React.FC<{ children: React.ReactNode; locale?: string }> = ({ children, locale = 'en' }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <WeatherProvider>{children}</WeatherProvider>
    </IntlProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: any) => render(ui, { wrapper: (props: any) => <AllTheProviders {...props} />, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
