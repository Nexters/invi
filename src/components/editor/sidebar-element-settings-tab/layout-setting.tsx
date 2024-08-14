"use client";

import { HeightIcon, WidthIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useEditor } from "~/components/editor/provider";
import AlignInputBox from "~/components/editor/ui/align-input-box";
import FlexToggleGroup from "~/components/editor/ui/flex-toggle-group";
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
import TooltipSimple from "~/components/ui/tooltip-simple";

export default function LayoutSetting() {
  return (
    <div className="space-y-1 border-t p-6 pt-4">
      <div className="flex h-10 items-center">
        <h4 className="text-sm font-medium">레이아웃 설정</h4>
      </div>
      <WidthHeightSection />
      <FlexBoxSection />
      <PaddingSection />
    </div>
  );
}

function WidthHeightSection() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  return (
    <div className="grid w-full grid-cols-9 gap-1">
      <div className="col-span-4 row-span-1">
        <IconInput
          id="width_input"
          value={element.styles.width}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { width: e.target.value },
            })
          }
          icon={<WidthIcon />}
        />
      </div>
      <div className="col-span-4 row-span-1">
        <IconInput
          id="height_input"
          value={element.styles.height}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { height: e.target.value },
            })
          }
          icon={<HeightIcon />}
        />
      </div>
    </div>
  );
}

function FlexBoxSection() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  return (
    <div className="grid w-full grid-cols-9 gap-1">
      <div className="col-span-4 row-span-1 flex items-start">
        <FlexToggleGroup
          value={{
            flexDirection: element.styles.flexDirection,
            flexWrap: element.styles.flexWrap,
          }}
          onChangeValue={(value) => {
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: {
                flexDirection: value.flexDirection,
                flexWrap: value.flexWrap,
              },
            });
          }}
        />
      </div>
      <div className="col-span-4 row-span-2 flex items-start">
        <AlignInputBox
          value={{
            alignItems: element.styles.alignItems,
            justifyContent: element.styles.justifyContent,
          }}
          onChangeValue={(value) => {
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: {
                alignItems: value.alignItems,
                justifyContent: value.justifyContent,
              },
            });
          }}
        />
      </div>
      <div className="col-span-4 row-span-1">
        <IconInput
          id="gap_input"
          type="number"
          value={element.styles.gap}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { gap: e.target.valueAsNumber },
            })
          }
          icon={<GapIcon />}
        />
      </div>
    </div>
  );
}

function PaddingSection() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  const [isPaddingIndividual, setIsPaddingIndividual] = useState(false);

  const togglePaddingIndividual = (isIndividual: boolean) => {
    dispatch({
      type: "UPDATE_ELEMENT_STYLE",
      payload: {
        paddingRight: element.styles.paddingRight,
        paddingBottom: element.styles.paddingTop,
      },
    });
    setIsPaddingIndividual(isIndividual);
  };

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
              onPressedChange={togglePaddingIndividual}
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
