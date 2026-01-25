import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // covers everything except Next internals
    "/api/:path*", // all API routes
  ],
};
