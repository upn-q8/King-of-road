import "./globals.css";
import "./style/check.css";
import "./style/switch.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../config";
import { ToastContainer } from "react-toastify";
import AppContextProvider from "./contexts/AppContextProvider";

export async function generateMetadata({ params }) {
  const locale = params?.locale;

  // Ensure the locale is valid
  if (!["en", "ar"].includes(locale)) {
    notFound();
  }

  // Load translations for the locale
  const messages = await getMessages(locale);

  return {
    title: messages.seo.title,
    description: messages.seo.description,
    keywords: messages.seo.title + " " + messages.seo.description,
    canonical: "",
  };
}

export default async function RootLayout({ children, params }) {
  const locale = params?.locale;
  unstable_setRequestLocale(locale);

  const data = {
    instagram: "instagram",
    whatsApp: "whatsApp",
    tikTok: "tikTok",
    location_Ar: "location_Ar",
    location_En: "location_En",
    phone_Number: "phone_Number",
  };

  // Ensure that the incoming `locale` is valid
  if (!["en", "ar"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const dataCategories = [{ title: "Front Suspension Systems" }, { title: "Shock Absorbers & Struts" }, { title: "Springs & Coilovers" }, { title: "Control Arms & Linkages" }, { title: "Special Offers" }];

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body dir={locale === "en" ? "ltr" : "rtl"} className="antialiased">
        <AppContextProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar locale={locale} dataCategories={dataCategories} data={data} />
            {children}
            <Footer locale={locale} data={data} />
            <ToastContainer />
          </NextIntlClientProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
