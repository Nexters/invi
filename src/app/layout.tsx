import type { Metadata } from "next";
import { Toaster as Sonner } from "~/components/ui/sonner";
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
    <html lang="kr" className={`${pretendard.variable} bg-[#1A1A1A]`}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={pretendard.className}>
        {children}
        <Sonner />
      </body>
    </html>
  );
}
