"use client";

import { useEffect, useRef } from "react";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"kakaoMap">;
  level?: number;
  addCenterPin?: boolean;
  latitude?: number;
  longitude?: number;
};
export default function KakaoMapElement({
  element,
  level,
  addCenterPin = true,
  latitude,
  longitude,
}: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const elementContent = element.content;

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      const center = new window.kakao.maps.LatLng(
        latitude ?? elementContent.location.latitude,
        longitude ?? elementContent.location.longitude,
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
  }, [
    addCenterPin,
    elementContent.location.latitude,
    elementContent.location.longitude,
    latitude,
    level,
    longitude,
  ]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      const newCenter = new window.kakao.maps.LatLng(
        elementContent.location.latitude,
        elementContent.location.longitude,
      );
      mapInstanceRef.current.setCenter(newCenter);

      if (addCenterPin && markerRef.current) {
        markerRef.current.setPosition(newCenter);
      }
    }
  }, [
    addCenterPin,
    elementContent.location.latitude,
    elementContent.location.longitude,
  ]);

  return (
    <div className={"relative h-[250px] w-full"}>
      <div style={{ height: "250px" }}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
