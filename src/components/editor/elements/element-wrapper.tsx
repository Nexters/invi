import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { useEditor } from "~/components/editor/provider";
import type {
  EditorElement,
  EditorElementType,
} from "~/components/editor/type";
import { isContainerElement, makeElement } from "~/components/editor/util";
import { cn } from "~/lib/utils";

type Props = React.ComponentProps<"div"> & {
  element: EditorElement;
  parentId?: string;
};

export default function ElementWrapper({
  element,
  children,
  className,
  parentId,
  ...props
}: Props) {
  const { editor, dispatch } = useEditor();
  const isContainer = isContainerElement(element);

  const { isDraggingOver, ...dropzoneProps } = useDropzone({
    element,
    parentId,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <>
      <div
        {...props}
        {...dropzoneProps}
        data-element-id={element.id}
        style={element.styles}
        className={cn(
          "relative w-full ring-inset transition",
          !editor.state.isPreviewMode && [
            "hover:ring-1 hover:ring-border",
            editor.state.isDragging && "ring-1 ring-border",
          ],
          className,
        )}
        onClick={handleClick}
      >
        {children}
        {editor.state.isDragging && isDraggingOver && isContainer && (
          <Dropzone {...dropzoneProps} />
        )}
      </div>
      {editor.state.isDragging && isDraggingOver && !isContainer && (
        <Dropzone {...dropzoneProps} />
      )}
    </>
  );
}

const useDropzone = ({
  element,
  parentId,
}: {
  element: EditorElement;
  parentId?: string;
}) => {
  const { dispatch } = useEditor();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const isContainer = isContainerElement(element);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const action = e.dataTransfer.getData("action");

    switch (action) {
      case "add":
        const componentType = e.dataTransfer.getData(
          "componentType",
        ) as EditorElementType;
        const newElement = makeElement(componentType);

        if (!newElement.id) {
          toast.error("추가에 실패했습니다.");
          return;
        }

        if (isContainer) {
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              containerId: element.id,
              elementDetails: newElement,
            },
          });
        } else {
          dispatch({
            type: "ADD_ELEMENT_NEAR_BY",
            payload: {
              elementId: element.id,
              elementDetails: newElement,
            },
          });
        }
        break;
      case "move":
        const targetId = e.dataTransfer.getData("elementId");
        if (targetId === element.id) {
          return;
        }

        dispatch({
          type: "MOVE_ELEMENT",
          payload: {
            elementId: targetId,
            newParentId: element.id,
            newIndex: 0,
          },
        });
        break;
    }
  };

  return {
    isDraggingOver,
    onDragOver,
    onDragLeave,
    onDrop,
  };
};

function Dropzone(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="flex h-full min-h-4 w-full items-center justify-center border bg-muted p-2 text-muted-foreground"
    >
      <PlusIcon />
    </div>
  );
}
