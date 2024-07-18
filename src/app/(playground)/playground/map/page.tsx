import KakaoMap from "~/components/KakaoMap";

export default function KaKaoMapPage() {

  return(
    <div>
      <KakaoMap height={"400px"} width={"100%"} latitude={37.566828} longitude={126.9786567} addCenterPin={true} />
    </div>
  )
}