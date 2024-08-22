"use client";

import { useEffect, useState } from "react";
import { useEditor } from "~/components/editor/provider";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Switch } from "~/components/ui/switch";
import { getInvitationResponseById } from "~/lib/db/schema/invitation_response.query";

export default function SidebarInvitationResponseTab() {
  const { editor, dispatch } = useEditor();
  const fabType = editor.data.fab.type;

  const handleClickFabSwitch = () => {
    if (fabType === "invitation_response") {
      dispatch({
        type: "UPDATE_FAB_STATE",
        payload: {
          type: "",
        },
      });
    } else {
      dispatch({
        type: "UPDATE_FAB_STATE",
        payload: {
          type: "invitation_response",
        },
      });
    }
  };

  return (
    <div className="w-full border-b">
      <SheetHeader className="p-6">
        <div className="flex items-center justify-between">
          <SheetTitle>초대 응답 설정</SheetTitle>
          <Switch
            defaultChecked={editor.data.fab.type === "invitation_response"}
            onClick={handleClickFabSwitch}
          />
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
  const { editor, dispatch } = useEditor();
  const [invitationResponse, setInvitationResponse] = useState();
  useEffect(() => {
    (async () => {
      setInvitationResponse(
        await getInvitationResponseById(editor.config.invitationId),
      );
    })();
    console.log(invitationResponse);
  }, [invitationResponse]);

  return (
    <div className="grid w-full grid-cols-9 gap-1 border-t p-6">
      <div className="col-span-9"></div>
    </div>
  );
}
