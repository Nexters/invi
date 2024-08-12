"use client";

import { nanoid } from "nanoid";
import React from "react";
import { defaultStyles } from "~/components/editor/constant";
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
  const { dispatch } = useEditor();
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
              styles: { ...defaultStyles, display: "flex", gap: 10 },
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
              styles: { ...defaultStyles, display: "flex" },
              content: [
                {
                  type: "container",
                  id: nanoid(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  content: [],
                },
                {
                  type: "container",
                  id: nanoid(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
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
              styles: {
                color: "black",
                ...defaultStyles,
              },
              content: { innerText: "Text Element" },
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
                ...defaultStyles,
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
        "group relative h-fit w-full max-w-full p-4 transition-all",
        isRoot && "h-full overflow-visible",
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
