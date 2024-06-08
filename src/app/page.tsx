import CurrentWeatherComponent from '@/app/component/current-weather/current-weather.component';
import LanguageToggle from '@/app/component/language-toogle/language-toggle.component';
import React from 'react';

export default function Home() {
  return (
    <div>
      <div className='flex justify-end mb-4'>
        <LanguageToggle />
      </div>
      <CurrentWeatherComponent />
    </div>
  );
}
