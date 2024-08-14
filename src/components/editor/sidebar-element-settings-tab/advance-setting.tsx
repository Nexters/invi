"use client";

import { useEditor } from "~/components/editor/provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";

export default function AdvanceSetting() {
  const { editor, dispatch } = useEditor();

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    const styleValue = e.target.value;

    dispatch({
      type: "UPDATE_ELEMENT_STYLE",
      payload: {
        [styleSettings]: styleValue,
      },
    });
  };

  return (
    <Accordion type="single" collapsible defaultValue="Advance">
      <AccordionItem value="Advance" className="mt-auto border-t">
        <AccordionTrigger className="px-6">고급 설정</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 p-0">
          <div className="flex flex-col gap-6 px-6 py-4">
            <div>
              <Label className="text-muted-foreground">Opacity</Label>
              <div className="flex items-center justify-end">
                <small>
                  {typeof editor.state.selectedElement.styles?.opacity ===
                  "number"
                    ? editor.state.selectedElement.styles?.opacity
                    : parseFloat(
                        (
                          editor.state.selectedElement.styles?.opacity || "0"
                        ).replace("%", ""),
                      ) || 0}
                  %
                </small>
              </div>
              <Slider
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: "opacity",
                      value: `${e[0]}%`,
                    },
                  });
                }}
                defaultValue={[
                  typeof editor.state.selectedElement.styles?.opacity ===
                  "number"
                    ? editor.state.selectedElement.styles?.opacity
                    : parseFloat(
                        (
                          editor.state.selectedElement.styles?.opacity || "0"
                        ).replace("%", ""),
                      ) || 0,
                ]}
                max={100}
                step={1}
              />
            </div>
            <div>
              <Label className="text-muted-foreground">Border Radius</Label>
              <div className="flex items-center justify-end">
                <small className="">
                  {typeof editor.state.selectedElement.styles?.borderRadius ===
                  "number"
                    ? editor.state.selectedElement.styles?.borderRadius
                    : parseFloat(
                        (
                          editor.state.selectedElement.styles?.borderRadius ||
                          "0"
                        ).replace("px", ""),
                      ) || 0}
                  px
                </small>
              </div>
              <Slider
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: "borderRadius",
                      value: `${e[0]}px`,
                    },
                  });
                }}
                defaultValue={[
                  typeof editor.state.selectedElement.styles?.borderRadius ===
                  "number"
                    ? editor.state.selectedElement.styles?.borderRadius
                    : parseFloat(
                        (
                          editor.state.selectedElement.styles?.borderRadius ||
                          "0"
                        ).replace("%", ""),
                      ) || 0,
                ]}
                max={100}
                step={1}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Background Color</Label>
              <div className="flex overflow-clip rounded-md border focus-within:ring-1 focus-within:ring-ring">
                <div
                  className="w-12"
                  style={{
                    backgroundColor:
                      editor.state.selectedElement.styles.backgroundColor,
                  }}
                />
                <Input
                  placeholder="#HFI245"
                  className="mr-2 rounded-none border-y-0 border-r-0 focus-visible:ring-0"
                  id="backgroundColor"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.backgroundColor}
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
