import { useEditor } from "~/components/editor/provider";
import type {
  EditorElement,
  InferEditorElement,
} from "~/components/editor/type";

export default function KakaoMapSetting() {
  const { editor, dispatch } = useEditor();

  if (editor.state.selectedElement.type !== "kakaoMap") {
    return null;
  }

  const selectedElement = editor.state
    .selectedElement as InferEditorElement<"kakaoMap">;

  const handleChangeKakaoMapLocationChange = () => {
    new (window as any).daum.Postcode({
      oncomplete: (addressData: any) => {
        const geocoder = new (window as any).kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          addressData.address,
          (
            result: {
              address_name: string;
              y: number;
              x: number;
            }[],
            status: any,
          ) => {
            const currentPositions = new (window as any).kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );
            const updatedElement: EditorElement = {
              ...selectedElement,
              content: {
                ...selectedElement.content,
                location: {
                  latitude: currentPositions.Ma,
                  longitude: currentPositions.La,
                },
                address: result[0].address_name,
              },
            };
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: updatedElement,
              },
            });
          },
        );
      },
    }).open();
  };

  const handleClickMapCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedElement: EditorElement = {
      ...selectedElement,
      content: {
        ...selectedElement.content,
        isMapUse: e.target.checked,
      },
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: updatedElement,
      },
    });
  };

  const handleClickShareCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedElement: EditorElement = {
      ...selectedElement,
      content: {
        ...selectedElement.content,
        isShareUse: e.target.checked,
      },
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: updatedElement,
      },
    });
  };

  return (
    <div className="mb-4 border-t p-6">
      <div className={"mb-4"}>
        <p className={"mb-2 text-lg font-bold"}>위치 설정</p>
        <button
          className={`h-8 w-full rounded border-none bg-[#5E8AFF] text-sm font-bold text-white disabled:bg-[#D5D7D9]`}
          onClick={handleChangeKakaoMapLocationChange}
        >
          지도 위치 변경하기
        </button>
      </div>
      <div className={"mb-4"}>
        <p className={"mb-2 text-lg font-bold"}>현재위치</p>
        <p>{selectedElement.content.address}</p>
      </div>
      <div>
        <p className={"mb-2 text-lg font-bold"}>표시 옵션</p>
        <div className={"flex gap-3 text-center"}>
          <label>
            <input
              type={"checkbox"}
              onChange={handleClickMapCheckBox}
              checked={selectedElement.content.isMapUse}
            />
            지도
          </label>
          <label>
            <input
              type={"checkbox"}
              onChange={handleClickShareCheckBox}
              checked={selectedElement.content.isShareUse}
            />
            공유
          </label>
        </div>
      </div>
    </div>
  );
}
