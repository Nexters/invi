"use client";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"image">;
};

export default function Image({ element }: Props) {
  return (
    <ElementWrapper element={element}>
      {/* TODO: apply real image */}
      <img
        className="w-full"
        src={element.content.src}
        alt={element.content.alt ?? "이미지"}
      />
    </ElementWrapper>
  );
}
