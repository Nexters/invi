"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PlusIcon, SettingsIcon } from "lucide-react";
import { useEditor } from "~/components/editor/provider";
import SidebarElementsTab from "~/components/editor/sidebar-elements-tab";
import SidebarSettingsTab from "~/components/editor/sidebar-settings-tab";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = {};

export default function EditorSidebar() {
  const { editor } = useEditor();

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Components">
        <SheetContent
          side="right"
          className={cn(
            "z-[80] mt-[85px] w-[50px] overflow-hidden p-0 shadow-none transition-all",
            editor.state.isPreviewMode && "hidden",
          )}
        >
          <TabsList className="flex w-full flex-col items-center gap-1 p-2">
            <TabsTrigger value="Elements" asChild>
              <Button
                size="icon"
                variant="ghost"
                className="data-[state=active]:bg-secondary"
              >
                <PlusIcon />
              </Button>
            </TabsTrigger>
            <TabsTrigger value="Settings" asChild>
              <Button
                size="icon"
                variant="ghost"
                className="data-[state=active]:bg-secondary"
              >
                <SettingsIcon />
              </Button>
            </TabsTrigger>
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
              value="Settings"
              className="focus-visible:outline-none"
            >
              <SheetHeader className="p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SidebarSettingsTab />
            </TabsContent>
            <TabsContent
              value="Elements"
              className="focus-visible:outline-none"
            >
              <SheetHeader className="p-6">
                <SheetTitle>도구상자</SheetTitle>
                <SheetDescription>
                  도구상자의 항목들을 작업 공간에 끌어다 놓을 수 있습니다.
                </SheetDescription>
              </SheetHeader>
              <SidebarElementsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
}
