import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTotalPages } from "./utils/pages";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const response = NextResponse.next();

  console.log("from middleware: ", path);
  /**
   * Middleware for page routes
   */
  if (path.startsWith("/view")) {
    const pageNo = Number(path.split("/")[2]);

    if (pageNo) {
      const { pages: totalPageCount, err } = await getTotalPages();

      if (!err && pageNo <= totalPageCount) {
        return NextResponse.rewrite(
          new URL(`/desc/${totalPageCount - pageNo + 1}`, request.url),
        );
      }
    }
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
