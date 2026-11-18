# PROJECT KOREA 3D

대한민국 전체를 실제 항공·위성 정사영상, DEM 지형, 3D 건물 데이터로 표현하는 웹 기반 3D 지도 프로젝트입니다.

## Tech Stack

- Next.js 15 / React 19 / TypeScript
- CesiumJS
- Cesium Terrain / 3D Tiles (데이터 연결 단계에서 적용)
- PostgreSQL + PostGIS (후속 단계)

## Development

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## Environment Variables

필요한 경우 프로젝트 루트에 `.env.local`을 만들고 Cesium ion 토큰을 설정합니다.

```env
NEXT_PUBLIC_CESIUM_ION_TOKEN=
```

토큰이 없어도 초기 화면은 OpenStreetMap 기반으로 실행됩니다. 이 초기 기본 지도는 위성사진이 아니며, 실제 정사영상·DEM·건물 데이터는 출처와 이용 허가를 확인한 뒤 별도 연결합니다.

## Current Status

- [x] Next.js / TypeScript 초기 구조
- [x] CesiumJS 지도 엔진 연결
- [x] 대한민국 중심 카메라
- [x] 기본 지도 UI
- [ ] 실제 전국 정사영상
- [ ] DEM 지형 타일
- [ ] 3D 건물 타일
- [ ] 장소 검색 및 레이어 실제 제어

## Data Policy

각 데이터의 촬영 시기, 해상도, 출처, 라이선스, 재배포 허용 여부를 확인하고 표시합니다. 데이터가 없는 지역을 실제 촬영 데이터인 것처럼 합성하거나 표시하지 않습니다.
