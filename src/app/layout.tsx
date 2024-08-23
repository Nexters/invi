import type { Metadata } from "next";
import Providers from "~/components/providers";
import { pretendard } from "~/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "초대장 플랫폼, 인비",
  description: "따뜻한 마음이 담긴 당신의 환대",
  openGraph: {
    images:
      "http://t1.daumcdn.net/brunch/service/user/d4v5/image/Axc3mTi7LoZC2GpsBWosDpRrNPU.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} bg-[#FFFCF9]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
