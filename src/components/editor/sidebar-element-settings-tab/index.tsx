"use client";

import { useEditor } from "~/components/editor/provider";
import BackgroundSetting from "~/components/editor/sidebar-element-settings-tab/background-setting";
import BorderSetting from "~/components/editor/sidebar-element-settings-tab/border-setting";
import ImageSetting from "~/components/editor/sidebar-element-settings-tab/image-setting";
import LayoutSetting from "~/components/editor/sidebar-element-settings-tab/layout-setting";
import MapSetting from "~/components/editor/sidebar-element-settings-tab/map-setting";
import TextSetting from "~/components/editor/sidebar-element-settings-tab/text-setting";
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";

type Props = {};

export default function SidebarElementSettingsTab(props: Props) {
  const { editor } = useEditor();
  const { selectedElement } = editor.state;

  return (
    <div className="w-full border-b">
      <SheetHeader className="p-6">
        <SheetTitle>{selectedElement.name} 설정</SheetTitle>
      </SheetHeader>

      {selectedElement.type === "map" && (
        <>
          <MapSetting element={selectedElement} />
          <LayoutSetting />
        </>
      )}

      {selectedElement.type === "text" && (
        <>
          <TextSetting />
        </>
      )}

      {selectedElement.type === "image" && (
        <>
          <ImageSetting element={selectedElement} />
        </>
      )}

      {(selectedElement.type === "container" ||
        selectedElement.type === "2Col") && (
        <>
          <LayoutSetting />
          <BackgroundSetting />
          <BorderSetting />
        </>
      )}
    </div>
  );
}
