"use client";

import Wrapper from "~/components/editor/elements/wrapper";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";

type Props = {
  element: EditorElement;
};

export default function Text({ element }: Props) {
  const { dispatch, editor } = useEditor();

  return (
    <Wrapper element={element}>
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
    </Wrapper>
  );
}
