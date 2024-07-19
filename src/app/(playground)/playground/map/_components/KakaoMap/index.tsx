"use client"

import { useRef, useEffect } from "react";
import Script from "next/script";
import { Coordinate, useKakaoAddress } from "~/app/(playground)/playground/map/_store/KakaoAdressStore";

interface KakaoMapProps {
  width: string;
  height: string;
  level?: number;
  addCenterPin?: boolean;
}

export default function KakaoMap({
                                   width,
                                   height,
                                   level = 3,
                                   addCenterPin = false
                                 }: KakaoMapProps) {
  const { coordinate, setCoordinate } = useKakaoAddress();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initializeMap = () => {
    if (!mapRef.current) return;

    window.kakao.maps.load(() => {
      const { latitude, longitude }: Coordinate = coordinate
      const center = new window.kakao.maps.LatLng(latitude, longitude);
      const mapOption = {
        center: center,
        level: level,
      };
      const map = new window.kakao.maps.Map(mapRef.current as HTMLElement, mapOption);

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
  }, [level, addCenterPin, coordinate]);

  return (
    <div style={{ width, height }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}