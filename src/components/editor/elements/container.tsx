"use client";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import type { EditorElement } from "~/components/editor/type";
import { cn } from "~/lib/utils";
import Recursive from "./recursive";

type Props = { element: EditorElement };

export default function Container({ element }: Props) {
  const { content, type } = element;
  const isRoot = type === "__body";

  return (
    <ElementWrapper
      element={element}
      className={cn("h-fit w-full max-w-full", isRoot && "min-h-full")}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </ElementWrapper>
  );
}
