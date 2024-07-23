import Script from "next/script";
import { env } from "~/lib/env";

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
        src={`${env.DAUMCDN_POSTOCDE_URL}`}
      />
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`${env.KAKAO_MAP_BASE_URL}?appkey=${env.KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      />
      {children}
    </>
  );
}
