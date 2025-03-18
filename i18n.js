import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  // Ensure that a valid locale is used
  if (!locales.includes(locale)) {
    notFound();
  }

  return {
    messages: {
      ...(await import(`./messages/${locale}.json`)).default,
      ...(await import(`./messages/dashboard-${locale}.json`)).default,
      ...(await import(`./messages/seo-${locale}.json`)).default,
    },
  };
});
