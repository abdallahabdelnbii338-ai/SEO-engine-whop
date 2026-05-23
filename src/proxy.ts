import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/lib/clerk-config";

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/dashboard/(.*)",
  "/api/(.*)",
]);

export default isClerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        await auth.protect();
      }
    })
  : () => NextResponse.next();

// Match /dashboard exactly and nested paths; keep "/" out to avoid Vercel sitewide 404
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/api/:path*"],
};
