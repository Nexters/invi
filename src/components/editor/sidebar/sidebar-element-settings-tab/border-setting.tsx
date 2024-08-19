"use client";

import { useEditor } from "~/components/editor/provider";
import { Slider } from "~/components/ui/slider";

export default function BorderSetting() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;
  const borderRadius = element.styles.borderRadius ?? "0";

  return (
    <div className="space-y-1 border-t p-6 pb-8 pt-4">
      <div className="flex h-10 items-center">
        <h4 className="text-sm font-medium">테두리 설정</h4>
      </div>
      <div>
        <div className="flex items-center justify-end">
          <small className="">
            {typeof borderRadius === "number"
              ? borderRadius
              : parseFloat(borderRadius.replace("px", ""))}
            px
          </small>
        </div>
        <Slider
          step={1}
          max={100}
          defaultValue={[
            typeof borderRadius === "number"
              ? borderRadius
              : parseFloat(borderRadius.replace("%", "")),
          ]}
          onValueChange={(e) => {
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: {
                borderRadius: `${e[0]}px`,
              },
            });
          }}
        />
      </div>
    </div>
  );
}
