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
        src={`${process.env.NEXT_PUBLIC_DAUMCDN_POSTOCDE_URL}`}
      />
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`${process.env.NEXT_PUBLIC_KAKAOMAP_BASE_URL}?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      />
      {children}
    </>
  );
}
