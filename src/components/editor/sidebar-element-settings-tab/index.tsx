"use client";

import { useEditor } from "~/components/editor/provider";
import AdvanceSetting from "~/components/editor/sidebar-element-settings-tab/advance-setting";
import LayoutSetting from "~/components/editor/sidebar-element-settings-tab/layout-setting";
import MapSetting from "~/components/editor/sidebar-element-settings-tab/map-setting";
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";

type Props = {};

export default function SidebarElementSettingsTab(props: Props) {
  const { editor } = useEditor();

  return (
    <div className="w-full">
      <SheetHeader className="border-b p-6">
        <SheetTitle>{editor.state.selectedElement.name} 설정</SheetTitle>
      </SheetHeader>

      {!Array.isArray(editor.state.selectedElement.content) &&
        editor.state.selectedElement.type === "map" && (
          <>
            <MapSetting element={editor.state.selectedElement} />
          </>
        )}

      {editor.state.selectedElement.type === "container" && (
        <>
          <LayoutSetting />
        </>
      )}

      <AdvanceSetting />
    </div>
  );
}
