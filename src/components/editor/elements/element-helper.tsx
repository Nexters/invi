"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyPlusIcon,
  GripVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useResizeObserver } from "usehooks-ts";
import { useEditor } from "~/components/editor/provider";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function ElementHelper() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;
  const elementRef = editor.state.selectedElementRef;

  const emptyRef = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver({
    ref: elementRef ?? emptyRef,
    box: "border-box",
  });

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "MOVE_ELEMENT_UP",
      payload: {
        elementId: element.id,
      },
    });
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "MOVE_ELEMENT_DOWN",
      payload: {
        elementId: element.id,
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
    typeof window !== "undefined" &&
    createPortal(
      !editor.state.isPreviewMode && elementRef?.current && (
        <div
          style={{
            top: elementRef.current.getBoundingClientRect().top,
            left: elementRef.current.getBoundingClientRect().left,
            width,
            height,
          }}
          className={cn(
            "fixed z-50",
            !editor.state.isPreviewMode && "ring-1 ring-primary",
          )}
        >
          <Badge className="absolute -left-[1px] -top-[26px] z-10">
            {element.name}
          </Badge>
          <div className="absolute -left-[28px] -top-[1px] z-10">
            <div className="flex flex-col gap-0.5">
              <IconButton>
                <GripVerticalIcon className="h-4 w-4" />
              </IconButton>
              <IconButton onClick={handleMoveUp}>
                <ArrowUpIcon className="h-4 w-4" />
              </IconButton>
              <IconButton onClick={handleMoveDown}>
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
        </div>
      ),
      document.body,
    )
  );
}

function IconButton(props: React.ComponentProps<"button">) {
  return <Button {...props} size="icon" className="h-6 w-6 p-0" />;
}
