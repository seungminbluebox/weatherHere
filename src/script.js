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

  document.querySelector("#loading-screen").style.display = "none";
  document.querySelector("#app-content").style.display = "block";
}

function error() {
  console.error("위치 정보를 불러오지 못했습니다.");

  const loading = document.querySelector("#loading-screen");
  const appContent = document.querySelector("#app-content");
  const app = document.querySelector("#app"); // app 루트가 있다면 사용

  if (loading) loading.style.display = "none";
  if (appContent) appContent.style.display = "block";

  if (app) {
    app.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-size: 1.2rem;">
        <p>📍 위치 정보가 차단되었습니다.</p>
        <p>서비스 이용을 위해 위치 접근을 허용 후 새로고침 해주세요</p>
        <p style="margin-top: 1rem; color: gray; font-size: 0.9rem;">
          브라우저 설정 또는 페이지 새로고침 후 위치 접근을 허용하면<br />
          현재 위치 기반의 날씨, 대기질, 자외선 정보를 확인할 수 있습니다.
        </p>
      </div>
    `;
  }
  if (app) app.style.display = "block";
}
