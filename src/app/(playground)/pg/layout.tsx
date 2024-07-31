import { GlobalAlert } from "~/components/global-alert";
import Providers from "~/components/providers";
import { Toaster } from "~/components/ui/sonner";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body
        style={{
          fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
        }}
      >
        <Providers>
          {children}
          <Toaster />
          <GlobalAlert />
        </Providers>
      </body>
    </html>
  );
}
