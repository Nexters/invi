import { TrashIcon } from "lucide-react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

type Props = React.ComponentProps<"div"> & {
  element: EditorElement;
};

export default function Wrapper({
  element,
  children,
  className,
  ...props
}: Props) {
  const { editor, dispatch } = useEditor();
  const isRoot = element.type === "__body";
  const isSelected = editor.state.selectedElement.id === element.id;

  const handleClickRoot = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      {...props}
      style={element.styles}
      className={cn(
        "relative w-full p-[5px] text-[16px] transition-all",
        !editor.state.isPreviewMode && [
          "border border-dashed border-border",
          (isSelected || isRoot) && "border-solid",
          isSelected && !isRoot && "border-primary",
        ],
        className,
      )}
      onClick={(e) => !isRoot && handleClickRoot(e)}
    >
      {children}
      {!isRoot && isSelected && !editor.state.isPreviewMode && (
        <>
          <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
            {editor.state.selectedElement.name}
          </Badge>
          <div className="absolute -right-[1px] -top-[25px] rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-white">
            <TrashIcon
              className="h-4 w-4 cursor-pointer"
              onClick={handleDeleteElement}
            />
          </div>
        </>
      )}
    </div>
  );
}
