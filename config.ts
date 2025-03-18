import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["ar","en"];

export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
  "/": "/",
  "/patthname": "/patthname",
};

export const localePrefix: LocalePrefix<Locales> = "always";
