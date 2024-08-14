"use client";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { useEditor } from "~/components/editor/provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

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
          <div className="px-6 py-4">
            <h4 className="mb-3 text-sm font-medium">텍스트 설정</h4>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Text Align</p>
                <Tabs
                  onValueChange={(value) =>
                    handleOnChanges({
                      target: {
                        id: "textAlign",
                        value,
                      },
                    })
                  }
                  value={editor.state.selectedElement.styles.textAlign}
                >
                  <TabsList className="flex h-fit w-fit items-center justify-center border">
                    <TabsTrigger value="left" className="aspect-square">
                      <AlignLeft size={16} />
                    </TabsTrigger>
                    <TabsTrigger value="right" className="aspect-square">
                      <AlignRight size={16} />
                    </TabsTrigger>
                    <TabsTrigger value="center" className="aspect-square">
                      <AlignCenter size={16} />
                    </TabsTrigger>
                    <TabsTrigger value="justify" className="aspect-square">
                      <AlignJustify size={16} />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Font Family</p>
                <Input
                  id="DM Sans"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.fontFamily}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground">Color</Label>
                <div className="flex overflow-clip rounded-md border focus-within:ring-1 focus-within:ring-ring">
                  <div
                    className="w-12"
                    style={{
                      backgroundColor:
                        editor.state.selectedElement.styles.color,
                    }}
                  />
                  <Input
                    placeholder="#333"
                    className="mr-2 rounded-none border-y-0 border-r-0 focus-visible:ring-0"
                    id="color"
                    onChange={handleOnChanges}
                    value={editor.state.selectedElement.styles.color}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">Weight</p>
                  <Select
                    onValueChange={(e) =>
                      handleOnChanges({
                        target: {
                          id: "font-weight",
                          value: e,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Font Weights</SelectLabel>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="normal">Regular</SelectItem>
                        <SelectItem value="lighter">Light</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">Size</p>
                  <Input
                    placeholder="px"
                    id="fontSize"
                    onChange={handleOnChanges}
                    value={editor.state.selectedElement.styles.fontSize}
                  />
                </div>
              </div>
            </div>
          </div>
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
