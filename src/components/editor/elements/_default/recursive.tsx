import KakaoMap from "~/components/editor/elements/elements/kakao-map/indext";
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
      return <KakaoMap element={element} />;
    default:
      return null;
  }
}
