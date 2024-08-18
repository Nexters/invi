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
        <div className="flex h-full w-full items-center justify-center bg-secondary p-5 text-muted-foreground">
          <ImageIcon />
        </div>
      )}
    </ElementWrapper>
  );
}
