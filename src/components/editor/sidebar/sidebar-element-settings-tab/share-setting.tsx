"use client";

import { HeightIcon } from "@radix-ui/react-icons";
import { useEditor } from "~/components/editor/provider";
import { EditorInput } from "~/components/editor/ui/input";

export default function ShareSetting() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  return (
    <div className="space-y-1 border-t p-6 pt-4">
      <div className="flex h-10 items-center">
        <h4 className="text-sm font-medium">레이아웃 설정</h4>
      </div>

      <div className="grid w-full grid-cols-9 gap-1">
        <div className="col-span-4">
          <EditorInput
            id="height_input"
            defaultValue={element.styles.height}
            onDebounceChange={(e) =>
              dispatch({
                type: "UPDATE_ELEMENT_STYLE",
                payload: { height: e.target.value },
              })
            }
            componentPrefix={<HeightIcon />}
          />
        </div>
        <div className="col-span-4">
          <EditorInput
            id="color"
            defaultValue={element.styles.color ?? "transparent"}
            onDebounceChange={(e) => {
              dispatch({
                type: "UPDATE_ELEMENT_STYLE",
                payload: { color: e.target.value },
              });
            }}
            componentPrefix={
              <div
                className="h-3.5 w-3.5 rounded ring-1 ring-border"
                style={{ backgroundColor: element.styles.color }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
