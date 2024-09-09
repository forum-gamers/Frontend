import { type NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req) => {
  const { pathname } = req.nextUrl;

  return NextResponse.next({
    headers: {
      pathname,
    },
  });
};

export const config = {
  matcher: "/(.*)",
};
