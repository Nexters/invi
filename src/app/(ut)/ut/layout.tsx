import Script from "next/script";
import BottomSheet from "~/app/(playground)/pg/bottom-sheet/_components/bottom-sheet";
import { Toaster } from "~/components/ui/sonner";
import "./style.css";

export default function UTPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomSheet />
      <Toaster />
      <Script
        type="text/javascript"
        src="https://developers.kakao.com/sdk/js/kakao.js"
      />
    </>
  );
}
