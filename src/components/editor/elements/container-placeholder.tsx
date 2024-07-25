import React from "react";
import type { EditorElementType } from "~/components/editor/type";

type Props = {};

export default function ContainerPlaceholder(props: Props) {
  const handleDragStart = (e: React.DragEvent, type: EditorElementType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "container")}
      className="flex h-14 w-14 flex-row gap-[4px] rounded-lg bg-muted/70 p-2"
    >
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted" />
    </div>
  );
}
