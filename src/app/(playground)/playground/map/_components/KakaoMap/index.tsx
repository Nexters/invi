"use client";

import { useEffect, useRef } from "react";
import { useKakaoAddress } from "~/app/(playground)/playground/map/_store/KakaoAdressStore";

interface KakaoMapProps {
  width: string;
  height: string;
  level?: number;
  addCenterPin?: boolean;
  latitude?: number;
  longitude?: number;
}

export default function KakaoMap({
  width,
  height,
  level = 3,
  addCenterPin = false,
  latitude,
  longitude,
}: KakaoMapProps) {
  const { coordinate } = useKakaoAddress();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initializeMap = () => {
    if (!mapRef.current) return;

    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(
        latitude ?? coordinate.latitude,
        longitude ?? coordinate.longitude,
      );
      const map = new window.kakao.maps.Map(mapRef.current as HTMLElement, {
        center,
        level,
      });

      if (addCenterPin) {
        new window.kakao.maps.Marker({ position: center }).setMap(map);
      }
    });
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    }
  }, [coordinate]);

  return (
    <div style={{ width, height }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
