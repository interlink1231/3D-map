"use client";

import { useEffect, useRef } from "react";
import type { Viewer as CesiumViewer } from "cesium";

type Props = { onReady?: (viewer: CesiumViewer) => void };

export default function KoreaMap({ onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<CesiumViewer | null>(null);

  useEffect(() => {
    let cancelled = false;
    let localViewer: CesiumViewer | undefined;

    async function initialize() {
      (window as Window & { CESIUM_BASE_URL?: string }).CESIUM_BASE_URL = "/cesium/";
      const Cesium = await import("cesium");
      if (cancelled || !containerRef.current) return;
      if (process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN) {
        Cesium.Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN;
      }

      localViewer = new Cesium.Viewer(containerRef.current, {
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        shouldAnimate: false,
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        imageryProvider: new Cesium.OpenStreetMapImageryProvider({ url: "https://tile.openstreetmap.org/" }),
      });

      localViewer.scene.globe.depthTestAgainstTerrain = true;
      localViewer.scene.globe.enableLighting = true;
      localViewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(127.8, 36.2, 1450000),
        orientation: { heading: Cesium.Math.toRadians(0), pitch: Cesium.Math.toRadians(-65), roll: 0 },
      });
      viewerRef.current = localViewer;
      onReady?.(localViewer);
    }

    initialize().catch((error) => console.error("Cesium initialization failed:", error));
    return () => { cancelled = true; localViewer?.destroy(); viewerRef.current = null; };
  }, [onReady]);

  return <div ref={containerRef} className="map-canvas" aria-label="대한민국 3D 지도" />;
}
