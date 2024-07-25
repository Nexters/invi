"use client";
import { Badge, Trash } from "lucide-react";
import React from "react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";
import { cn } from "~/lib/utils";

type Props = {
  element: EditorElement;
};

export default function Text(props: Props) {
  const { dispatch, editor } = useEditor();

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };
  const styles = props.element.styles;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  //WE ARE NOT ADDING DRAG DROP
  return (
    <div
      style={styles}
      className={cn(
        "relative m-[5px] w-full p-[2px] text-[16px] transition-all",
        {
          "!border-blue-500":
            editor.state.selectedElement.id === props.element.id,

          "!border-solid": editor.state.selectedElement.id === props.element.id,
          "border-[1px] border-dashed border-slate-300": !editor.state.liveMode,
        },
      )}
      onClick={handleOnClickBody}
    >
      {editor.state.selectedElement.id === props.element.id &&
        !editor.state.liveMode && (
          <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
            {editor.state.selectedElement.name}
          </Badge>
        )}
      <span
        className="outline-none"
        contentEditable={!editor.state.liveMode}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          });
        }}
      >
        {!Array.isArray(props.element.content) &&
          props.element.content.innerText}
      </span>
      {editor.state.selectedElement.id === props.element.id &&
        !editor.state.liveMode && (
          <div className="absolute -right-[1px] -top-[25px] rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-xs font-bold !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
}
