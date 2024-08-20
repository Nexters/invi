"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Auth } from "~/lib/auth/utils";
import { deleteUser } from "~/lib/db/schema/users.query";

export type ProfileDropDownProps = {
  user: Auth["user"];
};

export default function ProfileDropDown({ user }: ProfileDropDownProps) {
  const withdrawMutation = useMutation({
    mutationFn: () => deleteUser(user!.id),
    onSuccess: () => {
      toast.success("회원탈퇴가 완료되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("회원탈퇴에 실패했습니다.");
    },
  });

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm outline-none">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/sign-out">로그아웃</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => withdrawMutation.mutate()}>
            탈퇴하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
