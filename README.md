# 🌤️ weatherHere

사용자 현재 위치를 기반으로 **실시간 날씨, 미세먼지, 자외선 지수**를 시각적으로 제공하는 웹 애플리케이션입니다.  
시간대에 따라 배경이 동적으로 바뀌며, 수치별 위험도를 한눈에 파악할 수 있는 정보 툴팁을 제공합니다.

<br/>

## 🛠️ 사용 기술 스택

| 구분     | 기술                                                                  |
| -------- | --------------------------------------------------------------------- |
| Frontend | HTML5, CSS3, JavaScript (Vanilla)                                     |
| API 연동 | navigator.geolocation, Kakao Local API, AirKorea Open API, WeatherAPI |
| UI       | 반응형 레이아웃, 다크모드, 시간대 기반 배경 전환, 정보 툴팁           |
| 배포     | AWS S3 + CloudFront (정적 웹사이트 호스팅)                            |

<br/>

## ✨ 주요 기능

- **📍 위치 자동 감지**: `navigator.geolocation`으로 사용자 위치를 자동 감지
- **🏙️ 측정소 자동 매핑**: Kakao API를 통해 위치를 주소로 변환, 근처 측정소 검색
- **🌫️ 대기질 시각화**: 에어코리아 API로 PM10, PM2.5 실시간 수치 표시
- **🌞 자외선 지수 제공**: WeatherAPI를 통해 UV Index 제공
- **🌗 시간대 테마 적용**: 현재 시각에 따라 배경 테마 자동 변경 (아침/저녁/밤)
- **🧾 수치 해석 툴팁**: 정보 아이콘 클릭 시 각 수치의 의미와 권장 행동을 툴팁으로 안내
- **📱 반응형 웹**: 모바일/태블릿/데스크톱 모두 대응

<br/>

## 🌐 사용 API 목록

| API                           | 설명                              |
| ----------------------------- | --------------------------------- |
| navigator.geolocation         | 사용자의 위도/경도 좌표 수집      |
| Kakao Local API               | 위도/경도를 행정동 주소로 변환    |
| AirKorea OpenAPI (에어코리아) | 측정소 목록 및 실시간 대기질 정보 |
| WeatherAPI.com                | 자외선(UV) 지수 실시간 수집       |

<br/>

## 🚀 배포 방식

1. `npm run build`로 정적 파일 생성 (Vite 기반 프로젝트)
2. AWS S3 버킷에 `dist/` 파일 업로드
3. AWS CloudFront를 이용해 CDN 구성 및 도메인 연결
4. `aws cloudfront create-invalidation` 명령으로 캐시 무효화 처리
