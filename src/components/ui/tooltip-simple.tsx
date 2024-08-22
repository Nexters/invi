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
  disabled?: boolean;
};

export default function TooltipSimple({
  text,
  children,
  side = "bottom",
  disabled,
  ...props
}: TooltipSimpleProps) {
  return (
    <Tooltip disableHoverableContent={disabled}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <Portal>
        <TooltipContent side={side} {...props}>
          {text}
        </TooltipContent>
      </Portal>
    </Tooltip>
  );
}
