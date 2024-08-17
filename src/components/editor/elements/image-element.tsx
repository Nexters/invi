"use client";

import { ImageIcon } from "lucide-react";
import ElementWrapper from "~/components/editor/elements/element-wrapper";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"image">;
};

export default function ImageElement({ element }: Props) {
  return (
    <ElementWrapper element={element}>
      {element.content.src ? (
        <img
          className="h-full w-full object-cover"
          src={element.content.src}
          alt={element.content.alt ?? "이미지"}
        />
      ) : (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
          <ImageIcon />
        </div>
      )}
    </ElementWrapper>
  );
}
