import EditorMain from "~/components/editor/main";
import EditorNavigation from "~/components/editor/navigation";
import EditorProvider from "~/components/editor/provider";
import EditorSidebar from "~/components/editor/sidebar";

export default async function Page() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[20] overflow-hidden bg-background">
          {/* TODO: page 데이터 연동 */}
          <EditorProvider pageDetails={{}}>
            <EditorNavigation />
            <div className="flex h-full justify-center">
              <EditorMain />
            </div>
            <EditorSidebar />
          </EditorProvider>
        </div>
      </div>
    </div>
  );
}
