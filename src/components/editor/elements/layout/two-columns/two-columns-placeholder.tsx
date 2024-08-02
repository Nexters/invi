import Placeholder from "~/components/editor/elements/_default/placeholder";

type Props = {};

export default function TwoColumnsPlaceholder(props: Props) {
  return (
    <Placeholder type="2Col">
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted"></div>
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted"></div>
    </Placeholder>
  );
}
