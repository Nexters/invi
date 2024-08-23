import {
  BoxSelectIcon,
  ChevronsDownUpIcon,
  MapIcon,
  NavigationIcon,
  SquareIcon,
  TypeIcon,
} from "lucide-react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElementType } from "~/components/editor/type";
import { ImageSolidIcon, LogoTextIcon } from "~/components/ui/icons";
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
        "flex h-14 w-14 cursor-grab items-center justify-center gap-1.5 rounded-lg bg-muted/70 p-2 text-muted-foreground active:cursor-grabbing",
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
      <TypeIcon className="size-6" />
    </Placeholder>
  );
}

export function TwoColumnsPlaceholder() {
  return (
    <Placeholder type="2Col" className="gap-0.5">
      <BoxSelectIcon className="size-5" />
      <BoxSelectIcon className="size-5" />
    </Placeholder>
  );
}

export function ContainerPlaceholder() {
  return (
    <Placeholder type="container">
      <SquareIcon className="size-6" />
    </Placeholder>
  );
}

export function ImagePlaceholder() {
  return (
    <Placeholder type="image">
      <ImageSolidIcon className="size-6" />
    </Placeholder>
  );
}

export function NavigationPlaceholder() {
  return (
    <Placeholder type="navigation">
      <NavigationIcon className="size-6" />
    </Placeholder>
  );
}

export function KakaoMapPlaceholder() {
  return (
    <Placeholder type="kakaoMap">
      <MapIcon className="size-6" />
    </Placeholder>
  );
}

export function BlankPlaceholder() {
  return (
    <Placeholder type="blank">
      <BoxSelectIcon className="size-6" />
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
      <ChevronsDownUpIcon className="size-6" />
    </Placeholder>
  );
}
