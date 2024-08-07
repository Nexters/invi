"use client";

import { useMutation } from "@tanstack/react-query";
import { debounce, delay, random } from "es-toolkit";
import { CheckIcon, LoaderIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

export default function TitleInput() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    if (!value) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    mutation.mutate({
      value: event.target.value.trim(),
      signal: abortControllerRef.current.signal,
    });
  };

  const mutation = useMutation({
    mutationFn: async ({
      value,
      signal,
    }: {
      value: string;
      signal: AbortSignal;
    }) => {
      await delay(1000);

      if (signal.aborted) {
        return;
      }

      if (random(0, 1) > 0.5) {
        throw new Error("Failed to update title");
      }

      delayMutation.mutate();
    },
    onError: () => {
      toast.error("제목 수정에 오류가 발생되었습니다.", {
        position: "bottom-left",
      });
    },
  });

  const delayMutation = useMutation({
    mutationFn: () => {
      return delay(1000);
    },
  });

  return (
    <div
      className={cn(
        "relative rounded-md px-2 transition ease-in-out focus-within:bg-secondary",
        mutation.isError && "focus-within:bg-red-50",
      )}
    >
      <div className="flex items-center border-b transition focus-within:border-transparent">
        <input
          defaultValue={"제목 없음"}
          onChange={debounce(handleTitleInput, 300)}
          placeholder="제목을 입력해주세요."
          className="h-9 w-full bg-transparent pl-1 pr-5 pt-0.5 text-lg font-medium placeholder:text-muted-foreground focus-visible:outline-none"
        />
        <div
          className={cn(
            "pointer-events-none absolute right-2 opacity-0 transition",
            (mutation.isError ||
              mutation.isPending ||
              delayMutation.isPending) &&
              "opacity-100",
          )}
        >
          {mutation.isPending ? (
            <LoaderIcon className="h-3 w-3 animate-spin" />
          ) : mutation.isSuccess ? (
            <CheckIcon className="h-3.5 w-3.5" />
          ) : (
            <XIcon className="h-3.5 w-3.5 text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}
