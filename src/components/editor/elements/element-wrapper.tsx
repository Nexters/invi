"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InView } from "~/components/core/in-view";
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
  ...props
}: Props) {
  const { editor, dispatch } = useEditor();
  const isContainer = isContainerElement(element);

  const { isDraggingOver, ...dropzoneProps } = useDropzone({ element });
  const isDropzoneActive =
    isDraggingOver &&
    editor.state.isDragging &&
    editor.state.draggedElementId !== element.id;
  const isMoveMode =
    editor.state.isDragging && editor.state.draggedElementId !== "ghost";

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
      <InView
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
        disable={element.type === "__body" || !editor.state.isPreviewMode}
        onClick={handleClick}
      >
        {children}
        {isDropzoneActive && isContainer && (
          <Dropzone {...dropzoneProps} isMoveMode={isMoveMode} />
        )}
      </InView>
      {isDropzoneActive && !isContainer && (
        <Dropzone {...dropzoneProps} isMoveMode={isMoveMode} />
      )}
    </>
  );
}

const useDropzone = ({ element }: { element: EditorElement }) => {
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
    dispatch({ type: "SET_DRAGGING", payload: "" });

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
        const elementId = e.dataTransfer.getData("elementId");
        if (elementId === element.id) {
          return;
        }

        if (isContainer) {
          dispatch({
            type: "MOVE_ELEMENT",
            payload: {
              elementId,
              newParentId: element.id,
              newIndex: (element.content as EditorElement[]).length,
            },
          });
        } else {
          dispatch({
            type: "MOVE_ELEMENT_NEAR_BY",
            payload: {
              elementId,
              targetId: element.id,
            },
          });
        }
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

function Dropzone({
  isMoveMode,
  ...props
}: React.ComponentProps<"div"> & { isMoveMode?: boolean }) {
  return (
    <div
      {...props}
      className="flex h-full min-h-12 w-full items-center justify-center bg-border p-2 text-muted-foreground"
    >
      {!isMoveMode && <PlusIcon className="size-4" strokeWidth={3} />}
    </div>
  );
}
