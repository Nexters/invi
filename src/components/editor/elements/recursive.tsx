import Container from "~/components/editor/elements/container";
import Image from "~/components/editor/elements/image";
import KakaoMap from "~/components/editor/elements/kakao-map";
import Text from "~/components/editor/elements/text";
import type { EditorElement } from "~/components/editor/type";

export default function Recursive({ element }: { element: EditorElement }) {
  switch (element.type) {
    case "__body":
      return <Container element={element} />;
    case "container":
      return <Container element={element} />;
    case "2Col":
      return <Container element={element} />;
    case "text":
      return <Text element={element} />;
    case "image":
      return <Image element={element} />;
    case "kakaoMap":
      return <KakaoMap element={element} />;
    default:
      return null;
  }
}
