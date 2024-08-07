import React from "react";
import ContainerPlaceholder from "~/components/editor/elements/container-placeholder";
import MapPlaceholder from "~/components/editor/elements/map-placeholder";
import TextPlaceholder from "~/components/editor/elements/text-placeholder";
import TwoColumnsPlaceholder from "~/components/editor/elements/two-columns-placeholder";
import type { EditorElementType } from "~/components/editor/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

type Props = {};

export default function SidebarElementsTab(props: Props) {
  const elements: {
    id: EditorElementType;
    label: string;
    Component: React.ReactNode;
    group: "layout" | "elements";
  }[] = [
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: "2 Columns",
      id: "2Col",
      group: "layout",
    },
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
    {
      Component: <MapPlaceholder />,
      label: "map",
      id: "map",
      group: "elements",
    },
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value="Layout" className="border-y-[1px] px-6 py-0">
        <AccordionTrigger>Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-6">
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
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger>Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-6">
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
