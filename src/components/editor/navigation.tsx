"use client";

import {
  ArrowLeftIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  Laptop,
  MailOpenIcon,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditor } from "~/components/editor/provider";
import TitleInput from "~/components/editor/title-input";
import type { DeviceType } from "~/components/editor/type";
import { useAlertDialogStore } from "~/components/global-alert";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import TooltipSimple from "~/components/ui/tooltip-simple";
import {
  deleteInvitation,
  updateInvitation,
} from "~/lib/db/schema/invitations.query";
import { cn } from "~/lib/utils";

export default function EditorNavigation() {
  const { editor, dispatch } = useEditor();
  const router = useRouter();
  const { openDialog } = useAlertDialogStore();

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleOnSave = async () => {
    toast.promise(
      updateInvitation({
        id: editor.config.invitationId,
        title: editor.config.invitationTitle,
        customFields: editor.data,
      }),
      {
        loading: "저장중...",
        success: "저장되었습니다.",
        error: "일시적인 오류가 발생되었습니다.",
      },
    );
  };

  const handleOnDelete = () => {
    openDialog({
      title: "초대장을 삭제하시겠습니까?",
      description: "이 작업을 되돌릴 수 없습니다.",
      confirmText: "확인",
      cancelText: "취소",
      onConfirm: async () => {
        await deleteInvitation(editor.config.invitationId);
        router.replace("/dashboard");
      },
    });
  };

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-2 border-b bg-background transition-all",
        editor.state.isPreviewMode ? "h-0 overflow-hidden p-0" : "p-6",
      )}
    >
      <aside className="flex items-center gap-6">
        <Button asChild variant="ghost" size="icon">
          <Link href={editor.config.backLink}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <TitleInput />
        <Tabs
          value={editor.state.device}
          onValueChange={(value) => {
            dispatch({
              type: "CHANGE_DEVICE",
              payload: { device: value as DeviceType },
            });
          }}
        >
          <TabsList>
            <TabsTrigger value="Desktop" className="h-10 w-10 p-0">
              <Laptop />
            </TabsTrigger>
            <TabsTrigger value="Tablet" className="h-10 w-10 p-0">
              <Tablet />
            </TabsTrigger>
            <TabsTrigger value="Mobile" className="h-10 w-10 p-0">
              <Smartphone />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>
      <aside className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePreviewClick}>
            <EyeIcon />
          </Button>
          <Button
            disabled={!(editor.history.currentIndex > 0)}
            onClick={handleUndo}
            variant="ghost"
            size="icon"
          >
            <Undo2 />
          </Button>
          <Button
            disabled={
              !(editor.history.currentIndex < editor.history.list.length - 1)
            }
            onClick={handleRedo}
            variant="ghost"
            size="icon"
          >
            <Redo2 />
          </Button>
        </div>
        <Button variant="secondary" onClick={handleOnSave} className="gap-1">
          <DownloadIcon className="h-4 w-4" /> 저장
        </Button>
        <Button className="gap-1" asChild>
          <Link
            href={`https://${editor.config.invitationSubdomain}.invi.my/`}
            target="_blank"
          >
            <MailOpenIcon className="h-4 w-4" /> 초대장 보기
          </Link>
        </Button>
        <DropdownMenu>
          <TooltipSimple text="더보기">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipSimple>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>복제하기</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleOnDelete}
            >
              삭제하기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
    </nav>
  );
}
