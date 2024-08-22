"use client";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import type { InferEditorElement } from "~/components/editor/type";
import { ImageSolidIcon } from "~/components/ui/icons";

type Props = {
  element: InferEditorElement<"image">;
};

export default function ImageElement({ element }: Props) {
  return (
    <ElementWrapper element={element} className="flex-shrink-0">
      {element.content.src ? (
        <img
          className="h-full w-full select-none object-cover"
          draggable={false}
          src={element.content.src}
          alt={element.content.alt ?? "이미지"}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-secondary p-5 text-muted-foreground">
          <ImageSolidIcon />
        </div>
      )}
    </ElementWrapper>
  );
}
