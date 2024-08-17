"use client";

import { EyeOff } from "lucide-react";
import ElementHelper from "~/components/editor/elements/element-helper";
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
  };

  return (
    <div
      className="flex flex-1 items-center justify-center"
      onClick={handleClick}
    >
      <div
        id="editor-main"
        className={cn(
          "ml-[10px] mr-[392px] animate-zoom-in bg-background transition-all",
          editor.state.isPreviewMode && "m-0 overflow-hidden p-0",
          editor.state.device === "Desktop" && "h-full w-full",
          editor.state.device === "Tablet" && "h-full w-[850px]",
          editor.state.device === "Mobile" && "h-[800px] w-[420px]",
        )}
      >
        {editor.state.isPreviewMode && (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="fixed left-0 top-0 z-[100] h-6 w-6 p-[2px]"
            onClick={handleUnpreview}
          >
            <EyeOff />
          </Button>
        )}
        {Array.isArray(editor.data) &&
          editor.data.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>
      <ElementHelper />
    </div>
  );
}
