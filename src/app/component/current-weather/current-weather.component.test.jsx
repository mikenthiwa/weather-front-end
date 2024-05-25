import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useSWR from 'swr';
import CurrentWeatherComponent from './current-weather.component';
import { weatherData } from '../mock';

jest.mock('swr');

describe('<CurrentWeather />', () => {
  it('should display loading initially', () => {
    useSWR.mockReturnValue({ data: null, error: null, isLoading: true });
    render(<CurrentWeatherComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Display error message
  it('should display error message on error', async () => {
    useSWR.mockReturnValue({ data: null, error: new Error('Something went wrong'), isLoading: false });
    render(<CurrentWeatherComponent />);
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });

  it('should display weather data when available', async () => {
    const mockWeatherData = weatherData;
    useSWR.mockReturnValue({ data: mockWeatherData, error: null, isLoading: false });

    render(<CurrentWeatherComponent />);

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    expect(await screen.findByText(`${Math.round(mockWeatherData.main.temp - 273.15)}°`)).toBeInTheDocument();
    const weatherIcon = screen.getByAltText('weathericon');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon.src).toContain(mockWeatherData.weather[0].icon);
    expect(screen.getByText(`${mockWeatherData.wind.speed}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockWeatherData.main.humidity}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockWeatherData.main.pressure}`)).toBeInTheDocument();
  });
});
