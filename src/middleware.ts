import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

function isSubdomain(hostname: string) {
  const subdomain = hostname.split(".")[0];

  if (!subdomain) {
    return false;
  }

  return (
    !hostname.startsWith("localhost:") && !["www", "invi"].includes(hostname)
  );
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host")!;
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

  // 서브도메인으로 접근한 경우
  if (isSubdomain(hostname)) {
    const subdomain = hostname.split(".")[0];
    return NextResponse.rewrite(new URL(`/i/${subdomain}${path}`, request.url));
  }

  // /i/* 경로로 접근한 경우
  const match = path.match(/^\/i\/([^\/]+)(\/.*)?$/);
  if (match) {
    const subdomain = match[1];
    const remainingPath = match[2] || "";
    const newUrl = new URL(request.url);
    newUrl.hostname = `${subdomain}.${newUrl.hostname}`;
    newUrl.pathname = remainingPath;
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.rewrite(new URL(path, request.url));
}
