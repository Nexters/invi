"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PlusIcon, SettingsIcon, WrenchIcon } from "lucide-react";
import { editorTabValue } from "~/components/editor/constant";
import { useEditor } from "~/components/editor/provider";
import SidebarElementSettingsTab from "~/components/editor/sidebar-element-settings-tab";
import SidebarElementsTab from "~/components/editor/sidebar-elements-tab";
import SidebarSettingsTab from "~/components/editor/sidebar-settings-tab";
import type { EditorTabTypeValue } from "~/components/editor/type";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = {};

export default function EditorSidebar() {
  const { editor, dispatch } = useEditor();
  const isSelected =
    editor.state.selectedElement.id &&
    editor.state.selectedElement.id !== "__body";

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
              <SheetHeader className="p-6">
                <SheetTitle>도구상자</SheetTitle>
                <SheetDescription>
                  도구상자의 항목들을 작업 공간에 끌어다 놓을 수 있습니다.
                </SheetDescription>
              </SheetHeader>
              <SidebarElementsTab />
            </TabsContent>
            <TabsContent
              value={editorTabValue.SETTINGS}
              className="focus-visible:outline-none"
            >
              <SheetHeader className="p-6">
                <SheetTitle>초대장 설정</SheetTitle>
                <SheetDescription>
                  초대장 전체 스타일을 정해보세요. 색상, 글꼴를 바꿔 나만의
                  분위기를 만들 수 있어요.
                </SheetDescription>
              </SheetHeader>
              <SidebarSettingsTab />
            </TabsContent>
            <TabsContent
              value={editorTabValue.ELEMENT_SETTINGS}
              className="focus-visible:outline-none"
            >
              <SheetHeader className="p-6">
                <SheetTitle>
                  {editor.state.selectedElement.name} 설정
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <SidebarElementSettingsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
}
