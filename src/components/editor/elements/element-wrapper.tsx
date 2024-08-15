import { useRef } from "react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";
import { cn } from "~/lib/utils";

type Props = React.ComponentProps<"div"> & {
  element: EditorElement;
};

export default function ElementWrapper({
  element,
  children,
  className,
  ...props
}: Props) {
  const { editor, dispatch } = useEditor();
  const isRoot = element.type === "__body";

  const rootRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementRef: rootRef,
        elementDetails: element,
      },
    });
  };

  return (
    <div
      {...props}
      ref={rootRef}
      style={element.styles}
      className={cn(
        "relative w-full p-1 transition-all",
        !editor.state.isPreviewMode && "ring-border hover:ring-1",
        className,
      )}
      onClick={(e) => !isRoot && handleClick(e)}
    >
      {children}
    </div>
  );
}
