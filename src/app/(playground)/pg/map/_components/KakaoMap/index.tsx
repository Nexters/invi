"use client";

import { useEffect, useRef } from "react";
import { useKakaoAddress } from "~/app/(playground)/pg/map/_components/KakaoAddressContext";

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
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      const center = new window.kakao.maps.LatLng(
        latitude ?? coordinate.latitude,
        longitude ?? coordinate.longitude,
      );

      const mapInstance = new window.kakao.maps.Map(
        mapRef.current as HTMLElement,
        {
          center,
          level,
        },
      );

      mapInstanceRef.current = mapInstance;

      if (addCenterPin) {
        const marker = new window.kakao.maps.Marker({ position: center });
        marker.setMap(mapInstance);
        markerRef.current = marker;
      }
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initializeMap);
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      const newCenter = new window.kakao.maps.LatLng(
        latitude ?? coordinate.latitude,
        longitude ?? coordinate.longitude,
      );
      mapInstanceRef.current.setCenter(newCenter);

      if (addCenterPin && markerRef.current) {
        markerRef.current.setPosition(newCenter);
      }
    }
  }, [coordinate]);

  return (
    <div style={{ width, height }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
