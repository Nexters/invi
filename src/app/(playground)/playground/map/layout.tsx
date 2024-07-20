import Script from "next/script";

export default function KaKaoMapPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={"//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"}
      />
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      />
      {children}
    </>
  );
}
