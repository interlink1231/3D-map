"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import type { Viewer } from "cesium";

const KoreaMap = dynamic(() => import("@/components/KoreaMap"), { ssr: false, loading: () => <div style={{ color: "#c6d7ce", padding: 24 }}>3D 지도 엔진을 불러오는 중...</div> });

export default function Home() {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [layers, setLayers] = useState({ imagery: true, terrain: false, buildings: false, roads: false });
  const handleReady = useCallback((instance: Viewer) => setViewer(instance), []);

  function goHome() {
    if (!viewer) return;
    import("cesium").then(({ Cartesian3, Math: CesiumMath }) => viewer.camera.flyTo({ destination: Cartesian3.fromDegrees(127.8, 36.2, 1450000), orientation: { heading: 0, pitch: CesiumMath.toRadians(-65), roll: 0 }, duration: 1.4 }));
  }

  function toggleLayer(key: keyof typeof layers) {
    setLayers((current) => ({ ...current, [key]: !current[key] }));
  }

  return <main className="app-shell">
    <KoreaMap onReady={handleReady} />
    <header className="topbar">
      <div className="brand"><div className="brand-mark">K</div><div><div className="brand-name">KOREA 3D</div><div className="brand-sub">SPATIAL DIGITAL TWIN</div></div></div>
      <form className="search" onSubmit={(event) => { event.preventDefault(); const input = event.currentTarget.elements.namedItem("place") as HTMLInputElement; const query = input.value.trim(); if (query) alert("장소 검색은 다음 개발 단계에서 연결됩니다: " + query); }}><span>⌕</span><input name="place" placeholder="장소 또는 주소 검색" aria-label="장소 또는 주소 검색" /></form>
      <div className="status">● MAP ENGINE READY</div>
    </header>
    <aside className="tool-panel"><div className="panel-heading">지도 레이어</div>
      <label className="layer-row">기본 지도 <input type="checkbox" checked={layers.imagery} onChange={() => toggleLayer("imagery")} disabled /></label>
      <label className="layer-row">실제 지형 (DEM) <input type="checkbox" checked={layers.terrain} onChange={() => toggleLayer("terrain")} /></label>
      <label className="layer-row">3D 건물 <input type="checkbox" checked={layers.buildings} onChange={() => toggleLayer("buildings")} /></label>
      <label className="layer-row">도로 <input type="checkbox" checked={layers.roads} onChange={() => toggleLayer("roads")} /></label>
      <div style={{ color: "#81928a", fontSize: 10, lineHeight: 1.5, padding: "10px 5px 2px" }}>현재는 지도 엔진 초기 버전입니다. 실제 정사영상·DEM·건물 데이터는 검증 후 연결됩니다.</div>
    </aside>
    <nav className="map-actions" aria-label="지도 도구"><button title="대한민국 전체 보기" onClick={goHome}>⌂</button><button title="북쪽 정렬" onClick={() => viewer?.camera.setView({ orientation: { heading: 0, pitch: viewer.camera.pitch, roll: 0 } })}>N</button></nav>
    <footer className="bottom-info"><div className="data-note">BASEMAP · OpenStreetMap</div><div className="data-note">KOREA · 3D ENGINE PREVIEW</div></footer>
  </main>;
}
