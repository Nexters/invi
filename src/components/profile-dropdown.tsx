"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAlertDialogStore } from "~/components/global-alert";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import TooltipSimple from "~/components/ui/tooltip-simple";
import type { Auth } from "~/lib/auth/utils";
import { deleteUser } from "~/lib/db/schema/users.query";

export type ProfileDropDownProps = {
  user: Auth["user"];
};

export default function ProfileDropDown({ user }: ProfileDropDownProps) {
  const router = useRouter();
  const openDialog = useAlertDialogStore((s) => s.openDialog);

  const withdrawMutation = useMutation({
    mutationFn: () => deleteUser(user!.id),
    onSuccess: () => {
      toast.success("회원탈퇴가 완료되었습니다.");
      router.replace("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error("회원탈퇴에 실패했습니다.");
    },
  });

  const handleOnDelete = () => {
    openDialog({
      title: "정말 회원 탈퇴를 진행하시겠습니까?",
      description: "이 작업은 되돌릴 수 없으며 모든 개인정보가 삭제됩니다.",
      confirmText: "확인",
      cancelText: "취소",
      onConfirm: () => {
        withdrawMutation.mutate();
      },
    });
  };

  return (
    <DropdownMenu>
      <TooltipSimple text="프로필">
        <DropdownMenuTrigger className="text-sm outline-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </TooltipSimple>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/sign-out">로그아웃</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={handleOnDelete}>
          탈퇴하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
