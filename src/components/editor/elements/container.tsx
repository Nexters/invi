"use client";
import { Trash } from "lucide-react";
import { nanoid } from "nanoid";
import React from "react";
import { defaultStyles } from "~/components/editor/constant";
import { useEditor } from "~/components/editor/provider";
import type {
  EditorElement,
  EditorElementType,
} from "~/components/editor/type";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import Recursive from "./recursive";

type Props = { element: EditorElement };

export default function Container({ element }: Props) {
  const { id, content, name, styles, type } = element;
  const {
    editor: {
      state: { isPreviewMode, selectedElement },
    },
    dispatch,
  } = useEditor();
  const isRoot = type === "__body";
  const isSelected = selectedElement.id === id;

  const handleOnDrop = (e: React.DragEvent, type: string) => {
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
              content: [],
              id: nanoid(),
              name: "Container",
              styles: { ...defaultStyles },
              type: "container",
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
              content: [
                {
                  content: [],
                  id: nanoid(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: nanoid(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: nanoid(),
              name: "Two Columns",
              styles: { ...defaultStyles, display: "flex" },
              type: "2Col",
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
              content: { innerText: "Text Element" },
              id: nanoid(),
              name: "Text",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "text",
            },
          },
        });
        break;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
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

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      style={styles}
      className={cn(
        "group relative p-4 transition-all",
        isRoot && "h-full overflow-visible",
        type === "container" && "h-fit",
        (type === "container" || type === "2Col") && "w-full max-w-full",
        type === "2Col" && "flex flex-col md:!flex-row",
        !isPreviewMode && [
          "border border-dashed border-border",
          (isSelected || isRoot) && "border-solid",
          isSelected && !isRoot && "border-primary",
        ],
      )}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragStart={(e) => handleDragStart(e, "container")}
      onDragOver={handleDragOver}
      draggable={!isRoot}
      onClick={handleOnClickBody}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {!isPreviewMode && isSelected && !isRoot && (
        <>
          <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
            {element.name}
          </Badge>
          <div className="absolute -right-[1px] -top-[25px] rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-white">
            <Trash
              size={16}
              className="cursor-pointer"
              onClick={handleDeleteElement}
            />
          </div>
        </>
      )}
    </div>
  );
}
