import { findNearestStation } from "./airQuality.js";
import { getKoreanLocationName } from "./locationName.js";
import { getWeatherInfo } from "./weatherInfo.js";
import { getUV } from "./getUV.js";
import { updateLocationName } from "./location.js";
import { updateWeatherInfo } from "./updateWeatherInfo.js";
import { applyBackgroundTheme } from "./background.js";
import { createTooltip } from "./toolTip.js";

navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  console.log("사용자 위치:", userLat, userLon);

  const locationName = await getKoreanLocationName(userLat, userLon);
  const weather = await getWeatherInfo(userLat, userLon);
  const sunsetUnix = weather.sunset; // 날씨 정보에서 일몰 시간 가져오기
  const sunriseUnix = weather.sunrise; // 날씨 정보에서 일출 시간 가져오기

  createTooltip();
  applyBackgroundTheme(sunsetUnix, sunriseUnix);
  updateLocationName(locationName);
  updateWeatherInfo(weather);
  findNearestStation(userLat, userLon);
  getUV(userLat, userLon);
}

function error() {
  console.error("위치 정보를 불러오지 못했습니다.");
}
