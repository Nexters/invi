"use client";

import { nanoid } from "nanoid";
import React from "react";
import {
  containerDefaultStyles,
  kakaoMapDefaultStyles,
  textDefaultStyles,
} from "~/components/editor/constant";
import ElementWrapper from "~/components/editor/elements/element-wrapper";
import { useEditor } from "~/components/editor/provider";
import type {
  EditorElement,
  EditorElementType,
} from "~/components/editor/type";
import { cn } from "~/lib/utils";
import Recursive from "./recursive";

type Props = { element: EditorElement };

export default function Container({ element }: Props) {
  const { id, content, type } = element;
  const { editor, dispatch } = useEditor();
  const isRoot = type === "__body";

  const handleDragStart = (e: React.DragEvent) => {
    if (isRoot) return;
    e.dataTransfer.setData("componentType", "container");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation();

    const componentType = e.dataTransfer.getData(
      "componentType",
    ) as EditorElementType;

    switch (componentType) {
      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "container",
              id: nanoid(),
              name: "Container",
              styles: containerDefaultStyles,
              content: [],
            },
          },
        });
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "2Col",
              id: nanoid(),
              name: "Two Columns",
              styles: { ...containerDefaultStyles },
              content: [
                {
                  type: "container",
                  id: nanoid(),
                  name: "Container",
                  styles: { ...containerDefaultStyles, width: "100%" },
                  content: [],
                },
                {
                  type: "container",
                  id: nanoid(),
                  name: "Container",
                  styles: { ...containerDefaultStyles, width: "100%" },
                  content: [],
                },
              ],
            },
          },
        });
        break;
      case "blank":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "blank",
              id: nanoid(),
              name: "Blank",
              styles: {
                width: "100%",
                height: "100px",
              },
              content: [],
            },
          },
        });
        break;
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "text",
              id: nanoid(),
              name: "Text",
              styles: textDefaultStyles,
              content: { innerText: "여기에 내용을 입력하세요." },
            },
          },
        });
        break;
      case "image":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "image",
              id: nanoid(),
              name: "Image",
              styles: {
                width: "100%",
                height: "auto",
              },
              content: {
                src: "",
                alt: "이미지",
              },
            },
          },
        });
        break;
      case "kakaoMap":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                location: {
                  latitude: 37.566828,
                  longitude: 126.9786567,
                },
                address: "서울 중구 세종대로 110 서울특별시청",
                isMapUse: true,
                isShareUse: true,
              },
              id: nanoid(),
              name: "KaKao Map",
              styles: kakaoMapDefaultStyles,
              type: "kakaoMap",
            },
          },
        });
        break;
      case "navigation":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "navigation",
              id: nanoid(),
              name: "navigation",
              styles: {
                ...containerDefaultStyles,
              },
              content: {
                address: "",
              },
            },
          },
        });
        break;
      case "logoBanner":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "logoBanner",
              id: nanoid(),
              name: "logoBanner",
              styles: {
                height: 69,
                color: "#22222250",
              },
              content: {},
            },
          },
        });
        break;
    }
  };

  return (
    <ElementWrapper
      element={element}
      className={cn(
        "h-fit w-full max-w-full",
        isRoot && "min-h-full",
        !isRoot &&
          !editor.state.isPreviewMode &&
          "ring-1 ring-muted hover:ring-border",
      )}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </ElementWrapper>
  );
}
