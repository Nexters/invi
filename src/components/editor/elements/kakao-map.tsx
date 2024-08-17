import { KakaoAddressProvider } from "~/components/editor/elements/kakao-map-context";
import KakaoMapElement from "~/components/editor/elements/kakao-map-element";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import MapShareComponents from "~/components/editor/elements/map-share";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"kakaoMap">;
};
export default function KakaoMap({ element }: Props) {
  return (
    <ElementWrapper element={element}>
      <KakaoAddressProvider>
        {element.content.isMapUse && <KakaoMapElement element={element} />}
        {element.content.isShareUse && <MapShareComponents element={element} />}
      </KakaoAddressProvider>
    </ElementWrapper>
  );
}
