"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageDropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
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
