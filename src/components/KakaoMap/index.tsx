"use client"

import { useRef, useEffect } from "react";
import Script from "next/script";

interface KakaoMapProps {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  level?: number;
  addCenterPin?: boolean;
}

export default function KakaoMap({
                                   width,
                                   height,
                                   latitude,
                                   longitude,
                                   level = 3,
                                   addCenterPin = false
                                 }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initializeMap = () => {
    if (!mapRef.current) return;

    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(latitude, longitude);
      const mapOption = {
        center: center,
        level: level,
      };
      const map = new window.kakao.maps.Map(mapRef.current, mapOption);

      if (addCenterPin) {
        const marker = new window.kakao.maps.Marker({
          position: center
        });
        marker.setMap(map);
      }
    });
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    }
  }, [latitude, longitude, level, addCenterPin]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        onLoad={initializeMap}
      />
      <div style={{ width, height }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  )
}