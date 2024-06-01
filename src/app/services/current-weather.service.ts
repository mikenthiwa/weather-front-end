import axiosInstance from '@/app/services/index';
import { AxiosResponse } from 'axios';
import { CurrentWeather } from '@/app/services/model';

export const getCurrentWeather = async (url: string): Promise<CurrentWeather | null> => {
  try {
    const response: AxiosResponse<CurrentWeather> = await axiosInstance.get(`${url}${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`, {});
    return response.data;
  } catch (error) {
    return null;
  }
};

export default getCurrentWeather;
