import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyPlusIcon,
  GripVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { useEditor } from "~/components/editor/provider";
import type { EditorElement } from "~/components/editor/type";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
        "relative w-full p-1 transition-all",
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
          <Badge className="absolute -left-[1px] -top-[26px] z-10">
            {editor.state.selectedElement.name}
          </Badge>
          <div className="absolute -left-[28px] -top-[1px] z-10">
            <div className="flex flex-col gap-0.5">
              <IconButton>
                <GripVerticalIcon className="h-4 w-4" />
              </IconButton>
              <IconButton>
                <ArrowUpIcon className="h-4 w-4" />
              </IconButton>
              <IconButton>
                <ArrowDownIcon className="h-4 w-4" />
              </IconButton>
            </div>
          </div>
          <div className="absolute -right-[28px] -top-[1px] z-10">
            <div className="flex flex-col gap-0.5">
              <IconButton onClick={handleDeleteElement}>
                <Trash2Icon className="h-4 w-4" />
              </IconButton>
              <IconButton>
                <CopyPlusIcon className="h-4 w-4" />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function IconButton(props: React.ComponentProps<"button">) {
  return <Button {...props} size="icon" className="h-6 w-6 p-0" />;
}
