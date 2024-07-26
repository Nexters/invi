"use client";

import React from "react";

import { nanoid } from "nanoid";
import { defaultStyles } from "~/components/editor/constant";
import Recursive from "~/components/editor/elements/recursive";
import { useEditor } from "~/components/editor/provider";
import type {
  EditorElement,
  EditorElementType,
} from "~/components/editor/type";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

type Props = {
  element: EditorElement;
};

export default function TwoColumns(props: Props) {
  const { id, content, type } = props.element;
  const { dispatch, editor } = useEditor();

  const isSelected = editor.state.selectedElement.id === props.element.id;

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData(
      "componentType",
    ) as EditorElementType;

    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Text Component" },
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
              content: [],
              id: nanoid(),
              name: "Two Columns",
              styles: { ...defaultStyles },
              type: "2Col",
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
        elementDetails: props.element,
      },
    });
  };

  return (
    <div
      style={props.element.styles}
      className={cn(
        "relative p-4 transition-all",
        type === "container" && "m-4 h-fit",
        (type === "container" || type === "2Col") && "w-full max-w-full",
        type === "2Col" && "flex flex-col md:!flex-row",
        !editor.state.isPreviewMode && [
          "border border-dashed border-border",
          isSelected && "border-solid border-primary",
        ],
      )}
      id="innerContainer"
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== "__body"}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
      {isSelected && !editor.state.isPreviewMode && (
        <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
          {editor.state.selectedElement.name}
        </Badge>
      )}
    </div>
  );
}
