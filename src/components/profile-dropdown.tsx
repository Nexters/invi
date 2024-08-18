"use client";

import Link from "next/link";
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

export type ProfileDropDownProps = {
  user: Auth["user"];
};

export default function ProfileDropDown({ user }: ProfileDropDownProps) {
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
          <DropdownMenuItem>탈퇴하기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
