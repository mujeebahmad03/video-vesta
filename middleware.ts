import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/payment",
  "/payment(.*)",
]);

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  // If user is on public routes
  if (isPublicRoute(request)) {
    // Check if user is already authenticated
    if (userId) {
      // Redirect to dashboard if trying to access sign-in/sign-up while authenticated
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Protect routes that require authentication
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
