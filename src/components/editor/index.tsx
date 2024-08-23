import { MailOpenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MainImage4 from "~/assets/main4.png";
import { InView } from "~/components/core/in-view";
import EditorMain from "~/components/editor/main";
import EditorNavigation from "~/components/editor/navigation";
import EditorProvider, { type EditorProps } from "~/components/editor/provider";
import EditorSidebar from "~/components/editor/sidebar";
import { Button } from "~/components/ui/button";

export default function Editor(props: EditorProps) {
  return (
    <EditorProvider {...props}>
      <div className="fixed inset-0 z-20 flex flex-col overflow-hidden bg-secondary">
        <EditorNavigation />
        <EditorMain />
        <EditorSidebar />
      </div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background sm:hidden">
        <header className="absolute left-[28px] top-[25.5px]">
          <Link href="/">
            <Image src="/landing-logo.png" alt="logo" width={85} height={29} />
          </Link>
        </header>
        <InView className="text-center">
          <div className="mb-2">
            <Image src={MainImage4} alt="main" width={216} height={201} />
          </div>
          <div className="mb-8 font-medium">에디터는 PC에서만 지원됩니다.</div>
          <div className="mb-2">
            <Button asChild className="mx-auto gap-1">
              <Link href={`/i/${props.editorConfig?.invitationSubdomain}`}>
                <MailOpenIcon className="size-4" /> 초대장 보기
              </Link>
            </Button>
          </div>
          <div>
            <Button asChild variant="ghost">
              <Link href={`/dashboard`}>돌아가기</Link>
            </Button>
          </div>
        </InView>
      </div>
    </EditorProvider>
  );
}
