"use client";

import { EyeOff } from "lucide-react";
import Recursive from "~/components/editor/elements/recursive";
import { useEditor } from "~/components/editor/provider";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function EditorMain() {
  const { dispatch, editor } = useEditor();

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };
  return (
    <div
      className={cn(
        "use-automation-zoom-in mr-[385px] h-full overflow-scroll rounded-md bg-background transition-all",
        {
          "!mr-0 !p-0":
            editor.state.previewMode === true || editor.state.liveMode === true,
          "!w-[850px]": editor.state.device === "Tablet",
          "!w-[420px]": editor.state.device === "Mobile",
          "w-full": editor.state.device === "Desktop",
        },
      )}
      onClick={handleClick}
    >
      {editor.state.previewMode && editor.state.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="fixed left-0 top-0 z-[100] h-6 w-6 bg-slate-600 p-[2px]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(editor.state.elements) &&
        editor.state.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
}
