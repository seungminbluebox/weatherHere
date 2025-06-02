import { findNearestStation } from "./airQuality.js";
import { setTheTime } from "./time.js";
navigator.geolocation.getCurrentPosition(success, error);

setTheTime();
setInterval(setTheTime, 1000);

function success(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  console.log("사용자 위치:", userLat, userLon);
  findNearestStation(userLat, userLon);
}

function error() {
  console.error("위치 정보를 불러오지 못했습니다.");
}
