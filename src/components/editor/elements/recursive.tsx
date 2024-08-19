import BlankElement from "~/components/editor/elements/blank-element";
import Container from "~/components/editor/elements/container";
import ImageElement from "~/components/editor/elements/image-element";
import KakaoMap from "~/components/editor/elements/kakao-map";
import LogoBannerElement from "~/components/editor/elements/logo-banner-element";
import NavigationElement from "~/components/editor/elements/navigation-element";
import Text from "~/components/editor/elements/text";
import type { EditorElement } from "~/components/editor/type";

export default function Recursive({ element }: { element: EditorElement }) {
  switch (element.type) {
    case "__body":
    case "container":
    case "2Col":
      return <Container element={element} />;
    case "blank":
      return <BlankElement element={element} />;
    case "text":
      return <Text element={element} />;
    case "image":
      return <ImageElement element={element} />;
    case "kakaoMap":
      return <KakaoMap element={element} />;
    case "navigation":
      return <NavigationElement element={element} />;
    case "logoBanner":
      return <LogoBannerElement element={element} />;
    default:
      return null;
  }
}
