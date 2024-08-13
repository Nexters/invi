import type { Metadata } from "next";
import Providers from "~/components/providers";
import { pretendard } from "~/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "인비",
  description: "당신의 환대, 초대장 플랫폼 '인비' 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
