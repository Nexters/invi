import Script from "next/script";
import BottomSheet from "~/app/(playground)/pg/bottom-sheet/_components/bottom-sheet";

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
      <BottomSheet />
    </>
  );
}
