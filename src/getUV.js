export async function getUV(lat, lon) {
  const token = import.meta.env.VITE_OPENUV_API_KEY;

  const res = await fetch(
    `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  if (!res.ok) {
    console.error("❌ OpenUV 요청 실패:", res.status);
    return null;
  }

  const data = await res.json();
  console.log("OpenUV 데이터:", data);
  const uv = data.result.uv;
  const uv_max = data.result.uv_max;
  const uv_max_time = data.result.uv_max_time;

  const uvMaxTime = uv_max_time.split("T")[1].split(".")[0];
  const uvMaxDayRaw = uv_max_time.split("T")[0].split("-")[2];
  const uvMaxDay = uvMaxDayRaw.startsWith("0")
    ? uvMaxDayRaw.slice(1)
    : uvMaxDayRaw;

  const uvMaxHour = Number(uvMaxTime.split(":")[0]) + 9;
  const uvMaxMinute = uvMaxTime.split(":")[1];
  const uvMaxTimeFormatted = `${uvMaxHour}:${uvMaxMinute}`;

  const uvValue = document.querySelector(".UV-value");
  uvValue.textContent = Math.round(uv * 10) / 10;
  uvValue.style.color = UVValueColor(uv);

  const uvMaxDescription = document.querySelector(".UVMaxDesc");
  uvMaxDescription.textContent = `${uvMaxDay}일 최대 UV 지수: ${
    Math.round(uv_max * 10) / 10
  } (예상 시간: ${uvMaxTimeFormatted})`;
}

function UVValueColor(uv) {
  if (0 <= uv && uv < 3) {
    return "#2196f3"; // 파란색
  } else if (3 <= uv && uv < 6) {
    return "#4caf50"; // 초록색
  } else if (6 <= uv && uv < 8) {
    return "#ffd000"; // 노란색
  } else if (8 <= uv && uv < 10) {
    return "#f44336"; // 빨간색
  } else {
    return "#8B0000"; // 다크레드(검정에 가까운 붉은색)
  }
}
