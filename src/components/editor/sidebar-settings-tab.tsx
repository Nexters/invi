"use client";

import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useEditor } from "~/components/editor/provider";
import { EditorInput } from "~/components/editor/ui/input";
import { Accordion } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

type Props = {};

export default function SidebarSettingsTab(props: Props) {
  return (
    <Accordion type="multiple" className="w-full" defaultValue={[]}>
      <SheetHeader className="p-6">
        <SheetTitle>초대장 설정</SheetTitle>
        <SheetDescription>
          초대장 전체 스타일을 정해보세요. 색상, 글꼴를 바꿔 나만의 분위기를
          만들 수 있어요.
        </SheetDescription>
      </SheetHeader>
      <CustomDomainSection />
      <SEOSection />
    </Accordion>
  );
}

function CustomDomainSection() {
  const { editorConfig } = useEditor();

  return (
    <div className="grid w-full grid-cols-9 gap-1 border-t p-6">
      <div className="col-span-9 mb-2 flex items-center">
        <h4 className="text-sm font-medium">도메인 설정</h4>
      </div>
      <div className="col-span-9">
        <EditorInput
          id="subdomain"
          className="mr-0 pr-0.5 ring-1"
          componentSuffix={
            <div>
              <span>.invi.my</span>
              <Button size="sm" className="ml-2 h-6">
                저장
              </Button>
            </div>
          }
          defaultValue={editorConfig.invitationSubdomain}
          onDebounceChange={() => {}}
        />
        <div className="h-5">
          {true && (
            <span className="text-xs text-destructive">
              중복된 도메인입니다. 다른 주소를 사용해주세요.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SEOSection() {
  const { editorConfig } = useEditor();

  const onCopyLink = async () => {
    const link = `https://${editorConfig.invitationSubdomain}.invi.my`;

    try {
      await navigator.clipboard.writeText(link);
      toast("링크가 복사되었습니다.", { description: link });
    } catch (e) {
      console.error(e);
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="grid w-full grid-cols-9 gap-2 border-y p-6">
      <div className="col-span-9 flex flex-col">
        <h4 className="text-sm font-medium">SEO 설정</h4>
        <p className="text-xs text-muted-foreground">
          링크 공유시 보여지는 정보를 설정해보세요.
        </p>
      </div>
      <div className="col-span-9">
        <div className="select-none bg-[#BACEE0] p-4">
          <div className="inline-block overflow-hidden rounded-[3px] bg-neutral-200">
            {/* <img
              src=""
              width="250px"
              height="125px"
              className="aspect-preview object-cover"
              draggable="false"
              alt="썸네일"
            /> */}
            <div className="bg-white p-2.5 text-sm">
              <div>{editorConfig.invitationTitle}</div>
              <div className="text-xs text-neutral-400">
                여기를 눌러 링크를 확인하세요.
              </div>
              <div className="text-xs text-neutral-300">invi.my</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-9 flex items-center gap-2">
        <Button size="icon" variant="secondary" onClick={onCopyLink}>
          <LinkIcon size={16} />
        </Button>
        <div className="ml-auto flex gap-2">
          <Button>저장</Button>
        </div>
      </div>
    </div>
  );
}
