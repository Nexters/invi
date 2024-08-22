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
} from "~/components/editor/placeholders";
import type { EditorElementType } from "~/components/editor/type";
import { getElementName } from "~/components/editor/util";
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
    type: EditorElementType;
    Component: React.ReactNode;
    group: "layout" | "elements";
  }[] = [
    {
      type: "container",
      Component: <ContainerPlaceholder />,
      group: "layout",
    },
    {
      type: "blank",
      Component: <BlankPlaceholder />,
      group: "layout",
    },
    {
      type: "logoBanner",
      Component: <LogoBannerPlaceholder />,
      group: "layout",
    },
    {
      type: "text",
      Component: <TextPlaceholder />,
      group: "elements",
    },
    {
      type: "image",
      Component: <ImagePlaceholder />,
      group: "elements",
    },
    {
      type: "kakaoMap",
      Component: <KakaoMapPlaceholder />,
      group: "elements",
    },
    {
      type: "navigation",
      Component: <NavigationPlaceholder />,
      group: "elements",
    },
    {
      type: "accordion",
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
                key={element.type}
                className="flex flex-col items-center justify-center gap-1"
              >
                {element.Component}
                <span className="text-xs text-muted-foreground">
                  {getElementName(element.type)}
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
                key={element.type}
                className="flex flex-col items-center justify-center gap-1"
              >
                {element.Component}
                <span className="text-xs text-muted-foreground">
                  {getElementName(element.type)}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
