import type { EditorElementType } from "~/components/editor/type";
import { cn } from "~/lib/utils";

type Props = {
  type: EditorElementType;
  children?: React.ReactNode;
  className?: string;
};

export default function Placeholder({ type, children, className }: Props) {
  const handleDragStart = (e: React.DragEvent) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={cn(
        "flex h-14 w-14 cursor-grab flex-row gap-1 rounded-lg bg-muted/70 p-2 active:cursor-grabbing",
        className,
      )}
    >
      {children}
    </div>
  );
}
