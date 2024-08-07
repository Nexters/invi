"use client";

import { useMutation } from "@tanstack/react-query";
import { debounce, delay } from "es-toolkit";
import {
  ArrowLeftIcon,
  CheckIcon,
  DownloadIcon,
  EyeIcon,
  Laptop,
  LoaderIcon,
  Redo2,
  Share2Icon,
  Smartphone,
  Tablet,
  Undo2,
  XIcon,
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
        <TitleInput />
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
      <aside className="flex items-center gap-4">
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
        <Button variant="secondary" onClick={handleOnSave} className="gap-1">
          <DownloadIcon className="h-4 w-4" /> 저장
        </Button>
        <Button onClick={handleOnSave} className="gap-1">
          <Share2Icon className="h-4 w-4" /> 공유
        </Button>
      </aside>
    </nav>
  );
}

function TitleInput() {
  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    if (!value) {
      return;
    }

    mutation.mutate(event.target.value.trim());
  };

  const mutation = useMutation({
    mutationFn: async (value: string) => {
      await delay(1000);
      // throw new Error("Failed to update title");
    },
    onError: () => {
      toast.error("제목 수정에 실패했습니다.", {
        description: "잠시 후 다시 시도해주세요.",
      });
    },
    onSettled: () => {
      delayMutation.mutate();
    },
  });

  const delayMutation = useMutation({
    mutationFn: () => {
      return delay(700);
    },
  });

  return (
    <div className="relative rounded-md px-2 transition ease-in-out focus-within:bg-secondary">
      <div className="flex items-center border-b">
        <input
          defaultValue={"제목 없음"}
          onChange={debounce(handleTitleInput, 300)}
          placeholder="제목을 입력해주세요."
          className="h-9 w-full bg-transparent pl-1 pr-5 pt-0.5 text-lg font-medium placeholder:text-muted-foreground focus-visible:outline-none"
        />
        <LoaderIcon
          className={cn(
            "pointer-events-none absolute right-2 h-3 w-3 animate-spin opacity-0 transition",
            mutation.isPending && "opacity-100",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute right-2 opacity-0 transition",
            !mutation.isPending && delayMutation.isPending && "opacity-100",
          )}
        >
          {mutation.isSuccess ? (
            <CheckIcon className="h-3.5 w-3.5" />
          ) : (
            <XIcon className="h-3.5 w-3.5" />
          )}
        </div>
      </div>
    </div>
  );
}
