"use client";

import { useEditor } from "~/components/editor/provider";
import { Accordion } from "~/components/ui/accordion";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

type Props = {};

export default function SidebarSettingsTab(props: Props) {
  const { editor, dispatch } = useEditor();

  return (
    <Accordion type="multiple" className="w-full border-t" defaultValue={[]}>
      <SheetHeader className="p-6">
        <SheetTitle>초대장 설정</SheetTitle>
        <SheetDescription>
          초대장 전체 스타일을 정해보세요. 색상, 글꼴를 바꿔 나만의 분위기를
          만들 수 있어요.
        </SheetDescription>
      </SheetHeader>
    </Accordion>
  );
}
