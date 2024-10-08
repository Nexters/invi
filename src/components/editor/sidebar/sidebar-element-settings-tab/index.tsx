"use client";

import { useEditor } from "~/components/editor/provider";
import AccordionSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/accordion-setting";
import BackgroundSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/background-setting";
import BorderSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/border-setting";
import ImageSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/image-setting";
import KakaoMapSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/kakao-map-setting";
import LayoutSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/layout-setting";
import LogoBannerSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/logo-banner-setting";
import MapSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/map-setting";
import ShareSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/share-setting";
import TextSetting from "~/components/editor/sidebar/sidebar-element-settings-tab/text-setting";
import { getElementName } from "~/components/editor/util";
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";

type Props = {};

export default function SidebarElementSettingsTab(props: Props) {
  const { editor } = useEditor();
  const { selectedElement } = editor.state;

  return (
    <div className="w-full border-b">
      <SheetHeader className="p-6">
        <SheetTitle>{getElementName(selectedElement.type)} 설정</SheetTitle>
      </SheetHeader>

      <div key={selectedElement.id}>
        {selectedElement.type === "kakaoMap" && (
          <>
            <KakaoMapSetting />
          </>
        )}
        {selectedElement.type === "navigation" && (
          <>
            <MapSetting element={selectedElement} />
            <LayoutSetting />
          </>
        )}

        {selectedElement.type === "text" && (
          <>
            <LayoutSetting />
            <TextSetting />
          </>
        )}

        {selectedElement.type === "image" && (
          <>
            <ImageSetting element={selectedElement} />
          </>
        )}

        {(selectedElement.type === "__body" ||
          selectedElement.type === "container" ||
          selectedElement.type === "2Col") && (
          <>
            <LayoutSetting />
            <TextSetting />
            <BackgroundSetting />
            <BorderSetting />
          </>
        )}

        {selectedElement.type === "blank" && (
          <>
            <LayoutSetting />
          </>
        )}

        {selectedElement.type === "logoBanner" && (
          <>
            <LogoBannerSetting />
          </>
        )}

        {selectedElement.type === "accordion" && (
          <>
            <AccordionSetting />
          </>
        )}

        {selectedElement.type === "share" && (
          <>
            <ShareSetting />
          </>
        )}
      </div>
    </div>
  );
}
