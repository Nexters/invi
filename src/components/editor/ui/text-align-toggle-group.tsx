"use client";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import TooltipSimple from "~/components/ui/tooltip-simple";

export default function TextAlignToggleGroup({
  value,
  onChangeValue,
}: {
  value: string;
  onChangeValue: (value: "left" | "center" | "right" | "justify") => void;
}) {
  return (
    <ToggleGroup
      type="single"
      className="flex gap-[1px] rounded-sm ring-border ring-offset-1 hover:ring-1"
      value={value}
      onValueChange={onChangeValue}
    >
      <TooltipSimple text="Align Left">
        <div>
          <ToggleGroupItem size="xs" value="left">
            <AlignLeftIcon size={13} />
          </ToggleGroupItem>
        </div>
      </TooltipSimple>
      <TooltipSimple text="Align Center">
        <div>
          <ToggleGroupItem size="xs" value="center">
            <AlignCenterIcon size={13} />
          </ToggleGroupItem>
        </div>
      </TooltipSimple>
      <TooltipSimple text="Align Right">
        <div>
          <ToggleGroupItem size="xs" value="right">
            <AlignRightIcon size={13} />
          </ToggleGroupItem>
        </div>
      </TooltipSimple>
      <TooltipSimple text="Align Justify">
        <div>
          <ToggleGroupItem size="xs" value="justify">
            <AlignJustifyIcon size={13} />
          </ToggleGroupItem>
        </div>
      </TooltipSimple>
    </ToggleGroup>
  );
}
