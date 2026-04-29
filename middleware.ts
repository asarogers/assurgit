import { NextRequest, NextResponse } from "next/server";

// CPU time budget (ms). Cloudflare Workers paid plan limit is 30,000ms.
// We warn at 5s and block dynamic rendering at 20s to stay well under the 30s hard limit.
const WARN_MS  = 5_000;
const BLOCK_MS = 20_000;

// Routes that are always static — skip timing overhead entirely
const STATIC_PREFIXES = [
  "/_next/",
  "/static/",
  "/favicon",
  "/robots",
  "/sitemap",
];

export function middleware(req: NextRequest) {
  // www → non-www 301
  if (req.headers.get("host")?.startsWith("www.")) {
    const url = req.nextUrl.clone();
    url.host = url.host.replace(/^www\./, "");
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = req.nextUrl;

  if (STATIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const start = performance.now();

  const res = NextResponse.next();

  // After the response is generated, measure elapsed time
  const elapsed = performance.now() - start;

  if (elapsed >= BLOCK_MS) {
    // Hard stop — return a clean error before Cloudflare kills the worker mid-flight
    console.error(`[worker-limit] BLOCKED ${pathname} — ${elapsed.toFixed(0)}ms exceeds ${BLOCK_MS}ms budget`);
    return new NextResponse(
      JSON.stringify({ error: "Request took too long to process. Please try again." }),
      { status: 503, headers: { "Content-Type": "application/json", "Retry-After": "5" } }
    );
  }

  if (elapsed >= WARN_MS) {
    console.warn(`[worker-limit] SLOW ${pathname} — ${elapsed.toFixed(0)}ms (budget: ${BLOCK_MS}ms)`);
  }

  // Add timing header for observability
  res.headers.set("Server-Timing", `total;dur=${elapsed.toFixed(0)}`);

  return res;
}

export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
