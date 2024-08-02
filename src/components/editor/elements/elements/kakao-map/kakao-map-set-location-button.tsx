"use client";

import { useKakaoAddress } from "~/components/editor/elements/elements/kakao-map/kakao-map-context";

export default function KakaoMapSetLocationButton() {
  const { setCoordinate } = useKakaoAddress();

  const handleClickButton = () => {
    new window.daum.Postcode({
      oncomplete: (addressData: any) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          addressData.address,
          (result: any, status: any) => {
            const currentPositions = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );
            setCoordinate(currentPositions.Ma, currentPositions.La);
          },
        );
      },
    }).open();
  };

  return (
    <button
      onClick={handleClickButton}
      className={"bold rounded-xl border bg-blue-300 p-2 text-white"}
    >
      내 주소 찾기
    </button>
  );
}
