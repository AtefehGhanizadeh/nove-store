import createMiddleware from 'next-intl/middleware';
import { routing } from '@/utils/i18n/routing';

/** Redirects `/` to the default locale and keeps the locale prefix on every page route. */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next.js internals and any path with a file extension (robots.txt, sitemap.xml, images).
  matcher: '/((?!api|_next|_vercel|.*\..*).*)',
};
