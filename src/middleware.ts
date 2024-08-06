import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host")!;
  const searchParams = request.nextUrl.searchParams.toString();

  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  const subDomain = hostname.split(".")[0];
  console.log("subDomain", subDomain, "hostname", hostname);

  switch (true) {
    case subDomain !== hostname:
      return NextResponse.rewrite(
        new URL(`/pg/${subDomain}${path}`, request.url),
      );

    default:
      return NextResponse.rewrite(new URL(`${path}`, request.url));
  }
}
