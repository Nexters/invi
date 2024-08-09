"use client";

import { Portal } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export type TooltipSimpleProps = {
  text: string;
  children: React.ReactNode;
};

export default function TooltipSimple({ text, children }: TooltipSimpleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <Portal>
        <TooltipContent>{text}</TooltipContent>
      </Portal>
    </Tooltip>
  );
}
