"use client";

import { useEditor } from "~/components/editor/provider";
import { IconInput } from "~/components/editor/ui/input";

export default function BackgroundSetting() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  return (
    <div className="space-y-1 border-t p-6 pt-4">
      <div className="flex h-10 items-center">
        <h4 className="text-sm font-medium">백그라운드 설정</h4>
      </div>
      <div className="grid">
        <div className="col-span-4">
          <IconInput
            id="backgroundColor"
            value={element.styles.backgroundColor ?? "transparent"}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_ELEMENT_STYLE",
                payload: { backgroundColor: e.target.value },
              });
            }}
            icon={
              <div
                className="h-3.5 w-3.5 rounded ring-1 ring-border"
                style={{ backgroundColor: element.styles.backgroundColor }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
