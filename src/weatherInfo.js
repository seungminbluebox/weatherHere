export async function getWeatherInfo(lat, lon) {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // 현재 날씨
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${key}`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  return {
    temp: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    condition: weatherData.weather?.[0]?.description,
    icon: weatherData.weather?.[0]?.icon,
  };
}
