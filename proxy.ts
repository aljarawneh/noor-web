import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LANGS = ["en", "ar"];
const DEFAULT_LANG = "en";

function detectLang(req: NextRequest): string {
  const acceptLanguage = req.headers.get("accept-language") ?? "";
  const primary = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase() ?? "";
  return primary === "ar" ? "ar" : DEFAULT_LANG;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static assets, _next, api, favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    SUPPORTED_LANGS.some((l) => pathname.startsWith(`/${l}`))
  ) {
    return NextResponse.next();
  }

  // Redirect / and all unmatched paths to /{lang}/...
  const lang = detectLang(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
