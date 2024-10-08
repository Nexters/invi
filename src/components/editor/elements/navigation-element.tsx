import Image from "next/image";
import { toast } from "sonner";
import ElementWrapper from "~/components/editor/elements/element-wrapper";
import type { InferEditorElement } from "~/components/editor/type";
import { cn } from "~/lib/utils";

type MapType = "naver" | "kakao";
type MapUrls = Record<MapType, string>;

type Props = {
  element: InferEditorElement<"navigation">;
  className?: string;
};

export default function NavigationElement({ element, className }: Props) {
  const { address } = element.content;

  const openMap = (mapType: MapType, address: string) => {
    const mapUrls: MapUrls = {
      naver: `nmap://search?query=${address}`,
      kakao: `kakaomap://search?q=${address}`,
    };
    window.open(mapUrls[mapType]);
  };

  const copyTextAsync = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopy = async (text: string) => {
    await copyTextAsync(text);
    toast("복사되었습니다.", {
      description: text,
      duration: 2000,
      position: "top-center",
      style: {
        backgroundColor: "black",
        opacity: 0.9,
        height: "56px",
        color: "white",
        border: 0,
      },
    });
  };

  return (
    <ElementWrapper
      element={element}
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <button onClick={() => openMap("naver", address)}>
        <Image
          src="/naver-map.png"
          alt="naver-map"
          width={42}
          height={42}
          draggable={false}
        />
      </button>
      <button onClick={() => openMap("kakao", address)}>
        <Image
          src="/kakao-map.png"
          alt="kakao-map"
          width={42}
          height={42}
          draggable={false}
        />
      </button>
      <button onClick={() => handleCopy(address)}>
        <Image
          src="/copy.png"
          alt="copy"
          width={42}
          height={42}
          draggable={false}
        />
      </button>
    </ElementWrapper>
  );
}
