export async function getWeatherInfo(lat, lon) {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // 현재 날씨
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${key}`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();
  console.log("날씨 정보:", weatherData);
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const discomfortIndex =
    (9 / 5) * temp - 0.55 * (1 - humidity / 100) * ((9 / 5) * temp - 26) + 32;

  return {
    sunrise: weatherData.sys.sunrise,
    sunset: weatherData.sys.sunset,
    temp: temp,
    humidity: humidity,
    condition: weatherData.weather?.[0]?.description,
    icon: weatherData.weather?.[0]?.icon,
    discomfort: Math.floor(discomfortIndex), // 소수점 버림
  };
}
