"use client";

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRight,
  ArrowDownIcon,
  ArrowRightIcon,
  CornerDownLeftIcon,
  DotIcon,
  type LucideProps,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";
import { IconInput } from "~/components/editor/ui/input";
import {
  GapIcon,
  PaddingBottomIcon,
  PaddingIndividualIcon,
  PaddingLeftIcon,
  PaddingLeftRightIcon,
  PaddingRightIcon,
  PaddingTopBottomIcon,
  PaddingTopIcon,
} from "~/components/ui/icons";
import { Toggle } from "~/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import TooltipSimple from "~/components/ui/tooltip-simple";
import { cn } from "~/lib/utils";

export default function LayoutSetting() {
  return (
    <div className="space-y-1 border-t px-6 py-4">
      <div className="flex h-10 items-center">
        <h4 className="text-sm font-medium">레이아웃 설정</h4>
      </div>
      <FlexBoxSection />
      <PaddingSection />
    </div>
  );
}

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

function AlignInput() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 rounded-sm border text-muted-foreground">
      {Object.keys(alignConfig).map((key) => {
        const alignKey = key as keyof typeof alignConfig;
        const { Icon } = alignConfig[alignKey];
        const isSelected = alignKey === "center_center";

        return (
          <div
            key={alignKey}
            className="group relative flex h-5 w-5 items-center justify-center"
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

function FlexToggleGroup({ element }: { element: EditorElement }) {
  const { dispatch } = useEditor();

  const value = useMemo(() => {
    if (element.styles.flexWrap === "wrap") {
      return "wrap";
    }

    return element.styles.flexDirection ?? "row";
  }, [element.styles]);

  const onValueChange = (newValue: "wrap" | "row" | "column") => {
    if (!newValue) {
      return;
    }

    if (newValue === "wrap") {
      dispatch({
        type: "UPDATE_ELEMENT_STYLE",
        payload: {
          flexWrap: "wrap",
          flexDirection: "row",
        },
      });
      return;
    }

    dispatch({
      type: "UPDATE_ELEMENT_STYLE",
      payload: {
        flexWrap: "nowrap",
        flexDirection: newValue,
      },
    });
  };

  return (
    <ToggleGroup
      type="single"
      className="flex gap-[1px] rounded-sm ring-border ring-offset-1 hover:ring-1"
      value={value}
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

function FlexBoxSection() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  return (
    <div className="grid w-full grid-cols-9 gap-1">
      <div className="col-span-4 row-span-1 flex items-start">
        <FlexToggleGroup element={element} />
      </div>
      <div className="col-span-4 row-span-2 flex items-start">
        <AlignInput />
      </div>
      <div className="col-span-4 row-span-1">
        <IconInput
          id="gap_input"
          type="number"
          value={element.styles.gap}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { gap: e.target.value },
            })
          }
          icon={<GapIcon />}
        />
      </div>
    </div>
  );
}

function PaddingSection() {
  const [isPaddingIndividual, setIsPaddingIndividual] = useState(false);

  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  return (
    <div className="grid w-full grid-cols-9 gap-1">
      {!isPaddingIndividual ? (
        <>
          <div className="col-span-4 row-span-1">
            <IconInput
              id="px-input"
              type="number"
              value={element.styles.paddingLeft}
              onChange={(e) => {
                const newValue = e.target.valueAsNumber;
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingLeft: newValue, paddingRight: newValue },
                });
              }}
              icon={<PaddingLeftRightIcon />}
            />
          </div>
          <div className="col-span-4 row-span-1">
            <IconInput
              id="py_input"
              type="number"
              value={element.styles.paddingTop}
              onChange={(e) => {
                const newValue = e.target.valueAsNumber;
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingTop: newValue, paddingBottom: newValue },
                });
              }}
              icon={<PaddingTopBottomIcon />}
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-4 row-span-1">
            <IconInput
              id="pl_input"
              type="number"
              value={element.styles.paddingLeft}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingLeft: e.target.valueAsNumber },
                });
              }}
              icon={<PaddingLeftIcon />}
            />
          </div>
          <div className="col-span-4 row-span-1">
            <IconInput
              id="pt_input"
              type="number"
              value={element.styles.paddingTop}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingTop: e.target.valueAsNumber },
                });
              }}
              icon={<PaddingTopIcon />}
            />
          </div>
        </>
      )}
      <div className="col-span-1 row-span-1">
        <TooltipSimple text="Individual padding">
          <div>
            <Toggle
              size="xs"
              pressed={isPaddingIndividual}
              onPressedChange={setIsPaddingIndividual}
            >
              <PaddingIndividualIcon />
            </Toggle>
          </div>
        </TooltipSimple>
      </div>
      {isPaddingIndividual && (
        <>
          <div className="col-span-4 row-span-1">
            <IconInput
              id="pr_input"
              type="number"
              value={element.styles.paddingRight}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingRight: e.target.valueAsNumber },
                });
              }}
              icon={<PaddingRightIcon />}
            />
          </div>
          <div className="col-span-4 row-span-1">
            <IconInput
              id="pb_input"
              type="number"
              value={element.styles.paddingBottom}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingBottom: e.target.valueAsNumber },
                });
              }}
              icon={<PaddingBottomIcon />}
            />
          </div>
        </>
      )}
    </div>
  );
}
