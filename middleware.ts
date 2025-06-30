import createMiddleware from "next-intl/middleware";
import intlConfig from "./next-intl.config";
import { NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/en") && !pathname.startsWith("/de")) {
    return Response.redirect(new URL(`/en${pathname}`, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
