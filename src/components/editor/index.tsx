import EditorMain from "~/components/editor/main";
import EditorNavigation from "~/components/editor/navigation";
import EditorProvider, { type EditorProps } from "~/components/editor/provider";
import EditorSidebar from "~/components/editor/sidebar";

export default function Editor(props: EditorProps) {
  return (
    <EditorProvider {...props}>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex flex-col overflow-hidden bg-secondary">
        <EditorNavigation />
        <EditorMain />
        <EditorSidebar />
      </div>
    </EditorProvider>
  );
}
