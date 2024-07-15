"use client"

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function KaKaoMapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initializeMap = () => {
    if (!mapRef.current) return;

    window.kakao.maps.load(() => {
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      new window.kakao.maps.Map(mapRef.current, mapOption);
    });
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        onLoad={initializeMap}
      />
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <div ref={mapRef} className={'w-full h-full'} ></div>
      </div>
    </>
  )
}