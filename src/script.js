import { findNearestStation } from "./airQuality.js";
import { getKoreanLocationName } from "./locationName.js";
import { getWeatherInfo } from "./weatherInfo.js";
import { getUV } from "./getUV.js";
import { updateLocationName } from "./location.js";
import { updateWeatherInfo } from "./updateWeatherInfo.js";
navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  console.log("사용자 위치:", userLat, userLon);

  const locationName = await getKoreanLocationName(userLat, userLon);
  const weather = await getWeatherInfo(userLat, userLon);

  updateLocationName(locationName);
  updateWeatherInfo(weather);
  findNearestStation(userLat, userLon);
  getUV(userLat, userLon);
}

function error() {
  console.error("위치 정보를 불러오지 못했습니다.");
}
