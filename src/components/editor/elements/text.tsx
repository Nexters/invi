"use client";
import { Trash } from "lucide-react";
import React from "react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

type Props = {
  element: EditorElement;
};

export default function Text({ element }: Props) {
  const { dispatch, editor } = useEditor();
  const isSelected = editor.state.selectedElement.id === element.id;

  console.log("texst", editor.state.selectedElement);

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
    <div
      style={styles}
      className={cn(
        "relative w-full p-[5px] text-[16px] transition-all",
        !editor.state.isPreviewMode && [
          "border-[1px] border-dashed border-border",
          isSelected && "border-solid border-primary",
        ],
      )}
      onClick={handleOnClickBody}
    >
      <span
        className="outline-none"
        contentEditable={!editor.state.isPreviewMode}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          });
        }}
      >
        {!Array.isArray(element.content) && element.content.innerText}
      </span>

      {isSelected && !editor.state.isPreviewMode && (
        <>
          <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
            {editor.state.selectedElement.name}
          </Badge>
          <div className="absolute -right-[1px] -top-[25px] rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        </>
      )}
    </div>
  );
}
