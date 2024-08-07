"use client";

import { Sheet, SheetContent } from "~/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PlusIcon, SettingsIcon, WrenchIcon } from "lucide-react";
import { editorTabValue } from "~/components/editor/constant";
import { useEditor } from "~/components/editor/provider";
import SidebarElementSettingsTab from "~/components/editor/sidebar-element-settings-tab";
import SidebarElementsTab from "~/components/editor/sidebar-elements-tab";
import SidebarSettingsTab from "~/components/editor/sidebar-settings-tab";
import type { EditorTabTypeValue } from "~/components/editor/type";
import { isValidSelectEditorElement } from "~/components/editor/util";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = {};

export default function EditorSidebar() {
  const { editor, dispatch } = useEditor();
  const isSelected = isValidSelectEditorElement(editor.state.selectedElement);

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
            "z-[80] mt-[85px] w-[50px] overflow-hidden p-0 shadow-none transition-all",
            editor.state.isPreviewMode && "hidden",
          )}
        >
          <TabsList className="flex w-full flex-col items-center gap-1 p-2">
            <TabsTrigger value={editorTabValue.ELEMENTS} asChild>
              <Button
                size="icon"
                variant="ghost"
                className="data-[state=active]:bg-secondary"
              >
                <PlusIcon />
              </Button>
            </TabsTrigger>
            <TabsTrigger value={editorTabValue.SETTINGS} asChild>
              <Button
                size="icon"
                variant="ghost"
                className="data-[state=active]:bg-secondary"
              >
                <SettingsIcon />
              </Button>
            </TabsTrigger>
            {isSelected && (
              <TabsTrigger value={editorTabValue.ELEMENT_SETTINGS} asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="data-[state=active]:bg-secondary"
                >
                  <WrenchIcon />
                </Button>
              </TabsTrigger>
            )}
          </TabsList>
        </SheetContent>
        <SheetContent
          side="right"
          className={cn(
            "z-[40] mr-[62px] mt-[85px] h-full w-[320px] overflow-hidden border-r p-0 shadow-none transition-all",
            editor.state.isPreviewMode && "hidden",
          )}
        >
          <div className="grid h-full gap-4 overflow-auto pb-36">
            <TabsContent
              value={editorTabValue.ELEMENTS}
              className="focus-visible:outline-none"
            >
              <SidebarElementsTab />
            </TabsContent>
            <TabsContent
              value={editorTabValue.SETTINGS}
              className="focus-visible:outline-none"
            >
              <SidebarSettingsTab />
            </TabsContent>
            <TabsContent
              value={editorTabValue.ELEMENT_SETTINGS}
              className="focus-visible:outline-none"
            >
              <SidebarElementSettingsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
}
