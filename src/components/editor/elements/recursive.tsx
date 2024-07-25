import Container from "~/components/editor/elements/container";
import Text from "~/components/editor/elements/text";
import type { EditorElement } from "~/components/editor/type";

export default function Recursive({ element }: { element: EditorElement }) {
  switch (element.type) {
    case "text":
      return <Text element={element} />;
    case "container":
      return <Container element={element} />;
    case "video":
      //   return <VideoComponent element={element} />;
      return <Container element={element} />;
    case "contactForm":
      //   return <ContactFormComponent element={element} />;
      return <Container element={element} />;
    case "paymentForm":
      //   return <Checkout element={element} />;
      return <Container element={element} />;
    case "2Col":
      //   return <Container element={element} />;
      return <Container element={element} />;
    case "__body":
      //   return <Container element={element} />;
      return <Container element={element} />;
    case "link":
      //   return <LinkComponent element={element} />;
      return <Container element={element} />;
    default:
      return null;
  }
}
