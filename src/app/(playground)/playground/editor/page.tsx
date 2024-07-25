import Editor from "~/components/editor";

export default async function Page() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[20] overflow-hidden bg-background">
          {/* TODO: page 데이터 연동 */}
          <Editor pageDetails={{}} />
        </div>
      </div>
    </div>
  );
}
