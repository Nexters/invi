"use client";

import { useEffect, useState } from "react";
import { useEditor } from "~/components/editor/provider";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Switch } from "~/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { InvitationResponse } from "~/lib/db/schema/invitation_response";
import { getInvitationResponseById } from "~/lib/db/schema/invitation_response.query";
import { formatUTCtoKST } from "~/lib/utils";

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
  const { editor } = useEditor();
  const [invitationResponses, setInvitationResponses] =
    useState<InvitationResponse[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResponses() {
      try {
        setIsLoading(true);
        const responses = await getInvitationResponseById(
          editor.config.invitationId,
        );
        setInvitationResponses(responses);
      } catch (error) {
        console.error("Failed to fetch invitation responses:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResponses();
  }, [editor.config.invitationId]);

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-9 gap-1 border-t p-6">
        <div className="col-span-9">
          <p className={"mb-2 text-lg font-bold"}>참석여부</p>
          <p>참석여부 가져오는 중..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-9 gap-1 border-t p-6">
      <div className="col-span-9">
        <p className={"mb-2 text-lg font-bold"}>참석여부</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={"w-1/3 overflow-x-auto"}>이름</TableHead>
              <TableHead className={"w-1/3 overflow-x-auto"}>
                참석여부
              </TableHead>
              <TableHead className={"w-1/3 overflow-x-auto"}>
                응답 시간
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitationResponses?.map((invitationResponse) => (
              <TableRow key={invitationResponse.id}>
                <TableCell className={"w-1/3 overflow-x-auto"}>
                  {invitationResponse?.participant_name}
                </TableCell>
                <TableCell className={"w-1/3 overflow-x-auto"}>
                  {invitationResponse?.attendance ? "참여" : "불참"}
                </TableCell>
                <TableCell className={"w-1/3 overflow-x-auto"}>
                  {formatUTCtoKST(invitationResponse.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
