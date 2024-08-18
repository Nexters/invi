"use client";

import { useCallback } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { toast } from "sonner";
import { ImageSolidIcon } from "~/components/ui/icons";
import { cn } from "~/lib/utils";

export type InputImageProps = {
  className?: string;
  disabled?: boolean;
  options?: DropzoneOptions;
  children?: React.ReactNode;
  onLoadImage?: ({ url, file }: { url: string; file: File }) => void;
};

export default function ImageDropzone({
  disabled,
  options,
  children,
  onLoadImage,
}: InputImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();

        reader.onabort = () => toast.info("파일 등록이 취소되었습니다.");
        reader.onerror = () => toast.error("파일 등록에 실패했습니다.");
        reader.onload = () => {
          const url = URL.createObjectURL(file);
          onLoadImage?.({ url, file });
        };
        reader.readAsArrayBuffer(file);
      }
    },
    [onLoadImage],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    disabled,
    onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10, // 10MB
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-[120px] w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-sm border border-transparent bg-muted p-2 text-xs text-muted-foreground focus-within:border-border focus-within:outline-none hover:border-border",
        disabled && "bg-muted",
        isDragActive && "bg-accent",
      )}
    >
      <input {...getInputProps()} />
      <div className="text-muted-foreground">
        <ImageSolidIcon className="size-6" />
      </div>
      {children}
    </div>
  );
}
