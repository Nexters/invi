import { KakaoAddressProvider } from "~/components/editor/elements/kakao-map-context";
import KakaoMapElement from "~/components/editor/elements/kakao-map-element";

import ElementWrapper from "~/components/editor/elements/element-wrapper";
import NavigationElement from "~/components/editor/elements/navigation-element";
import type { InferEditorElement } from "~/components/editor/type";

type Props = {
  element: InferEditorElement<"kakaoMap">;
};
export default function KakaoMap({ element }: Props) {
  return (
    <ElementWrapper element={element}>
      <KakaoAddressProvider>
        {element.content.isMapUse && <KakaoMapElement element={element} />}
        {element.content.isShareUse && (
          <NavigationElement
            element={element as unknown as InferEditorElement<"navigation">}
            className="mt-2"
          />
        )}
      </KakaoAddressProvider>
    </ElementWrapper>
  );
}
