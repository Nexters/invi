"use client";

import { createPortal } from "react-dom";
import EditorMain from "~/components/editor/main";
import EditorNavigation from "~/components/editor/navigation";
import EditorProvider, {
  type EditorProviderProps,
} from "~/components/editor/provider";
import EditorSidebar from "~/components/editor/sidebar";

export default function Editor(props: EditorProviderProps) {
  return createPortal(
    <EditorProvider {...props}>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[20] flex flex-col overflow-hidden bg-secondary">
        <EditorNavigation />
        <div className="flex flex-1 items-center justify-center">
          <EditorMain />
        </div>
        <EditorSidebar />
      </div>
    </EditorProvider>,
    document.body,
  );
}
