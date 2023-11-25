import { readFromJSON } from "@/utils/fileSystem";
import next from "next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //DO NOT USE TURBO FLAG UNTIL THIS ISSUE IS RESOLVED, OTHERWISE I WILL HAVE AN ERROR
  //https://github.com/vercel/next.js/issues/57581
  const pathname = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;
  const jsonFlags = await fetch(`${origin}/flags`, { cache: "no-cache" });
  const flags = await jsonFlags.json();
  switch (pathname) {
    case "/feature1":
      return flags?.feature1
        ? NextResponse.next()
        : NextResponse.redirect(
            new URL("/access-denied", request.nextUrl.origin)
          );
    case "/feature2":
      return flags?.feature2
        ? NextResponse.next()
        : NextResponse.redirect(
            new URL("/access-denied", request.nextUrl.origin)
          );
    case "/feature3":
      return flags?.feature3
        ? NextResponse.next()
        : NextResponse.redirect(
            new URL("/access-denied", request.nextUrl.origin)
          );
    default:
      return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/feature(.*)"
};
