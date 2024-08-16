import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host")!;
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

  const isSubdomain = (str: string) => {
    return !str.startsWith("localhost:") && !["www", "invi"].includes(str);
  };

  const hostnameParts = hostname.split(".");
  const potentialSubdomain = hostnameParts[0];

  let subdomain: string | null = null;

  if (isSubdomain(potentialSubdomain)) {
    subdomain = potentialSubdomain;
  }

  if (subdomain) {
    return NextResponse.rewrite(
      new URL(`/pg/${subdomain}${path}`, request.url),
    );
  } else {
    return NextResponse.rewrite(new URL(path, request.url));
  }
}
