"use client";

import { useEditor } from "~/components/editor/provider";
import { Accordion } from "~/components/ui/accordion";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

type Props = {};

export default function SidebarSettingsTab(props: Props) {
  const { editor, dispatch } = useEditor();


  const handleChangeKakaoMapLocationChange = (e: any) => {
    new window.daum.Postcode({
      oncomplete: (addressData: any) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
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
            const currentPositions = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...editor.state.selectedElement,
                  content: {
                    ...editor.state.selectedElement.content,
                    location: [currentPositions.Ma, currentPositions.La],
                    address: result[0].address_name,
                  },
                },
              },
            });
          },
        );
      },
    }).open();
  };

  const handleClickMapCheckBox = (e: any) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...editor.state.selectedElement,
          content: {
            ...editor.state.selectedElement.content,
            isMapUse: e.target.checked,
          },
        },
      },
    });
  };

  const handleClickShareCheckBox = (e: any) => {
    console.log(e);
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...editor.state.selectedElement,
          content: {
            ...editor.state.selectedElement.content,
            isShareUse: e.target.checked,
          },
        },
      },
    });
  };

  return (
    <Accordion type="multiple" className="w-full" defaultValue={[]}>
      <AccordionItem value="Custom">
        <AccordionTrigger className="px-6">Custom</AccordionTrigger>
        <AccordionContent className="px-6">
          {editor.state.selectedElement.type === "kakaoMap" && (
            <>
              <button
                className={`h-full w-full rounded-xl border-none bg-[#5E8AFF] text-sm font-bold text-white disabled:bg-[#D5D7D9]`}
                onClick={handleChangeKakaoMapLocationChange}
              >
                지도 위치 변경하기
              </button>
              <AccordionContent>
                <label>
                  <input
                    type={"checkbox"}
                    onClick={handleClickMapCheckBox}
                    defaultChecked={true}
                  />
                  지도
                </label>
                <label>
                  <input
                    type={"checkbox"}
                    onClick={handleClickShareCheckBox}
                    defaultChecked={true}
                  />
                  공유
                </label>
              </AccordionContent>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
      <SheetHeader className="p-6">
        <SheetTitle>초대장 설정</SheetTitle>
        <SheetDescription>
          초대장 전체 스타일을 정해보세요. 색상, 글꼴를 바꿔 나만의 분위기를
          만들 수 있어요.
        </SheetDescription>
      </SheetHeader>
    </Accordion>
  );
}
