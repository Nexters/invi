import Container from "~/components/editor/elements/container";
import MapShareComponents from "~/components/editor/elements/map-share";
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
    case "map":
      return <MapShareComponents element={element} />;
    default:
      return null;
  }
}
