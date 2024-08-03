"use client";

import { Trash } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useKakaoAddress } from "~/components/editor/elements/kakao-map-context";
import KakaoMapSetLocationButton from "~/components/editor/elements/kakao-map-set-location-button";
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
  addCenterPin = true,
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
    console.log(element);
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
    <div className={"relative h-[250px] w-full"}>
      {isSelected && !editor.state.isPreviewMode && (
        <>
          <div className="-left[0px] absolute -top-[42px] z-50 rounded-none rounded-t-lg">
            <KakaoMapSetLocationButton />
          </div>
          <div className="absolute -right-[1px] -top-[25px] z-50 rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        </>
      )}
      <div style={{ height: "250px" }} onClick={handleOnClickBody}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
