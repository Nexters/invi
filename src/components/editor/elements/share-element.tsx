"use client";

import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import ElementWrapper from "~/components/editor/elements/element-wrapper";
import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";
import { KakaoIcon, ShareIcon } from "~/components/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { kakaoShareInvi } from "~/lib/kakao-share";

type Props = {
  element: InferEditorElement<"share">;
};

export default function ShareElement({ element }: Props) {
  const { editor } = useEditor();
  const link = `https://${editor.config.invitationSubdomain}.invi.my`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast("링크가 복사되었습니다.", {
        description: link,
        position: "top-center",
        duration: 2000,
        style: {
          backgroundColor: "black",
          opacity: 0.9,
          height: "56px",
          color: "white",
          border: 0,
        },
      });
    } catch (e) {
      console.error(e);
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    kakaoShareInvi({
      link,
      title: editor.config.invitationTitle,
      description: editor.config.invitationDesc,
      imageUrl: editor.config.invitationThumbnail,
    });
  };

  return (
    <ElementWrapper
      element={element}
      className="flex items-center justify-center"
    >
      <Popover>
        <PopoverTrigger className="">
          <ShareIcon className="size-6" />
        </PopoverTrigger>
        <PopoverContent sideOffset={5} className="w-auto border-none p-2">
          <PopoverClose
            className="flex w-full items-center gap-2 rounded-lg p-2 text-xs transition-colors focus:outline-none active:bg-gray-100"
            onClick={handleCopyLink}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <LinkIcon />
            </div>
            링크 복사하기
          </PopoverClose>
          <PopoverClose
            onClick={handleKakaoShare}
            className="flex w-full items-center gap-2 rounded-lg p-2 text-xs transition-colors focus:outline-none active:bg-gray-100"
          >
            <KakaoIcon className="h-4 w-4" />
            <span>공유하기</span>
          </PopoverClose>
          <PopoverArrow className="fill-white" />
        </PopoverContent>
      </Popover>
    </ElementWrapper>
  );
}
