export async function getKoreanLocationName(lat, lon) {
  const kakaoKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${kakaoKey}`,
    },
  });

  if (!res.ok) {
    console.error("❌ Kakao API 요청 실패:", res.status);
    return "위치 정보 오류";
  }

  const data = await res.json();
  const region = data?.documents?.[0];

  const regionName = region.region_3depth_name
    ? region.region_3depth_name
    : region.region_2depth_name || "알 수 없음";

  return regionName;
}
