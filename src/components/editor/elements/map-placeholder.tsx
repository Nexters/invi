import { MapIcon } from "lucide-react";
import React from "react";
import type { EditorElementType } from "~/components/editor/type";

const MapPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorElementType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "map")}
      className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted"
    >
      <MapIcon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default MapPlaceholder;
