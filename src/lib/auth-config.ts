/**
 * Auth is disabled for MVP (Whop Website Embed handles access).
 *
 * To restore Clerk later:
 * 1. npm install @clerk/nextjs
 * 2. Add Clerk env vars to .env.local
 * 3. Restore ClerkProvider in app/layout.tsx
 * 4. Add src/proxy.ts with clerkMiddleware()
 * 5. Replace getAuthUser() in lib/auth.ts with Clerk session lookup
 */

export const AUTH_DISABLED_FOR_MVP = true;
