"use client";

import React, { useEffect, useRef } from "react";
import { useKakaoAddress } from "~/components/editor/elements/elements/kakao-map/kakao-map-context";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";

type Props = {
  element: EditorElement;
  level?: number;
  addCenterPin?: boolean;
  latitude?: number;
  longitude?: number;
};
export default function KakaoMapElement({
  element,
  level,
  addCenterPin,
  latitude,
  longitude,
}: Props) {
  const { dispatch, editor } = useEditor();
  const isSelected = editor.state.selectedElement.id === element.id;

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

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: element },
    });
  };
  const styles = element.styles;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  //WE ARE NOT ADDING DRAG DROP
  return (
    <div style={{ height: "250px" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
