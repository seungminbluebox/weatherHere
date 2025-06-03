import { stationList } from "./stationList.js";

const apiKey = import.meta.env.VITE_AIRKOREA_API_KEY;

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 측정소 리스트에서 가장 가까운 측정소 찾기
export function findNearestStation(userLat, userLon) {
  let nearestStation = stationList[0];
  let minDistance = getDistance(
    userLat,
    userLon,
    stationList[0].dmY, // ✅ 위도
    stationList[0].dmX // ✅ 경도
  );

  for (let i = 1; i < stationList.length; i++) {
    const station = stationList[i];
    const dist = getDistance(userLat, userLon, station.dmY, station.dmX);
    if (dist < minDistance) {
      minDistance = dist;
      nearestStation = station;
    }
  }
  // console.log(
  //   "가장 가까운 측정소:",
  //   nearestStation.name,
  //   "거리:",
  //   minDistance.toFixed(2),
  //   "km"
  // );
  fetchStationData(nearestStation.name, minDistance.toFixed(2));
}

// 측정소 이름으로 실시간 미세먼지 데이터 요청
function fetchStationData(stationName, distance) {
  const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&dataTerm=month&pageNo=1&numOfRows=100&returnType=json&serviceKey=${apiKey}&ver=1.5`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const items = data.response.body.items;
      if (!items || items.length === 0) {
        console.error("측정소 데이터를 찾을 수 없습니다.");
        return;
      }
      const item = items[0];
      const pm10 = Number(item.pm10Value);
      const pm25 = Number(item.pm25Value);
      const stationName = item.stationName;

      updateUI(pm10, pm25, stationName, distance);
    })
    .catch((err) => {
      console.error("데이터 요청 실패:", err);
    });
}

function updateUI(pm10, pm25, locationName, distance) {
  const pm10El = document.querySelectorAll(".pm-value")[0];
  const pm25El = document.querySelectorAll(".pm-value")[1];
  const locationEl = document.querySelector("#station-name");
  const distanceEl = document.querySelector("#far-from-station");

  pm10El.innerHTML = `${pm10}<span id="pm-value-unit">μg/m³</span>`;
  pm25El.innerHTML = `${pm25}<span id="pm-value-unit">μg/m³</span>`;

  distanceEl.innerHTML = `가장 가까운 측정소까지 ${distance}km`;
  locationEl.innerHTML = `(${locationName})`;

  pm10El.style.color = getColorByPM10(pm10);
  pm25El.style.color = getColorByPM25(pm25);

  const arrow10 = document.querySelectorAll(".arrow")[0];
  const arrow25 = document.querySelectorAll(".arrow")[1];

  moveArrowToPM(arrow10, pm10, 0, 150); // PM10 최대 기준
  if (pm25 !== null) {
    moveArrowToPM(arrow25, pm25, 0, 75); // PM2.5 최대 기준
  } else {
    arrow25.style.left = "-1000px"; // 숨김
  }
}

function moveArrowToPM(arrowElement, value, min, max) {
  const bar = arrowElement.nextElementSibling; // .pm-bar
  const barWidth = bar.getBoundingClientRect().width;

  const clamped = Math.max(min, Math.min(value, max));
  const ratio = (clamped - min) / (max - min);
  const px = ratio * barWidth;

  arrowElement.style.position = "absolute";
  arrowElement.style.left = `${px}px`;
}

function getColorByPM10(pm) {
  if (pm <= 30) return "#2196f3";
  if (pm <= 80) return "#4caf50";
  if (pm <= 150) return "#ffeb3b";
  return "#f44336";
}
function getColorByPM25(pm) {
  if (pm <= 15) return "#2196f3";
  if (pm <= 35) return "#4caf50";
  if (pm <= 75) return "#ffeb3b";
  return "#f44336";
}
