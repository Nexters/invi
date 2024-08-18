"use client";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import type { InferEditorElement } from "~/components/editor/type";
import { LogoTextIcon } from "~/components/ui/icons";

type Props = {
  element: InferEditorElement<"logoBanner">;
};

export default function LogoBannerElement({ element }: Props) {
  return (
    <ElementWrapper
      element={element}
      className="flex items-center justify-center"
    >
      <LogoTextIcon />
    </ElementWrapper>
  );
}
