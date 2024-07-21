import { AMain } from "~/app/(playground)/playground/inner-tools";
import AddressSearchButton from "~/app/(playground)/playground/map/_components/AddressSearchButton";
import KakaoMap from "~/app/(playground)/playground/map/_components/KakaoMap";

export default function KaKaoMapPage() {
  return (
    <AMain>
      <div>
        <KakaoMap height={"400px"} width={"100%"} addCenterPin={true} />
        <AddressSearchButton />
      </div>
    </AMain>
  );
}
