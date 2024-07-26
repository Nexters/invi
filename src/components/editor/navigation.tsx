"use client";

import {
  ArrowLeftIcon,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useEditor } from "~/components/editor/provider";
import type { DeviceType } from "~/components/editor/type";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";

type Props = {
  backLink?: string;
};

export default function EditorNavigation({ backLink = "./" }: Props) {
  const { editor, dispatch } = useEditor();

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleOnSave = async () => {
    try {
      const content = JSON.stringify(editor.state.elements);
      console.log(":content", content);
      // TODO: API insert page
      // TODO: API log notification
      toast.success("Saved Editor");
    } catch (error) {
      console.error(error);
      toast.error("Oppse!", { description: "Could not save editor" });
    }
  };

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-2 border-b bg-background transition-all",
        editor.state.isPreviewMode ? "h-0 overflow-hidden p-0" : "p-6",
      )}
    >
      <aside className="flex items-center gap-6">
        <Button asChild variant="ghost" size="icon">
          <Link href={backLink}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <Tabs
          value={editor.state.device}
          onValueChange={(value) => {
            dispatch({
              type: "CHANGE_DEVICE",
              payload: { device: value as DeviceType },
            });
          }}
        >
          <TabsList>
            <TabsTrigger value="Desktop" className="h-10 w-10 p-0">
              <Laptop />
            </TabsTrigger>
            <TabsTrigger value="Tablet" className="h-10 w-10 p-0">
              <Tablet />
            </TabsTrigger>
            <TabsTrigger value="Mobile" className="h-10 w-10 p-0">
              <Smartphone />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>
      <aside className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePreviewClick}>
            <EyeIcon />
          </Button>
          <Button
            disabled={!(editor.history.currentIndex > 0)}
            onClick={handleUndo}
            variant="ghost"
            size="icon"
          >
            <Undo2 />
          </Button>
          <Button
            disabled={
              !(editor.history.currentIndex < editor.history.history.length - 1)
            }
            onClick={handleRedo}
            variant="ghost"
            size="icon"
          >
            <Redo2 />
          </Button>
        </div>
        <Button onClick={handleOnSave}>Save</Button>
      </aside>
    </nav>
  );
}
