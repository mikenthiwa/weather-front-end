'use client';

import Image from 'next/image';
import useSWR from 'swr';
import WeatherInfo from '@/app/component/weather-info/weather-info.component';
import getCurrentWeather from '@/app/services/current-weather.service';
import { CurrentWeather } from '@/app/services/model';

const CurrentWeatherComponent = () => {
  const { data, error, isLoading } = useSWR<CurrentWeather | null>(`weather?lat=4.0435&lon=39.6682&appid=`, getCurrentWeather);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  if (!data) return <div>Loading...</div>;

  const { weather, main, wind } = data;

  const url = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
  return (
    <div className='flex flex-col items-center'>
      <Image src={url} alt='weathericon' width={100} height={100} />
      <div className='flex flex-row'>
        <div className='font-bold text-6xl'>{Math.round(main.temp - 273.15)}°</div>
      </div>
      <div className='flex justify-between mt-5'>
        <WeatherInfo label='Wind' value={wind.speed} unit='km/h' />
        <WeatherInfo label='Humidity' value={main.humidity} unit='%' />
        <WeatherInfo label='Pressure' value={main.pressure} unit='pa' />
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;
