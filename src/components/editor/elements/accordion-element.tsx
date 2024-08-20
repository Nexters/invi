"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import ElementWrapper from "~/components/editor/elements/element-wrapper";
import Text from "~/components/editor/elements/text";
import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";

export default function AccordionElement({
  element,
}: {
  element: InferEditorElement<"accordion">;
}) {
  const { editor } = useEditor();
  const [isOpen, setIsOpen] = useState(
    editor.state.isPreviewMode ? false : true,
  );

  return (
    <ElementWrapper element={element}>
      <div
        className="overflow-hidden rounded-[20px] bg-muted pb-3"
        style={element.content.containerStyle}
      >
        <button
          data-state={isOpen ? "open" : "closed"}
          className="flex w-full select-none items-center justify-between p-6 pb-3 text-xl font-semibold [&[data-state=open]>svg]:rotate-180"
          style={element.content.triggerStyle}
          onClick={() => editor.state.isPreviewMode && setIsOpen(!isOpen)}
        >
          {element.content.triggerText ?? "제목"}
          <ChevronDownIcon className="h-6 w-6 shrink-0 transition-transform duration-200" />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              exit={{ height: 0 }}
              style={element.content.contentStyle}
              className="overflow-hidden text-sm"
            >
              <div className="px-6 py-3">
                <Text element={element.content.text} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ElementWrapper>
  );
}
