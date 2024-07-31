import Script from "next/script";
import BottomSheet from "~/app/(playground)/pg/bottom-sheet/_components/bottom-sheet";
import { Toaster } from "~/components/ui/sonner";
import { pretendard } from "~/lib/fonts";

export default function UTPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr" className={`${pretendard.variable} bg-[#1A1A1A]`}>
      <body className={pretendard.className}>
        {children}
        <BottomSheet />
        <Toaster />
        <Script
          type="text/javascript"
          src="https://developers.kakao.com/sdk/js/kakao.js"
        />
      </body>
    </html>
  );
}
