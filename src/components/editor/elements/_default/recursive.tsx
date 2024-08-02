import KakaoMapElement from "~/components/editor/elements/elements/kakao-map/kakao-map";
import { KakaoAddressProvider } from "~/components/editor/elements/elements/kakao-map/kakao-map-context";
import Text from "~/components/editor/elements/elements/text/text";
import Container from "~/components/editor/elements/layout/container/container";
import TwoColumns from "~/components/editor/elements/layout/two-columns/two-columns";
import type { EditorElement } from "~/components/editor/type";

export default function Recursive({ element }: { element: EditorElement }) {
  switch (element.type) {
    case "__body":
      return <Container element={element} />;
    case "container":
      return <Container element={element} />;
    case "2Col":
      return <TwoColumns element={element} />;
    case "text":
      return <Text element={element} />;
    case "kakaoMap":
      return (
        <KakaoAddressProvider>
          <KakaoMapElement element={element} />
        </KakaoAddressProvider>
      );
    default:
      return null;
  }
}
