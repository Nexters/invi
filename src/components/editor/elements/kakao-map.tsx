import { KakaoAddressProvider } from "~/components/editor/elements/kakao-map-context";
import KakaoMapElement from "~/components/editor/elements/kakao-map-element";

import MapShareComponents from "~/components/editor/elements/map-share";
import type { EditorElement } from "~/components/editor/type";

type Props = {
  element: EditorElement;
};
export default function KakaoMap({ element }: Props) {
  return (
    <KakaoAddressProvider>
      {element.content.isMapUse && <KakaoMapElement element={element} />}
      {element.content.isShareUse && <MapShareComponents element={element} />}
    </KakaoAddressProvider>
  );
}
