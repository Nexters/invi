"use client";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"image">;
};

export default function Image({ element }: Props) {
  const { dispatch, editor } = useEditor();

  return (
    <ElementWrapper element={element}>
      {/* TODO: apply real image */}
      <div className="h-10 bg-muted" />
    </ElementWrapper>
  );
}
