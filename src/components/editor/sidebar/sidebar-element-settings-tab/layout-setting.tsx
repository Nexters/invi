"use client";

import { HeightIcon, WidthIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useEditor } from "~/components/editor/provider";
import AlignInputBox from "~/components/editor/ui/align-input-box";
import FlexToggleGroup from "~/components/editor/ui/flex-toggle-group";
import { EditorInput } from "~/components/editor/ui/input";
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
        <EditorInput
          id="width_input"
          defaultValue={element.styles.width}
          onDebounceChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { width: e.target.value },
            })
          }
          componentPrefix={<WidthIcon />}
        />
      </div>
      <div className="col-span-4 row-span-1">
        <EditorInput
          id="height_input"
          defaultValue={element.styles.height}
          onDebounceChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { height: e.target.value },
            })
          }
          componentPrefix={<HeightIcon />}
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
        <EditorInput
          id="gap_input"
          type="number"
          defaultValue={element.styles.gap}
          onDebounceChange={(e) =>
            dispatch({
              type: "UPDATE_ELEMENT_STYLE",
              payload: { gap: e.target.valueAsNumber },
            })
          }
          componentPrefix={<GapIcon />}
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
            <EditorInput
              id="px-input"
              type="number"
              defaultValue={element.styles.paddingLeft}
              onDebounceChange={(e) => {
                const newValue = e.target.valueAsNumber;
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingLeft: newValue, paddingRight: newValue },
                });
              }}
              componentPrefix={<PaddingLeftRightIcon />}
            />
          </div>
          <div className="col-span-4 row-span-1">
            <EditorInput
              id="py_input"
              type="number"
              defaultValue={element.styles.paddingTop}
              onDebounceChange={(e) => {
                const newValue = e.target.valueAsNumber;
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingTop: newValue, paddingBottom: newValue },
                });
              }}
              componentPrefix={<PaddingTopBottomIcon />}
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-4 row-span-1">
            <EditorInput
              id="pl_input"
              type="number"
              defaultValue={element.styles.paddingLeft}
              onDebounceChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingLeft: e.target.valueAsNumber },
                });
              }}
              componentPrefix={<PaddingLeftIcon />}
            />
          </div>
          <div className="col-span-4 row-span-1">
            <EditorInput
              id="pt_input"
              type="number"
              defaultValue={element.styles.paddingTop}
              onDebounceChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingTop: e.target.valueAsNumber },
                });
              }}
              componentPrefix={<PaddingTopIcon />}
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
            <EditorInput
              id="pr_input"
              type="number"
              defaultValue={element.styles.paddingRight}
              onDebounceChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingRight: e.target.valueAsNumber },
                });
              }}
              componentPrefix={<PaddingRightIcon />}
            />
          </div>
          <div className="col-span-4 row-span-1">
            <EditorInput
              id="pb_input"
              type="number"
              defaultValue={element.styles.paddingBottom}
              onDebounceChange={(e) => {
                dispatch({
                  type: "UPDATE_ELEMENT_STYLE",
                  payload: { paddingBottom: e.target.valueAsNumber },
                });
              }}
              componentPrefix={<PaddingBottomIcon />}
            />
          </div>
        </>
      )}
    </div>
  );
}
