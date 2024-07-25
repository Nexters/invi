"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { PlusIcon, SettingsIcon } from "lucide-react";
import { useEditor } from "~/components/editor/provider";
import SidebarComponentTab from "~/components/editor/sidebar-component-tab";
import { cn } from "~/lib/utils";

type Props = {};

export default function EditorSidebar() {
  const { editor } = useEditor();

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Settings">
        <SheetContent
          side="right"
          className={cn(
            "z-[80] mt-[97px] w-16 overflow-hidden p-0 shadow-none transition-all focus:border-none",
            editor.state.previewMode && "hidden",
          )}
        >
          <TabsList className="flex h-fit w-full flex-col items-center justify-evenly gap-4 bg-transparent">
            <TabsTrigger
              value="Settings"
              className="h-10 w-10 p-0 data-[state=active]:bg-muted"
            >
              <SettingsIcon />
            </TabsTrigger>
            <TabsTrigger
              value="Components"
              className="h-10 w-10 p-0 data-[state=active]:bg-muted"
            >
              <PlusIcon />
            </TabsTrigger>
          </TabsList>
        </SheetContent>
        <SheetContent
          side="right"
          className={cn(
            "z-[40] mr-16 mt-[97px] h-full w-80 overflow-hidden bg-background p-0 shadow-none transition-all",
            editor.state.previewMode && "hidden",
          )}
        >
          <div className="grid h-full gap-4 overflow-scroll pb-36">
            <TabsContent value="Settings">
              <SheetHeader className="p-6 text-left">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SidebarComponentTab />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="p-6 text-left">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  You can drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <SidebarComponentTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
}
