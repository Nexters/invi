import { KakaoAddressProvider } from "~/components/editor/elements/kakao-map-context";
import KakaoMapElement from "~/components/editor/elements/kakao-map-element";

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
