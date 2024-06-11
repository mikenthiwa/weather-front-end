'use client';

import React from 'react';
import Image from 'next/image';

import { FormattedMessage } from 'react-intl';
import WeatherInfo from '@/app/component/weather-info/weather-info.component';
import { useWeather } from '@/app/context/current-weather/current-weather.context';

const CurrentWeatherComponent: React.FC = () => {
  const { data, isLoading } = useWeather();
  if (isLoading)
    return (
      <div>
        <FormattedMessage id='loading' defaultMessage='Loading...' />
      </div>
    );
  if (!data)
    return (
      <div>
        <FormattedMessage id='error' defaultMessage='Something went wrong' />
      </div>
    );

  const { weather, main, wind } = data;

  const url = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
  return (
    <div className='flex flex-col items-center'>
      <Image fetchPriority='high' src={url} alt='weathericon' width={100} height={100} />
      <div className='flex flex-row'>
        <div className='font-bold text-6xl'>{Math.round(main.temp - 273.15)}°</div>
      </div>
      <div className='flex justify-between mt-5'>
        <WeatherInfo label={<FormattedMessage id='Wind' defaultMessage='Wind' />} value={wind.speed} unit='km/h' />
        <WeatherInfo label={<FormattedMessage id='Humidity' defaultMessage='Humidity' />} value={main.humidity} unit='%' />
        <WeatherInfo label={<FormattedMessage id='Pressure' defaultMessage='Pressure' />} value={main.pressure} unit='pa' />
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;
