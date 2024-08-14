"use client";

import { useEditor } from "~/components/editor/provider";
import AdvanceSetting from "~/components/editor/sidebar-element-settings-tab/advance-setting";
import BorderSetting from "~/components/editor/sidebar-element-settings-tab/border-setting";
import LayoutSetting from "~/components/editor/sidebar-element-settings-tab/layout-setting";
import MapSetting from "~/components/editor/sidebar-element-settings-tab/map-setting";
import TextSetting from "~/components/editor/sidebar-element-settings-tab/text-setting";
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";

type Props = {};

export default function SidebarElementSettingsTab(props: Props) {
  const { editor } = useEditor();
  const { selectedElement } = editor.state;

  return (
    <div className="w-full">
      <SheetHeader className="p-6">
        <SheetTitle>{selectedElement.name} 설정</SheetTitle>
      </SheetHeader>

      {!Array.isArray(selectedElement.content) &&
        selectedElement.type === "map" && (
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

      {selectedElement.type === "container" && (
        <>
          <LayoutSetting />
          <BorderSetting />
        </>
      )}

      <AdvanceSetting />
    </div>
  );
}
