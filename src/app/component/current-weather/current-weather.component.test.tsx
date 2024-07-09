import React from 'react';
import { render, screen, waitFor, act } from '../../../utils/test.utils';
import '@testing-library/jest-dom';
import CurrentWeatherComponent from './current-weather.component';
import { useWeather } from '@/context/current-weather/current-weather.context';
import { weatherData } from '../mock';

jest.mock('../../../context/current-weather/current-weather.context', () => ({
  useWeather: jest.fn(),
}));

describe('<CurrentWeather />', () => {
  it('should display loading initially', () => {
    (useWeather as jest.Mock).mockReturnValue({ data: null, error: null, isLoading: true });

    render(<CurrentWeatherComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Display error message
  it('should display error message on error', async () => {
    (useWeather as jest.Mock).mockReturnValue({ data: null, error: Error('Something went wrong'), isLoading: false });
    render(<CurrentWeatherComponent />);
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });

  it('should display weather data when available', async () => {
    const mockWeatherData = weatherData;
    (useWeather as jest.Mock).mockReturnValue({ data: mockWeatherData, error: null, isLoading: false });
    render(<CurrentWeatherComponent />);

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    expect(await screen.findByText(`${Math.round(mockWeatherData.main.temp - 273.15)}°`)).toBeInTheDocument();
    const weatherIcon = screen.getByAltText('weathericon') as HTMLImageElement;
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon.src).toContain(mockWeatherData.weather[0].icon);
    expect(screen.getByText(`${mockWeatherData.wind.speed}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockWeatherData.main.humidity}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockWeatherData.main.pressure}`)).toBeInTheDocument();
  });

  it('should handle refetch correctly', async () => {
    const mutate = jest.fn();
    (useWeather as jest.Mock).mockReturnValue({ data: weatherData, error: null, isLoading: false, reFetch: mutate });
    render(<CurrentWeatherComponent />);

    act(() => {
      mutate();
    });

    await waitFor(() => expect(mutate).toHaveBeenCalledTimes(1));
    expect(screen.getByText(`${Math.round(weatherData.main.temp - 273.15)}°`)).toBeInTheDocument();
  });
});
