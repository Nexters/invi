"use client";

import EditorMain from "~/components/editor/main";
import EditorNavigation from "~/components/editor/navigation";
import EditorProvider, {
  type EditorProviderProps,
} from "~/components/editor/provider";
import EditorSidebar from "~/components/editor/sidebar";

export default function Editor(props: EditorProviderProps) {
  return (
    <EditorProvider {...props}>
      <EditorNavigation />
      <div className="flex h-full justify-center">
        <EditorMain />
      </div>
      <EditorSidebar />
    </EditorProvider>
  );
}
