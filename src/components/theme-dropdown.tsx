"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import TooltipSimple from "~/components/ui/tooltip-simple";

export default function ThemeDropdown() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipSimple text="테마">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <SunIcon className="size-6 dark:hidden" />
            <MoonIcon className="hidden size-6 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </TooltipSimple>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
