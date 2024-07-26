import Placeholder from "~/components/editor/elements/placeholder";

type Props = {};

export default function ContainerPlaceholder(props: Props) {
  return (
    <Placeholder type="container">
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted" />
    </Placeholder>
  );
}
