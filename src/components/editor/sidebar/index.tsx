"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PlusIcon, SettingsIcon, WrenchIcon } from "lucide-react";
import { editorTabValue } from "~/components/editor/constant";
import { useEditor } from "~/components/editor/provider";
import SidebarElementSettingsTab from "~/components/editor/sidebar/sidebar-element-settings-tab";
import SidebarElementsTab from "~/components/editor/sidebar/sidebar-elements-tab";
import SidebarSettingsTab from "~/components/editor/sidebar/sidebar-settings-tab";
import type { EditorTabTypeValue } from "~/components/editor/type";
import { isValidSelectEditorElement } from "~/components/editor/util";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

type Props = {};

export default function EditorSidebar() {
  const { editor, dispatch } = useEditor();

  const tabs = [
    {
      value: editorTabValue.ELEMENTS,
      icon: <PlusIcon />,
      content: <SidebarElementsTab />,
    },
    {
      value: editorTabValue.SETTINGS,
      icon: <SettingsIcon />,
      content: <SidebarSettingsTab />,
    },
    {
      value: editorTabValue.ELEMENT_SETTINGS,
      icon: <WrenchIcon />,
      content: <SidebarElementSettingsTab />,
      isHidden: () => !isValidSelectEditorElement(editor.state.selectedElement),
    },
  ];

  return (
    <Sheet open={true} modal={false}>
      <Tabs
        className="w-full"
        value={editor.state.currentTabValue}
        onValueChange={(value) =>
          dispatch({
            type: "CHANGE_CURRENT_TAB_VALUE",
            payload: { value: value as EditorTabTypeValue },
          })
        }
      >
        <SheetContent
          side="right"
          className={cn(
            "z-40 mt-[86px] w-[50px] overflow-hidden p-0 shadow-none transition-all",
            editor.state.isPreviewMode && "hidden",
          )}
        >
          <TabsList className="flex w-full flex-col items-center gap-1 p-2">
            {tabs.map((tab) => {
              if (tab.isHidden?.() === true) {
                return null;
              }

              return (
                <TabsTrigger
                  key={`${tab.value}-trigger`}
                  value={tab.value}
                  asChild
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="data-[state=active]:bg-secondary"
                  >
                    {tab.icon}
                  </Button>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </SheetContent>
        <SheetContent
          side="right"
          className={cn(
            "z-30 mr-[62px] mt-[86px] h-full w-[320px] overflow-hidden border-r p-0 shadow-none transition-all",
            editor.state.isPreviewMode && "hidden",
          )}
        >
          <div className="grid h-full gap-4 overflow-auto pb-36">
            {tabs.map((tab) => {
              return (
                <TabsContent
                  key={`${tab.value}-content`}
                  value={tab.value}
                  className="focus-visible:outline-none"
                >
                  {tab.content}
                </TabsContent>
              );
            })}
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
}
