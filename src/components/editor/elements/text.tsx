"use client";

import { useRef } from "react";
import ContentEditable, {
  type ContentEditableEvent,
} from "react-contenteditable";
import ElementWrapper from "~/components/editor/elements/element-wrapper";
import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"text">;
};

export default function Text({ element }: Props) {
  const { dispatch, editor } = useEditor();

  const text = useRef(element.content.innerText);

  const handleChange = (e: ContentEditableEvent) => {
    text.current = e.target.value;
  };

  const handleBlur = () => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: {
            innerText: text.current,
          },
        },
      },
    });
  };

  return (
    <ElementWrapper element={element}>
      <ContentEditable
        className="w-full outline-none"
        disabled={!editor.state.isPreviewMode}
        html={text.current}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </ElementWrapper>
  );
}
