import { GearIcon } from "@radix-ui/react-icons";
import { ChevronRightIcon, CircleIcon } from "lucide-react";
import Link from "next/link";
import ProfileDropDown from "~/components/profile-dropdown";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getAuth } from "~/lib/auth/utils";

export default async function Page() {
  const auth = await getAuth();

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* header */}
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <CircleIcon className="h-6 w-6" />
          <span className="sr-only">Invi</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ProfileDropDown user={auth.user} />
        </nav>
      </header>
      {/* body */}
      <div className="flex flex-1 overflow-hidden">
        <main className="relative isolate w-full flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-14">
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex w-full max-w-[80ch] flex-col gap-3">
                <h2 className="truncate text-2xl font-bold tracking-tight">
                  나의 초대장
                </h2>
              </div>
            </div>
            <div className="mt-9 grid auto-rows-[minmax(14rem,_1fr)] grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 md:grid-cols-3 2xl:grid-cols-4">
              <div className="group relative overflow-hidden rounded-xl border border-border">
                <div className="h-full w-full">
                  <Link
                    href={`/`}
                    className="flex h-full flex-col bg-muted p-0.5"
                  >
                    <div className="flex-1 overflow-hidden rounded-xl border border-border bg-background p-3">
                      <p className="font-semibold leading-none tracking-tight">
                        project.name
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {"yyyy.MM.dd"}
                      </span>
                    </div>
                    <div className="relative flex items-center justify-between px-1 py-1.5 text-xs">
                      <span className="text-muted-foreground transition duration-200 group-hover:translate-x-[-150%]">
                        {"yyyy.MM.dd"}
                      </span>
                      <div className="flex translate-x-[150%] items-center gap-0.5 text-foreground transition duration-200 group-hover:translate-x-0">
                        <span>초대장 편집하기</span>
                        <ChevronRightIcon width={14} height={14} />
                      </div>
                    </div>
                  </Link>
                  <div className="absolute right-4 top-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <GearIcon width={18} height={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>수정</DropdownMenuItem>
                        <DropdownMenuItem>삭제</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
