import { useTranslations } from "next-intl";
import React from "react";

function page() {
  const t = useTranslations("");

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        <img src="/error/fix.gif" className="max-h-[500px]" alt="" />
        <h1 className="text text-4xl text-center">{t("sorry")} </h1>
        <h1 className="text-2xl text-center">
          {t("there-is-maintenance-work")}{" "}
        </h1>
      </div>
    </div>
  );
}

export default page;
