"use client";

import {
  AlignCenter,
  AlignCenterIcon,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignLeftIcon,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ArrowDownIcon,
  ArrowRightIcon,
  ChevronsLeftRightIcon,
  CornerDownLeftIcon,
  DotIcon,
  LucideImageDown,
  type LucideProps,
} from "lucide-react";
import { useState } from "react";
import { useEditor } from "~/components/editor/provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
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
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";
import { Slider } from "~/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";

type Props = {};

export default function SidebarElementSettingsTab(props: Props) {
  const { editor, dispatch } = useEditor();

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...editor.state.selectedElement,
          type: "map",
          content: {
            ...editor.state.selectedElement.content,
            address: e.target.value,
          },
        },
      },
    });
  };

  return (
    <Accordion type="multiple" className="w-full" defaultValue={["Map"]}>
      <SheetHeader className="border-b p-6">
        <SheetTitle>{editor.state.selectedElement.name} 설정</SheetTitle>
      </SheetHeader>

      {!Array.isArray(editor.state.selectedElement.content) &&
        editor.state.selectedElement.type === "map" && (
          <>
            <AccordionItem value="Map" className="border-0 border-t py-2">
              <AccordionTrigger className="px-6 py-2">주소</AccordionTrigger>
              <AccordionContent className="flex flex-col justify-center gap-2 px-6 py-1">
                <Input
                  id="address"
                  placeholder="Enter your address"
                  onChange={handleAddressInputChange}
                  value={editor.state.selectedElement.content.address}
                />
              </AccordionContent>
            </AccordionItem>
          </>
        )}

      {editor.state.selectedElement.type === "container" && (
        <>
          <AutoLayout />
        </>
      )}

      <AccordionItem value="Advance" className="mt-auto border-t bg-muted/50">
        <AccordionTrigger className="px-6">고급 설정</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 p-0">
          <AdvanceMode />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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

function LayoutInput({
  id,
  icon,
  ...props
}: { icon: React.ReactNode } & React.ComponentProps<"input">) {
  return (
    <div className="-ml-0.5 mr-2 flex h-7 items-center gap-2 rounded-sm px-1.5 py-0.5 ring-border focus-within:bg-secondary hover:ring-1">
      <label htmlFor={id}>{icon}</label>
      <input
        type="number"
        id={id}
        defaultValue={10}
        {...props}
        className="f-full w-full flex-1 bg-transparent text-sm focus-visible:outline-none"
      />
    </div>
  );
}

function AutoLayout() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="px-6 py-4">
      <p className="mb-3 text-sm font-medium">레이아웃 설정</p>
      <div className="grid w-full grid-cols-9 gap-1">
        <div className="col-span-4 row-span-1 flex items-start">
          <ToggleGroup
            type="single"
            className="gap-[1px] rounded-sm ring-border ring-offset-1 hover:ring-1"
            defaultValue="flex-col"
          >
            <ToggleGroupItem
              className="aspect-square h-7 w-7 rounded-sm p-0"
              value="flex-col"
              aria-label="Vertical layout"
            >
              <ArrowDownIcon size={13} />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="aspect-square h-7 w-7 rounded-sm p-0"
              value="flex"
              aria-label="Horizontal layout"
            >
              <ArrowRightIcon size={13} />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="aspect-square h-7 w-7 rounded-sm p-0"
              value="flex-wrap"
              aria-label="Wrap"
            >
              <CornerDownLeftIcon size={13} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="col-span-5 row-span-2 flex items-start">
          <AlignInput />
        </div>
        <div className="col-span-4 row-span-1">
          <LayoutInput id="gap_input" icon={<GapIcon />} />
        </div>
        {!toggle ? (
          <>
            <div className="col-span-4 row-span-1">
              <LayoutInput id="px-input" icon={<PaddingLeftRightIcon />} />
            </div>
            <div className="col-span-4 row-span-1">
              <LayoutInput id="py_input" icon={<PaddingTopBottomIcon />} />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-4 row-span-1">
              <LayoutInput id="pl_input" icon={<PaddingLeftIcon />} />
            </div>
            <div className="col-span-4 row-span-1">
              <LayoutInput id="pt_input" icon={<PaddingTopIcon />} />
            </div>
          </>
        )}
        <div className="col-span-1 row-span-1">
          <button
            className="flex h-7 items-center justify-center"
            onClick={() => setToggle(!toggle)}
          >
            <PaddingIndividualIcon />
          </button>
        </div>
        {toggle && (
          <>
            <div className="col-span-4 row-span-1">
              <LayoutInput id="pr_input" icon={<PaddingRightIcon />} />
            </div>
            <div className="col-span-4 row-span-1">
              <LayoutInput id="pb_input" icon={<PaddingBottomIcon />} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AdvanceMode() {
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
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="Typography" className="border-t">
        <AccordionTrigger className="px-6">Typography</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-6">
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions">
        <AccordionTrigger className="px-6">Dimensions</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6 px-6">
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
            <p>Margin px</p>
            <div className="flex gap-4">
              <div>
                <Label className="text-muted-foreground">Top</Label>
                <Input
                  id="marginTop"
                  placeholder="px"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.marginTop}
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Bottom</Label>
                <Input
                  placeholder="px"
                  id="marginBottom"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.marginBottom}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <Label className="text-muted-foreground">Left</Label>
                <Input
                  placeholder="px"
                  id="marginLeft"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.marginLeft}
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Right</Label>
                <Input
                  placeholder="px"
                  id="marginRight"
                  onChange={handleOnChanges}
                  value={editor.state.selectedElement.styles.marginRight}
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations">
        <AccordionTrigger className="px-6">Decorations</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6 px-6">
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
                typeof editor.state.selectedElement.styles?.opacity === "number"
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
                        editor.state.selectedElement.styles?.borderRadius || "0"
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
                        editor.state.selectedElement.styles?.borderRadius || "0"
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="border-none">
        <AccordionTrigger className="px-6">Flexbox</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6 px-6">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
