export function updateWeatherInfo(weather) {
  const humidityValue = weather.humidity;
  const iconValue = weather.icon;
  const temperatureValue = weather.temp;
  const condition = weather.condition;
  const discomfortValue = weather.discomfort; // 불쾌지수 값 추가

  const hum = document.querySelector(".humidity-value");
  const icon = document.querySelector(".icon-temp img");
  icon.src = `./image/weather/${iconValue}.PNG`;
  const temp = document.querySelector(".temperature");
  const conditionText = document.querySelector(".weather-desc");
  const discomfortEl = document.querySelector(".discomfort-value");

  hum.textContent = `${humidityValue}%`;
  temp.textContent = `${Math.floor(temperatureValue)}°C`;
  conditionText.textContent = condition;
  discomfortEl.textContent = discomfortValue;
  discomfortEl.classList.remove("discomfort-low", "discomfort-high");

  if (discomfortValue < 70) {
    discomfortEl.classList.add("discomfort-low");
  } else {
    discomfortEl.classList.add("discomfort-high");
  }
}
