import { TypeIcon } from "lucide-react";
import Placeholder from "~/components/editor/elements/_default/placeholder";

type Props = {};

export default function TextPlaceholder(props: Props) {
  return (
    <Placeholder type="text">
      <TypeIcon size={40} className="text-muted-foreground" />
    </Placeholder>
  );
}
