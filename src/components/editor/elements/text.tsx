"use client";

import { useCallback, useRef } from "react";
import ContentEditable, {
  type ContentEditableEvent,
} from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import ElementWrapper from "~/components/editor/elements/element-wrapper";
import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"text">;
};

export default function Text({ element }: Props) {
  const { dispatch, editor } = useEditor();

  const sanitize = useCallback((html: string) => {
    return sanitizeHtml(html, {
      allowedTags: ["a", "p", "br", "div", "b"],
      allowedAttributes: { a: ["href"], p: ["style"] },
    });
  }, []);

  const text = useRef(sanitize(element.content.innerText));
  const styleRef = useRef(element.styles);

  const handleChange = (e: ContentEditableEvent) => {
    text.current = e.target.value;
    styleRef.current = element.styles;
  };

  const handleSave = () => {
    const textHtml = sanitize(text.current);

    if (textHtml === element.content.innerText) {
      return;
    }

    console.log("apply", styleRef.current);
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          styles: styleRef.current,
          content: {
            innerText: textHtml,
          },
        },
      },
    });
  };

  return (
    <ElementWrapper element={element}>
      <ContentEditable
        className="w-full outline-none"
        disabled={editor.state.isPreviewMode}
        html={text.current}
        onChange={handleChange}
        onBlur={handleSave}
      />
    </ElementWrapper>
  );
}
