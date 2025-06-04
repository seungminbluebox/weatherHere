export function updateWeatherInfo(weather) {
  const humidityValue = weather.humidity;
  const iconValue = weather.icon;
  const temperatureValue = weather.temp;
  const condition = weather.condition;

  const hum = document.querySelector(".humidity-value");
  const icon = document.querySelector(".icon-temp img");
  icon.src = `./image/weather/${iconValue}.PNG`;
  const temp = document.querySelector(".temperature");
  const conditionText = document.querySelector(".weather-desc");

  hum.textContent = `${humidityValue}%`;
  temp.textContent = `${Math.floor(temperatureValue)}°C`;
  conditionText.textContent = condition;
}
