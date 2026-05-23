import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/lib/clerk-config";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default isClerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isDashboardRoute(req)) {
        await auth.protect();
      }
    })
  : () => NextResponse.next();

// Only dashboard + API — keep "/" public to avoid Next 16 + Vercel sitewide 404
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
