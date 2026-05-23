import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { applyWhopEmbedHeaders } from "@/lib/embed-headers";
import { isClerkConfigured } from "@/lib/clerk-config";

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/dashboard/(.*)",
  "/api/(.*)",
]);

function withEmbedHeaders(response: NextResponse = NextResponse.next()) {
  applyWhopEmbedHeaders(response.headers);
  return response;
}

export default isClerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        await auth.protect();
      }
      return withEmbedHeaders();
    })
  : () => withEmbedHeaders();

// All document routes — Whop Website Embed must receive frame-ancestors on every page
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
