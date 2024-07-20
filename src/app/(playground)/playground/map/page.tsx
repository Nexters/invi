import AddressSearchButton from "~/app/(playground)/playground/map/_components/AddressSearchButton";
import KakaoMap from "~/app/(playground)/playground/map/_components/KakaoMap";

export default function KaKaoMapPage() {
  return (
    <div>
      <div>
        <KakaoMap height={"400px"} width={"100%"} addCenterPin={true} />
        <AddressSearchButton />
      </div>
    </div>
  );
}
