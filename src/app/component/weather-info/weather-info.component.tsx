const WeatherInfo = ({ label, value, unit }: { label: string; value: number; unit: string }) => (
  <div className='flex flex-col items-center px-3'>
    <div>{label}</div>
    <div className='font-bold text-3xl'>
      {value}
      <span className='font-normal text-base'>{unit}</span>
    </div>
  </div>
);

export default WeatherInfo;
