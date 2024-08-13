"use client";

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRight,
  DotIcon,
  type LucideProps,
} from "lucide-react";
import { cn } from "~/lib/utils";

const alignConfig = {
  start_start: {
    style: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    Icon: (props: LucideProps) => <AlignLeftIcon {...props} />,
  },
  start_center: {
    style: {
      justifyContent: "flex-start",
      alignItems: "center",
    },
    Icon: (props: LucideProps) => <AlignCenterIcon {...props} />,
  },
  start_end: {
    style: {
      justifyContent: "flex-start",
      alignItems: "flex-end",
    },
    Icon: (props: LucideProps) => <AlignRight {...props} />,
  },
  center_start: {
    style: {
      justifyContent: "center",
      alignItems: "flex-start",
    },
    Icon: (props: LucideProps) => <AlignLeftIcon {...props} />,
  },
  center_center: {
    style: {
      justifyContent: "center",
      alignItems: "center",
    },
    Icon: (props: LucideProps) => <AlignCenterIcon {...props} />,
  },
  center_end: {
    style: {
      justifyContent: "center",
      alignItems: "flex-end",
    },
    Icon: (props: LucideProps) => <AlignRight {...props} />,
  },
  end_start: {
    style: {
      justifyContent: "flex-end",
      alignItems: "flex-start",
    },
    Icon: (props: LucideProps) => <AlignLeftIcon {...props} />,
  },
  end_center: {
    style: {
      justifyContent: "flex-end",
      alignItems: "center",
    },
    Icon: (props: LucideProps) => <AlignCenterIcon {...props} />,
  },
  end_end: {
    style: {
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    Icon: (props: LucideProps) => <AlignRight {...props} />,
  },
} as const;

export default function AlignInputBox({
  value,
  onChangeValue,
}: {
  value: { justifyContent?: string; alignItems?: string };
  onChangeValue: (value: {
    justifyContent: string;
    alignItems: string;
  }) => void;
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 rounded-sm border text-muted-foreground">
      {Object.keys(alignConfig).map((key) => {
        const alignKey = key as keyof typeof alignConfig;
        const { Icon } = alignConfig[alignKey];
        const [alignItemValue, justifyValue] = alignKey.split("_");
        const isSelected =
          value.alignItems === alignItemValue &&
          value.justifyContent === justifyValue;

        return (
          <div
            key={alignKey}
            className="group relative flex h-5 w-5 items-center justify-center"
            onClick={() =>
              onChangeValue({
                alignItems: alignItemValue,
                justifyContent: justifyValue,
              })
            }
          >
            <DotIcon
              size={14}
              className={cn("group-hover:hidden", isSelected && "hidden")}
            />
            <div
              className={cn(
                "absolute inset-0 hidden items-center justify-center group-hover:flex",
                isSelected && "flex text-foreground",
              )}
            >
              <Icon size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
