import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";
 
const intlMiddleware = createMiddleware({
  locales: ["en", "el"],
 
  defaultLocale: "en",
});
 

export default authMiddleware({
    beforeAuth: (req) => {
        // Execute next-intl middleware before Clerk's auth middleware
        return intlMiddleware(req);
      },
    afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
          return redirectToSignIn({ returnBackUrl: req.url });
        }
      },
     
      // Ensure that locale specific sign-in pages are public
      publicRoutes: ["/", "/:locale/sign-in"],
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 