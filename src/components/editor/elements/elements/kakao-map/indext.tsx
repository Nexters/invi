import { KakaoAddressProvider } from "~/components/editor/elements/elements/kakao-map/kakao-map-context";
import KakaoMapElement from "~/components/editor/elements/elements/kakao-map/kakao-map-element";

import type { EditorElement } from "~/components/editor/type";

type Props = {
  element: EditorElement;
};
export default function KakaoMap({ element }: Props) {
  return (
    <KakaoAddressProvider>
      <KakaoMapElement element={element} />
    </KakaoAddressProvider>
  );
}
