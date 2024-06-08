'use client';

import React from 'react';
import { useTranslation } from '@/context/translation.context';

const LanguageToggle: React.FC = () => {
  const { locale, toggleLocale } = useTranslation();

  const handleToggle = () => {
    toggleLocale();
  };

  return (
    <button
      className='bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
      onClick={handleToggle}
    >
      {locale === 'en' ? 'Switch To Swahili' : 'Switch To English'}
    </button>
  );
};

export default LanguageToggle;
