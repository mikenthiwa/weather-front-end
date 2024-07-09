'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import useSWR from 'swr';
import { CurrentWeather } from '@/services/model';
import getCurrentWeather from '@/services/current-weather.service';

interface CurrentWeatherContextType {
  data: CurrentWeather | any;
  error: Error | null;
  isLoading: boolean;
  reFetch: () => void;
}

const CurrentWeatherContext = createContext<CurrentWeatherContextType | undefined>(undefined);

const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading, mutate } = useSWR<CurrentWeather | null>('weather?lat=4.0435&lon=39.6682&appid=', getCurrentWeather);

  const reFetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return <CurrentWeatherContext.Provider value={{ data, error, isLoading, reFetch }}>{children}</CurrentWeatherContext.Provider>;
};

const useWeather = (): CurrentWeatherContextType => {
  const context = useContext(CurrentWeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export { WeatherProvider, useWeather };
