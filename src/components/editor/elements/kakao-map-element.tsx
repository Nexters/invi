"use client";

import { Badge, Trash } from "lucide-react";
import React, { useEffect, useRef } from "react";
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
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const elementContent = element.content as { location?: [number, number] };

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      const center = new window.kakao.maps.LatLng(
        latitude ?? elementContent.location![0],
        longitude ?? elementContent.location![1],
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
        elementContent.location![0],
        elementContent.location![1],
      );
      mapInstanceRef.current.setCenter(newCenter);

      if (addCenterPin && markerRef.current) {
        markerRef.current.setPosition(newCenter);
      }
    }
  }, [editor.state.selectedElement]);

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: element },
    });
  };

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
          <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
            {editor.state.selectedElement.name}
          </Badge>
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
