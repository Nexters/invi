import {
  BoxSelectIcon,
  ChevronsDownUpIcon,
  ImageIcon,
  MapIcon,
  NavigationIcon,
  TypeIcon,
} from "lucide-react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElementType } from "~/components/editor/type";
import { LogoTextIcon } from "~/components/ui/icons";
import { cn } from "~/lib/utils";

type PlaceholderProps = {
  type: EditorElementType;
  children?: React.ReactNode;
  className?: string;
};

function Placeholder({ type, children, className }: PlaceholderProps) {
  const { dispatch } = useEditor();

  const handleDragStart = (e: React.DragEvent) => {
    if (type === null) return;

    e.dataTransfer.setData("action", "add");
    e.dataTransfer.setData("componentType", type);
    dispatch({ type: "SET_DRAGGING", payload: "ghost" });
    dispatch({ type: "CHANGE_CLICKED_ELEMENT", payload: {} });
  };

  const handleDragEnd = (e: React.DragEvent) => {
    dispatch({ type: "SET_DRAGGING", payload: "" });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "flex h-14 w-14 cursor-grab items-center justify-center gap-1 rounded-lg bg-muted/70 p-2 text-muted-foreground active:cursor-grabbing",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TextPlaceholder() {
  return (
    <Placeholder type="text">
      <TypeIcon size={40} className="text-muted-foreground" />
    </Placeholder>
  );
}

export function TwoColumnsPlaceholder() {
  return (
    <Placeholder type="2Col">
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted"></div>
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted"></div>
    </Placeholder>
  );
}

export function ContainerPlaceholder() {
  return (
    <Placeholder type="container">
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted" />
    </Placeholder>
  );
}

export function ImagePlaceholder() {
  return (
    <Placeholder type="image">
      <ImageIcon className="size-8" />
    </Placeholder>
  );
}

export function NavigationPlaceholder() {
  return (
    <Placeholder type="navigation">
      <NavigationIcon className="size-8" />
    </Placeholder>
  );
}

export function KakaoMapPlaceholder() {
  return (
    <Placeholder type="kakaoMap">
      <MapIcon className="size-8" />
    </Placeholder>
  );
}

export function BlankPlaceholder() {
  return (
    <Placeholder type="blank">
      <BoxSelectIcon className="size-8" />
    </Placeholder>
  );
}

export function LogoBannerPlaceholder() {
  return (
    <Placeholder type="logoBanner">
      <LogoTextIcon className="size-8" />
    </Placeholder>
  );
}

export function AccordionPlaceholder() {
  return (
    <Placeholder type="accordion">
      <ChevronsDownUpIcon className="size-8" />
    </Placeholder>
  );
}
