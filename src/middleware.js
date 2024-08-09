import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//How to tell clerk what routes are protected
const isProtected = createRouteMatcher(["/userId"]);

// We use this function to define public and protected routes
export default clerkMiddleware((auth, req) => {
  if (isProtected(req)) auth().protect();
});

export const config = {
  // The Matcher is finding a correlation between your routes and the route's you specified in clerkMiddleWare()
  // The matcher is written using regex
  // regular expressions are used to find matches in patterns
  //! DONT CHANGE THIS LINE
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
