"use client";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  CornerDownLeftIcon,
} from "lucide-react";
import { useMemo } from "react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import TooltipSimple from "~/components/ui/tooltip-simple";

export default function FlexToggleGroup({
  value,
  onChangeValue,
}: {
  value: { flexWrap?: string; flexDirection?: string };
  onChangeValue: (value: {
    flexWrap: "wrap" | "nowrap";
    flexDirection: "row" | "column";
  }) => void;
}) {
  const toggleValue = useMemo(() => {
    if (value.flexWrap === "wrap") {
      return "wrap";
    }

    return value.flexDirection ?? "row";
  }, [value]);

  const onValueChange = (newValue: "wrap" | "row" | "column") => {
    if (!newValue) {
      return;
    }

    if (newValue === "wrap") {
      onChangeValue({
        flexWrap: "wrap",
        flexDirection: "row",
      });
      return;
    }

    onChangeValue({
      flexWrap: "nowrap",
      flexDirection: newValue,
    });
  };

  return (
    <ToggleGroup
      type="single"
      className="flex gap-[1px] rounded-sm ring-border ring-offset-1 hover:ring-1"
      value={toggleValue}
      onValueChange={onValueChange}
    >
      <TooltipSimple text="Vertical layout">
        <div>
          <ToggleGroupItem
            size="xs"
            value="column"
            aria-label="Vertical layout"
          >
            <ArrowDownIcon size={13} />
          </ToggleGroupItem>
        </div>
      </TooltipSimple>
      <TooltipSimple text="Horizontal layout">
        <div>
          <ToggleGroupItem size="xs" value="row" aria-label="Horizontal layout">
            <ArrowRightIcon size={13} />
          </ToggleGroupItem>
        </div>
      </TooltipSimple>
      <TooltipSimple text="Wrap">
        <div>
          <ToggleGroupItem size="xs" value="wrap" aria-label="Wrap">
            <CornerDownLeftIcon size={13} />
          </ToggleGroupItem>
        </div>
      </TooltipSimple>
    </ToggleGroup>
  );
}
