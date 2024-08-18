"use client";

import { HeightIcon, WidthIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";
import ImageDropzone from "~/components/editor/ui/image-dropzone";
import { EditorInput } from "~/components/editor/ui/input";
import { uploadImage } from "~/lib/image";

export default function ImageSetting({
  element,
}: {
  element: InferEditorElement<"image">;
}) {
  const { dispatch } = useEditor();

  const imageUploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (url) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...element,
            content: { ...element.content, src: url },
          },
        },
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("이미지 업로드에 실패했습니다.");
    },
  });

  return (
    <div className="space-y-1 border-t p-6 pt-4">
      <div className="grid w-full grid-cols-9 gap-1">
        <div className="col-span-9">
          <ImageDropzone
            disabled={imageUploadMutation.isPending}
            onLoadImage={async ({ file }) => {
              imageUploadMutation.mutate(file);
            }}
          />
        </div>
        <div className="col-span-9">
          <EditorInput
            id="image_src"
            disabled={imageUploadMutation.isPending}
            defaultValue={element.content.src}
            onDebounceChange={async (e) => {
              dispatch({
                type: "UPDATE_ELEMENT",
                payload: {
                  elementDetails: {
                    ...element,
                    content: { ...element.content, src: e.target.value },
                  },
                },
              });
            }}
            componentPrefix={"src"}
          />
        </div>
        <div className="col-span-4 row-span-1">
          <EditorInput
            id="image_width"
            defaultValue={element.styles.width}
            onDebounceChange={(e) =>
              dispatch({
                type: "UPDATE_ELEMENT_STYLE",
                payload: { width: e.target.value },
              })
            }
            componentPrefix={<WidthIcon />}
          />
        </div>
        <div className="col-span-4 row-span-1">
          <EditorInput
            id="image_height"
            defaultValue={element.styles.height}
            onDebounceChange={(e) =>
              dispatch({
                type: "UPDATE_ELEMENT_STYLE",
                payload: { height: e.target.value },
              })
            }
            componentPrefix={<HeightIcon />}
          />
        </div>
      </div>
    </div>
  );
}
