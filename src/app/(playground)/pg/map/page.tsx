import { AMain } from "~/app/(playground)/pg/inner-tools";
import AddressSearchButton from "~/app/(playground)/pg/map/_components/AddressSearchButton";
import { KakaoAddressProvider } from "~/app/(playground)/pg/map/_components/KakaoAddressContext";
import KakaoMap from "~/app/(playground)/pg/map/_components/KakaoMap";

export default function KaKaoMapPage() {
  return (
    <AMain>
      <div>
        <p>결과 페이지에서 보여줄 위도 경도 입력한 지도</p>
        <KakaoAddressProvider>
          <KakaoMap
            height={"400px"}
            width={"100%"}
            addCenterPin={true}
            latitude={37}
            longitude={126.87}
          />
        </KakaoAddressProvider>
      </div>
      <div>
        <p>Provider Test 1</p>
        <KakaoAddressProvider>
          <KakaoMap height={"400px"} width={"100%"} addCenterPin={true} />
          <AddressSearchButton />
        </KakaoAddressProvider>
      </div>
      <div>
        <p>Provider Test 2</p>
        <KakaoAddressProvider>
          <KakaoMap height={"400px"} width={"100%"} addCenterPin={true} />
          <AddressSearchButton />
        </KakaoAddressProvider>
      </div>
    </AMain>
  );
}
