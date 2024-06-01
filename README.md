# Weather App

This is a weather application built with [Next.js](https://nextjs.org/). The application fetches data from the OpenWeatherMap API and displays current weather information.

## Project Structure

The project is structured into components and services. The main components are `WeatherInfo` and `CurrentWeatherComponent`, which are responsible for displaying the weather data. The `axiosInstance` in the services directory is used to make HTTP requests to the OpenWeatherMap API.

## Installation

To install the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/mikenthiwa/weather-front-end.git
```

2. Navigate to the project directory:

```bash
cd weather-front-end
```

3. Install the project dependencies:

```bash
npm install
# or
yarn install
```

4. Create a `.env.local` file in the root directory of the project and add the following environment variables:

```
NEXT_PUBLIC_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

6. Testing

```bash
npm run test:watch
# or
yarn test:watch
```
