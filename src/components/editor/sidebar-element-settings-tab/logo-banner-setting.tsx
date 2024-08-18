"use client";

import { HeightIcon } from "@radix-ui/react-icons";
import { useEditor } from "~/components/editor/provider";
import { EditorInput } from "~/components/editor/ui/input";

export default function LogoBannerSetting() {
  const { editor, dispatch } = useEditor();
  const { selectedElement } = editor.state;

  return (
    <div className="grid w-full grid-cols-9 gap-1 border-t p-6">
      <div className="col-span-9">
        <h4 className="text-sm font-medium">레이아웃 설정</h4>
      </div>
      <div className="col-span-4">
        <EditorInput
          id="height"
          defaultValue={selectedElement.styles.height}
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
          defaultValue={selectedElement.styles.color}
          onDebounceChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { color: e.target.value },
            })
          }
          componentPrefix={
            <div
              className="h-3.5 w-3.5 rounded ring-1 ring-border"
              style={{ background: selectedElement.styles.color }}
            />
          }
        />
      </div>
    </div>
  );
}
