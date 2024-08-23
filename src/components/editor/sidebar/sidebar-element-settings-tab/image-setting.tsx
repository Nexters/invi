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
      const inputEl = document.querySelector<HTMLInputElement>("#image_src");
      if (inputEl) {
        inputEl.value = url;
      }
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
      <div className="grid w-full grid-cols-9 gap-1 gap-y-2">
        <div className="col-span-9 space-y-1">
          <div className="text-sm text-muted-foreground">
            아래에 이미지 파일을 끌어다 놓거나, <br />
            클릭해서 파일을 선택해 업로드 해주세요.
          </div>
          <ImageDropzone
            disabled={imageUploadMutation.isPending}
            onLoadImage={async ({ file }) => {
              imageUploadMutation.mutate(file);
            }}
          >
            <div>10MB 이하, 권장 사이즈 가로 640px</div>
          </ImageDropzone>
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
        <div className="col-span-4">
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
        <div className="col-span-4">
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
