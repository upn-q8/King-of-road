import createMiddleware from 'next-intl/middleware';
import { locales } from './config';
 
export default createMiddleware({
    locales,
    defaultLocale :"ar"
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};