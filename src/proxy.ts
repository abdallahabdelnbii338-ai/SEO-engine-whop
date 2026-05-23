import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { applyWhopEmbedHeaders } from "@/lib/embed-headers";

export default function proxy(_request: NextRequest) {
  const response = NextResponse.next();
  applyWhopEmbedHeaders(response.headers);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
