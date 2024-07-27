import Container from "~/components/editor/elements/container";
import Text from "~/components/editor/elements/text";
import TwoColumns from "~/components/editor/elements/two-columns";
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
    default:
      return null;
  }
}
