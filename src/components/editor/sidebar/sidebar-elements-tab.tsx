import React from "react";
import {
  AccordionPlaceholder,
  BlankPlaceholder,
  ContainerPlaceholder,
  ImagePlaceholder,
  KakaoMapPlaceholder,
  LogoBannerPlaceholder,
  NavigationPlaceholder,
  TextPlaceholder,
  TwoColumnsPlaceholder,
} from "~/components/editor/placeholders";
import type { EditorElementType } from "~/components/editor/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

type Props = {};

export default function SidebarElementsTab(props: Props) {
  const elements: {
    id: EditorElementType;
    label: string;
    Component: React.ReactNode;
    group: "layout" | "elements";
  }[] = [
    {
      id: "container",
      label: "Container",
      Component: <ContainerPlaceholder />,
      group: "layout",
    },
    {
      id: "2Col",
      label: "2 Columns",
      Component: <TwoColumnsPlaceholder />,
      group: "layout",
    },
    {
      id: "blank",
      label: "Blank",
      Component: <BlankPlaceholder />,
      group: "layout",
    },
    {
      id: "text",
      label: "Text",
      Component: <TextPlaceholder />,
      group: "elements",
    },
    {
      id: "image",
      label: "Image",
      Component: <ImagePlaceholder />,
      group: "elements",
    },
    {
      id: "kakaoMap",
      label: "Map",
      Component: <KakaoMapPlaceholder />,
      group: "elements",
    },
    {
      id: "navigation",
      label: "Navigation",
      Component: <NavigationPlaceholder />,
      group: "elements",
    },
    {
      id: "logoBanner",
      label: "Logo Banner",
      Component: <LogoBannerPlaceholder />,
      group: "elements",
    },
    {
      id: "accordion",
      label: "Accordion",
      Component: <AccordionPlaceholder />,
      group: "elements",
    },
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <SheetHeader className="p-6">
        <SheetTitle>도구상자</SheetTitle>
        <SheetDescription>
          도구상자의 항목들을 작업 공간에 끌어다 놓을 수 있습니다.
        </SheetDescription>
      </SheetHeader>
      <AccordionItem value="Layout" className="select-none border-y-[1px]">
        <AccordionTrigger className="px-6">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-6 px-6">
          {elements
            .filter((element) => element.group === "layout")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center gap-1"
              >
                {element.Component}
                <span className="text-xs text-muted-foreground">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="select-none">
        <AccordionTrigger className="px-6">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-6 px-6">
          {elements
            .filter((element) => element.group === "elements")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center gap-1"
              >
                {element.Component}
                <span className="text-xs text-muted-foreground">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
