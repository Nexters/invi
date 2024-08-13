"use client";

import { Portal } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export type TooltipSimpleProps = React.ComponentPropsWithoutRef<
  typeof TooltipContent
> & {
  text: string;
};

export default function TooltipSimple({
  text,
  children,
  side = "bottom",
  ...props
}: TooltipSimpleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <Portal>
        <TooltipContent side={side} {...props}>
          {text}
        </TooltipContent>
      </Portal>
    </Tooltip>
  );
}
