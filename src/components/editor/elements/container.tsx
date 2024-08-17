"use client";

import { nanoid } from "nanoid";
import React from "react";
import {
  containerDefaultStyles,
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
                src: "https://private-user-images.githubusercontent.com/47740690/352552322-aea7c5d9-bb8b-4895-9aa8-2552154ba8d4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM4OTE1NjksIm5iZiI6MTcyMzg5MTI2OSwicGF0aCI6Ii80Nzc0MDY5MC8zNTI1NTIzMjItYWVhN2M1ZDktYmI4Yi00ODk1LTlhYTgtMjU1MjE1NGJhOGQ0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDEwNDEwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY4MWI1ZGFhN2U1NmQ2ZDRjZTE2ZTNlZDIwMDcyMTdiNGI3ODJiODRmY2Y0OWE5OGI5MmEzODkyZDQ0YjZmZWEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.d2f0p1PPlHK-Vyqpc0x_-8cuBeKVqyiRcUpnhAaEgX8",
              },
            },
          },
        });
        break;
      case "map":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              type: "map",
              id: nanoid(),
              name: "map",
              styles: {
                color: "black",
                ...containerDefaultStyles,
              },
              content: {
                address: "",
              },
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
        isRoot && "h-full overflow-y-auto",
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
