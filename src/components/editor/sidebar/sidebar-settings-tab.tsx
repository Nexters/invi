"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { LinkIcon } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import { useEditor } from "~/components/editor/provider";
import ImageDropzone from "~/components/editor/ui/image-dropzone";
import { EditorInput } from "~/components/editor/ui/input";
import { Accordion } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  existsByEventUrl,
  updateInvitation,
} from "~/lib/db/schema/invitations.query";
import { uploadImage } from "~/lib/image";

type Props = {};

export default function SidebarSettingsTab(props: Props) {
  return (
    <Accordion type="multiple" className="w-full" defaultValue={[]}>
      <SheetHeader className="p-6">
        <SheetTitle>초대장 설정</SheetTitle>
        <SheetDescription>
          초대장 전체 스타일을 정해보세요. 색상, 글꼴를 바꿔 나만의 분위기를
          만들 수 있어요.
        </SheetDescription>
      </SheetHeader>
      <CustomDomainSection />
      <SEOSection />
    </Accordion>
  );
}

function CustomDomainSection() {
  const { editor, dispatch } = useEditor();

  const updateSubdomainMutation = useMutation({
    mutationFn: async (subdomain: string) => {
      const isExist = await existsByEventUrl(subdomain);

      if (isExist) {
        throw new Error("이미 사용중인 도메인입니다.");
      }

      await updateInvitation({
        id: editor.config.invitationId,
        eventUrl: subdomain,
      });

      dispatch({
        type: "UPDATE_CONFIG",
        payload: {
          invitationSubdomain: subdomain,
        },
      });

      return subdomain;
    },
    onSuccess: (subdomain) => {
      toast.success("도메인이 변경되었습니다.", {
        description: `https://${subdomain}.invi.my`,
      });
    },
    onError: () => {
      toast.error("도메인 변경에 실패했습니다.");
    },
  });

  const form = useForm({
    defaultValues: {
      subdomain: editor.config.invitationSubdomain,
    },
    onSubmit: async ({ value }) => {
      if (value.subdomain === editor.config.invitationSubdomain) {
        return;
      }

      await updateSubdomainMutation.mutateAsync(value.subdomain);
    },
  });

  return (
    <div className="grid w-full grid-cols-9 gap-1 border-t p-6">
      <div className="col-span-9 mb-2 flex items-center">
        <h4 className="text-sm font-medium">도메인 설정</h4>
      </div>
      <form
        className="col-span-9"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="subdomain"
          children={(field) => {
            return (
              <EditorInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value.trim())}
                className="pr-0.5 ring-1"
                componentSuffix={
                  <div>
                    <span>.invi.my</span>
                    <Button
                      type="submit"
                      size="sm"
                      className="ml-2 h-6"
                      disabled={updateSubdomainMutation.isPending}
                    >
                      저장
                    </Button>
                  </div>
                }
              />
            );
          }}
        />
        <div className="h-5">
          {updateSubdomainMutation.isError && (
            <span className="text-xs text-destructive">
              {updateSubdomainMutation.error?.message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

function SEOSection() {
  const { editor, dispatch } = useEditor();

  const handleCopyLink = async () => {
    const link = `https://${editor.config.invitationSubdomain}.invi.my`;

    try {
      await navigator.clipboard.writeText(link);
      toast("링크가 복사되었습니다.", { description: link });
    } catch (e) {
      console.error(e);
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (url) => {
      dispatch({
        type: "UPDATE_CONFIG",
        payload: {
          invitationThumbnail: url,
        },
      });
    },
    onError: (e) => {
      console.error(e);
      toast.error("이미지 업로드에 실패했습니다.");
    },
  });

  const updateThumbnailMutation = useMutation({
    mutationFn: async () => {
      await updateInvitation({
        id: editor.config.invitationId,
        description: editor.config.invitationDesc,
        thumbnailUrl: editor.config.invitationThumbnail,
      });
    },
    onSuccess: () => {
      toast.success("SEO 설정이 저장되었습니다.");
    },
    onError: () => {
      toast.error("SEO 설정에 실패했습니다.");
    },
  });

  const isPending = useMemo(() => {
    return uploadImageMutation.isPending || updateThumbnailMutation.isPending;
  }, [uploadImageMutation.isPending, updateThumbnailMutation.isPending]);

  return (
    <div className="grid w-full grid-cols-9 gap-2 border-y p-6">
      <div className="col-span-9 flex flex-col">
        <h4 className="text-sm font-medium">SEO 설정</h4>
        <p className="text-xs text-muted-foreground">
          링크 공유시 보여지는 정보를 설정해보세요.
        </p>
      </div>
      <div className="col-span-9 space-y-1">
        <ImageDropzone
          disabled={isPending}
          onLoadImage={async ({ url, file }) => {
            dispatch({
              type: "UPDATE_CONFIG",
              payload: {
                invitationThumbnail: url,
              },
            });
            uploadImageMutation.mutate(file);
          }}
        >
          <div>10MB 이하, 권장 이미지 비율 2:1</div>
        </ImageDropzone>
        <EditorInput
          id="invitationThumbnail"
          disabled={isPending}
          componentPrefix={"이미지 링크"}
          defaultValue={editor.config.invitationThumbnail}
          onDebounceChange={(e) => {
            dispatch({
              type: "UPDATE_CONFIG",
              payload: {
                invitationThumbnail: e.target.value,
              },
            });
          }}
        />
        <EditorInput
          id="invitationDesc"
          disabled={isPending}
          componentPrefix={"설명"}
          defaultValue={editor.config.invitationDesc}
          onDebounceChange={(e) => {
            dispatch({
              type: "UPDATE_CONFIG",
              payload: {
                invitationDesc: e.target.value,
              },
            });
          }}
        />
      </div>
      <div className="col-span-9">
        <div className="select-none bg-[#BACEE0] p-4">
          <div className="inline-block overflow-hidden rounded-[3px] bg-neutral-200">
            {editor.config.invitationThumbnail && (
              <img
                src={editor.config.invitationThumbnail}
                width="250px"
                height="125px"
                className="aspect-preview select-none object-cover"
                draggable={false}
                alt="썸네일"
              />
            )}
            <div className="bg-white p-2.5 text-sm">
              <div className="text-neutral-900">
                {editor.config.invitationTitle}
              </div>
              <div className="text-xs text-neutral-400">
                {editor.config.invitationDesc}
              </div>
              <div className="text-xs text-neutral-300">
                {editor.config.invitationSubdomain}.invi.my
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-9 flex items-center gap-2">
        <Button size="icon" variant="secondary" onClick={handleCopyLink}>
          <LinkIcon size={16} />
        </Button>
        <div className="ml-auto flex gap-2">
          <Button
            disabled={isPending}
            onClick={() => updateThumbnailMutation.mutate()}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
