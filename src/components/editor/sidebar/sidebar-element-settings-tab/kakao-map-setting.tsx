import { useEditor } from "~/components/editor/provider";
import type {
  EditorElement,
  InferEditorElement,
} from "~/components/editor/type";
import { Button } from "~/components/ui/button";

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
    <div className="space-y-4 border-t p-6">
      <div>
        <p className={"mb-2 text-sm font-medium"}>표시 옵션</p>
        <div className={"flex gap-3 text-sm"}>
          <label className="space-x-1">
            <input
              type={"checkbox"}
              onChange={handleClickMapCheckBox}
              checked={selectedElement.content.isMapUse}
            />
            <span>지도</span>
          </label>
          <label className="space-x-1">
            <input
              type={"checkbox"}
              onChange={handleClickShareCheckBox}
              checked={selectedElement.content.isShareUse}
            />
            <span>공유</span>
          </label>
        </div>
      </div>
      <div>
        <p className={"mb-2 text-sm font-medium"}>현재위치</p>
        <p className="text-sm">{selectedElement.content.address}</p>
        <Button
          variant="secondary"
          className="mt-2 w-full"
          onClick={handleChangeKakaoMapLocationChange}
        >
          지도 위치 변경하기
        </Button>
      </div>
    </div>
  );
}
