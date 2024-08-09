"use client";

import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  LucideImageDown,
} from "lucide-react";
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
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...editor.state.selectedElement,
          styles: {
            ...editor.state.selectedElement.styles,
            ...styleObject,
          },
        },
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
                <p className="text-muted-foreground">Color</p>
                <Input
                  id="color"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.color}
                />
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
          <div className="px-6 py-4">
            <h4 className="mb-3 text-sm font-medium">레이아웃 설정</h4>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input
                      id="height"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.state.selectedElement.styles.height}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input
                      placeholder="px"
                      id="width"
                      onChange={handleOnChanges}
                      value={editor.state.selectedElement.styles.width}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Padding px</p>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      placeholder="px"
                      id="paddingTop"
                      onChange={handleOnChanges}
                      value={editor.state.selectedElement.styles.paddingTop}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="paddingBottom"
                      onChange={handleOnChanges}
                      value={editor.state.selectedElement.styles.paddingBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="paddingLeft"
                      onChange={handleOnChanges}
                      value={editor.state.selectedElement.styles.paddingLeft}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="paddingRight"
                      onChange={handleOnChanges}
                      value={editor.state.selectedElement.styles.paddingRight}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-6">
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
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Background Image</Label>
              <div className="flex overflow-clip rounded-md border focus-within:ring-1 focus-within:ring-ring">
                <div
                  className="w-12"
                  style={{
                    backgroundImage:
                      editor.state.selectedElement.styles.backgroundImage,
                  }}
                />
                <Input
                  placeholder="url()"
                  className="mr-2 rounded-none border-y-0 border-r-0 focus-visible:ring-0"
                  id="backgroundImage"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.backgroundImage}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Image Position</Label>
              <Tabs
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "backgroundSize",
                      value: e,
                    },
                  })
                }
                value={editor.state.selectedElement.styles.backgroundSize?.toString()}
              >
                <TabsList className="flex h-fit w-fit items-center border">
                  <TabsTrigger value="cover" className="aspect-square">
                    <ChevronsLeftRightIcon size={16} />
                  </TabsTrigger>
                  <TabsTrigger value="contain" className="aspect-square">
                    <AlignVerticalJustifyCenter size={16} />
                  </TabsTrigger>
                  <TabsTrigger value="auto" className="aspect-square">
                    <LucideImageDown size={16} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-6">
            <div className="flex items-center gap-2">
              <Input
                className="h-4 w-4"
                placeholder="px"
                type="checkbox"
                id="display"
                onChange={(va) => {
                  handleOnChanges({
                    target: {
                      id: "display",
                      value: va.target.checked ? "flex" : "block",
                    },
                  });
                }}
              />
              <Label className="text-muted-foreground">Flex</Label>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Justify Content</Label>
              <Tabs
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "justifyContent",
                      value: e,
                    },
                  })
                }
                value={editor.state.selectedElement.styles.justifyContent}
              >
                <TabsList className="flex h-fit w-fit items-center border">
                  <TabsTrigger value="space-between" className="aspect-square">
                    <AlignHorizontalSpaceBetween size={16} />
                  </TabsTrigger>
                  <TabsTrigger value="space-evenly" className="aspect-square">
                    <AlignHorizontalSpaceAround size={16} />
                  </TabsTrigger>
                  <TabsTrigger value="center" className="aspect-square">
                    <AlignHorizontalJustifyCenterIcon size={16} />
                  </TabsTrigger>
                  <TabsTrigger value="start" className="aspect-square">
                    <AlignHorizontalJustifyStart size={16} />
                  </TabsTrigger>
                  <TabsTrigger value="end" className="aspect-square">
                    <AlignHorizontalJustifyEndIcon size={16} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Align Items</Label>
              <Tabs
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "alignItems",
                      value: e,
                    },
                  })
                }
                value={editor.state.selectedElement.styles.alignItems}
              >
                <TabsList className="flex h-fit w-fit items-center border">
                  <TabsTrigger value="center" className="aspect-square">
                    <AlignVerticalJustifyCenter size={16} />
                  </TabsTrigger>
                  <TabsTrigger value="normal" className="aspect-square">
                    <AlignVerticalJustifyStart size={16} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
