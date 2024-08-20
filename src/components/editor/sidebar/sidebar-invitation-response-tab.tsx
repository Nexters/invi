"use client";

import { useEditor } from "~/components/editor/provider";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Switch } from "~/components/ui/switch";

export default function SidebarInvitationResponseTab() {
  const { editor, dispatch } = useEditor();

  return (
    <div className="w-full border-b">
      <SheetHeader className="p-6">
        <div className="flex items-center justify-between">
          <SheetTitle>초대 응답 설정</SheetTitle>
          <Switch />
        </div>
        <SheetDescription>
          이벤트에 대한 초대 응답 설정을 관리합니다.
        </SheetDescription>
      </SheetHeader>
      {editor.config && <InvitationResponseContent />}
    </div>
  );
}

function InvitationResponseContent() {
  return (
    <div className="grid w-full grid-cols-9 gap-1 border-t p-6">
      <div className="col-span-9"></div>
    </div>
  );
}
