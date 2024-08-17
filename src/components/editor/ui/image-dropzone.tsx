"use client";

import { useCallback } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { toast } from "sonner";

export type InputImageProps = {
  className?: string;
  options?: DropzoneOptions;
  onLoadImage?: (src: string) => void;
};

export default function ImageDropzone({
  options,
  onLoadImage,
}: InputImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();

        reader.onabort = () => toast.info("파일 등록이 취소되었습니다.");
        reader.onerror = () => toast.error("파일 등록에 실패했습니다.");
        reader.onload = () => {
          const src = URL.createObjectURL(file);
          onLoadImage?.(src);
        };
        reader.readAsArrayBuffer(file);
      }
    },
    [onLoadImage],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="h-20 w-full cursor-pointer rounded-sm border border-transparent bg-secondary p-2 text-xs focus-within:border-border focus-within:outline-none hover:border-border"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>파일을 여기에 놓으세요...</p>
      ) : (
        <p>여기에 파일을 끌어다 놓거나, 클릭하여 파일을 선택하세요.</p>
      )}
    </div>
  );
}
