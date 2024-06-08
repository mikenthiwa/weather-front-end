import React from 'react';

type WeatherInfoProps = {
  label: React.ReactNode;
  value: number;
  unit: string;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ label, value, unit }) => (
  <div className='flex flex-col items-center px-3'>
    <div>{label}</div>
    <div className='font-bold text-3xl'>
      {value}
      <span className='font-normal text-base'>{unit}</span>
    </div>
  </div>
);

export default WeatherInfo;
