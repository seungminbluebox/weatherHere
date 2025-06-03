import { findNearestStation } from "./airQuality.js";
import { setTheTime } from "./time.js";
import { getKoreanLocationName } from "./locationName.js";
import { getWeatherInfo } from "./weatherInfo.js";

navigator.geolocation.getCurrentPosition(success, error);

setTheTime();
setInterval(setTheTime, 1000);

async function success(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  console.log("사용자 위치:", userLat, userLon);

  const locationName = await getKoreanLocationName(userLat, userLon);
  const weather = await getWeatherInfo(userLat, userLon);
  console.log("위치 이름:", locationName);
  console.log("날씨 정보:", weather);

  findNearestStation(userLat, userLon);
}

function error() {
  console.error("위치 정보를 불러오지 못했습니다.");
}
