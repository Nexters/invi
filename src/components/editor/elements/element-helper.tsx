"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyPlusIcon,
  GripVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEditor } from "~/components/editor/provider";
import { isValidSelectEditorElement } from "~/components/editor/util";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function ElementHelper() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  const [layerStyle, setLayerStyle] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  }>();
  const rafRef = useRef<number | null>(null);

  const updateLayerStyle = useCallback((id: string) => {
    const el = document.querySelector(`[data-element-id="${id}"]`);

    if (!el) {
      return;
    }

    const updateStyle = () => {
      const { top, left, width, height } = el.getBoundingClientRect();
      setLayerStyle({ top, left, width, height });
      rafRef.current = requestAnimationFrame(updateStyle);
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateStyle);
    };

    window.addEventListener("scroll", handleScroll, true);
    rafRef.current = requestAnimationFrame(updateStyle);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    return updateLayerStyle(element.id);
  }, [element.id, updateLayerStyle, element.content]);

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "MOVE_ELEMENT_UP",
      payload: {
        elementId: element.id,
      },
    });
    updateLayerStyle(element.id);
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "MOVE_ELEMENT_DOWN",
      payload: {
        elementId: element.id,
      },
    });
    updateLayerStyle(element.id);
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDuplicateElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "DUPLICATE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (element.id === "__body") return;

    const elementDom = document.querySelector(
      `[data-element-id=${element.id}]`,
    );
    if (elementDom) {
      e.dataTransfer.setDragImage(elementDom, 0, 0);
    }

    e.dataTransfer.setData("action", "move");
    e.dataTransfer.setData("elementId", element.id);
    dispatch({ type: "SET_DRAGGING", payload: element.id });
  };

  return (
    typeof window !== "undefined" &&
    createPortal(
      !editor.state.isPreviewMode &&
        layerStyle &&
        isValidSelectEditorElement(element) && (
          <div
            style={{
              top: layerStyle.top,
              left: layerStyle.left,
              width: layerStyle.width,
              height: 0,
            }}
            className="fixed z-20"
          >
            <div className="absolute left-0 right-0 top-0 z-10 h-[1px] bg-primary" />
            <div
              style={{ top: layerStyle.height - 1 }}
              className="absolute left-0 right-0 top-0 z-10 h-[1px] bg-primary"
            />
            <div
              style={{ height: layerStyle.height }}
              className="absolute left-0 top-0 z-10 w-[1px] bg-primary"
            />
            <div
              style={{ height: layerStyle.height }}
              className="absolute right-0 top-0 z-10 w-[1px] bg-primary"
            />
            <Badge
              className="absolute -left-[1px] -top-[26px] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {element.name}
            </Badge>
            <div className="absolute -left-[28px] -top-[1px] z-10">
              <div className="flex flex-col gap-0.5">
                <IconButton
                  className="cursor-grab"
                  onClick={(e) => e.stopPropagation()}
                  draggable
                  onDragStart={handleDragStart}
                >
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
                <IconButton onClick={handleDuplicateElement}>
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
  return (
    <Button
      {...props}
      size="icon"
      className={cn("h-6 w-6 p-0", props.className)}
    />
  );
}
