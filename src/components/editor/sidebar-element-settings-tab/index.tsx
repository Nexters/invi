"use client";

import { useEditor } from "~/components/editor/provider";
import AdvanceSetting from "~/components/editor/sidebar-element-settings-tab/advance-setting";
import LayoutSetting from "~/components/editor/sidebar-element-settings-tab/layout-setting";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Input } from "~/components/ui/input";
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";

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
          <LayoutSetting />
        </>
      )}

      <AccordionItem value="Advance" className="mt-auto border-t bg-muted/50">
        <AccordionTrigger className="px-6">고급 설정</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 p-0">
          <AdvanceSetting />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
