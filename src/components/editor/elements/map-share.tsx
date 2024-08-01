import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useEditor } from "~/components/editor/provider";
import type {
  EditorElement,
  EditorElementType,
} from "~/components/editor/type";
import { cn } from "~/lib/utils";

type MapType = "naver" | "kakao";
type MapUrls = Record<MapType, string>;

type Props = {
  element: EditorElement;
};

const MapShareComponents = ({ element }: Props) => {
  const { dispatch, editor } = useEditor();
  const { content, styles } = element;
  const state = editor.state;
  const isSelected = editor.state.selectedElement.id === element.id;
  const address =
    !Array.isArray(content) && content.innerText ? content.innerText : "";
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

  const handleDragStart = (e: React.DragEvent, type: EditorElementType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleCopy = async (text: string) => {
    await copyTextAsync(text);
    toast("복사되었습니다.", {
      duration: 2000,
      style: {
        backgroundColor: "black",
        opacity: 0.9,
        height: "56px",
        color: "white",
        border: 0,
      },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
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
      payload: { elementDetails: element },
    });
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "map")}
      onClick={handleOnClickBody}
      // className={clsx(
      //   "relative m-[5px] w-full p-[2px] text-[16px] transition-all",
      //   {
      //     "!border-blue-500": state.selectedElement.id === element.id,

      //     "!border-solid": state.selectedElement.id === element.id,
      //   },
      // )}
      className={cn(
        "relative w-full p-[5px] text-[16px] transition-all",
        !editor.state.isPreviewMode && [
          "border-[1px] border-dashed border-border",
          isSelected && "border-solid border-primary",
        ],
      )}
    >
      <article className="flex gap-x-3">
        <button onClick={() => openMap("naver", address)}>
          <Image src="/naver-map.png" alt="naver-map" width={42} height={42} />
        </button>
        <button onClick={() => openMap("kakao", address)}>
          <Image src="/kakao-map.png" alt="kakao-map" width={42} height={42} />
        </button>
        <button onClick={() => handleCopy(address)}>
          <Image src="/copy.png" width={42} height={42} alt="copy" />
        </button>
      </article>
      {state.selectedElement.id === element.id && (
        <div className="absolute -right-[1px] -top-[25px] rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-xs font-bold !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
};

export default MapShareComponents;
