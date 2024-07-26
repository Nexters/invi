import Script from "next/script";

export default function UTPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://developers.kakao.com/sdk/js/kakao.js"
      />
      {children}
    </>
  );
}
