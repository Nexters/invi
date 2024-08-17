"use client";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import type { InferEditorElement } from "~/components/editor/type";

export default function BlankElement({
  element,
}: {
  element: InferEditorElement<"blank">;
}) {
  return <ElementWrapper element={element}></ElementWrapper>;
}
