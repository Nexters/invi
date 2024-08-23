"use client";

import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";
import { EditorInput } from "~/components/editor/ui/input";

export default function AccordionSetting() {
  const { editor, dispatch } = useEditor();
  const element = editor.state
    .selectedElement as InferEditorElement<"accordion">;

  const update = (
    content: Partial<InferEditorElement<"accordion">["content"]>,
  ) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            ...content,
          },
        },
      },
    });
  };

  return (
    <div className="w-full grid-cols-9 gap-1 gap-y-2 border-t p-6">
      <div>
        <EditorInput
          id="triggerText"
          defaultValue={element.content.triggerText}
          onDebounceChange={(e) => {
            if (!e.target.value) {
              return;
            }

            update({
              triggerText: e.target.value,
            });
          }}
          componentPrefix={<span className="text-xs">제목</span>}
        />
      </div>
      <div className="col-span-9">
        <EditorInput
          id="triggerColor"
          defaultValue={element.content.triggerStyle?.color ?? "inherit"}
          onDebounceChange={(e) => {
            update({
              triggerStyle: {
                ...element.content.triggerStyle,
                color: e.target.value,
              },
            });
          }}
          componentPrefix={
            <div className="flex items-center gap-2">
              <span className="text-xs">제목 색상</span>
              <div
                className="h-3.5 w-3.5 rounded ring-1 ring-border"
                style={{
                  backgroundColor: element.content.triggerStyle?.color,
                }}
              />
            </div>
          }
        />
      </div>
      <div className="col-span-9">
        <EditorInput
          id="containerBackgroundColor"
          defaultValue={
            element.content.containerStyle?.backgroundColor ?? "transparent"
          }
          onDebounceChange={(e) => {
            update({
              containerStyle: {
                ...element.content.containerStyle,
                backgroundColor: e.target.value,
              },
            });
          }}
          componentPrefix={
            <div className="flex items-center gap-2">
              <span className="text-xs">배경 색상</span>
              <div
                className="h-3.5 w-3.5 rounded ring-1 ring-border"
                style={{
                  backgroundColor:
                    element.content.containerStyle?.backgroundColor,
                }}
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
