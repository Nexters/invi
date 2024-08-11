"use client";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"text">;
};

export default function Text({ element }: Props) {
  const { dispatch, editor } = useEditor();

  return (
    <ElementWrapper element={element}>
      <span
        className="outline-none"
        contentEditable={!editor.state.isPreviewMode}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          });
        }}
      >
        {!Array.isArray(element.content) && element.content.innerText}
      </span>
    </ElementWrapper>
  );
}
