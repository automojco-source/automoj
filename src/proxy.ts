import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken, isAdminAuthConfigured } from "@/lib/admin-auth";

/**
 * Admin gate.
 *
 * Next.js 16 renamed the `middleware` file convention to `proxy`; the exported
 * function must be named `proxy` (or be the default export).
 * See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
 *
 * Runs before the admin routes render, so an unauthenticated request never
 * reaches the dashboard at all.
 */
export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // The login page and its endpoint must stay reachable while signed out.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // If the gate has not been configured, refuse rather than fall open.
  if (!isAdminAuthConfigured()) {
    return new NextResponse(
      "Admin access is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  if (await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, message: "Unauthorised." }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  url.searchParams.set("from", pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  // Everything under /admin and /api/admin; the login exceptions are handled above.
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
