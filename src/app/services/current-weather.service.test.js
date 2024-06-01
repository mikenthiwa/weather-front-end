import axiosInstance from './index';
import MockAdapter from 'axios-mock-adapter';
import getCurrentWeather from './current-weather.service';
import { weatherData } from '../component/mock';

const mock = new MockAdapter(axiosInstance);

describe('getCurrentWeather', () => {
  const apiKey = '83e42b02147e6c7ff20b67fac40c9c3a';
  const url = `weather?lat=4.0435&lon=39.6682&appid=`;
  beforeAll(() => {
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = apiKey;
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should fetch current weather data successfully', async () => {
    const mockWeatherData = weatherData;

    mock.onGet(`${url}${apiKey}`).reply(200, mockWeatherData);

    const data = await getCurrentWeather(url);
    expect(data).toEqual(mockWeatherData);
  });

  it('should return null on error', async () => {
    mock.onGet(`${url}${apiKey}`).reply(500);

    const data = await getCurrentWeather(url);
    expect(data).toBeNull();
  });
});
