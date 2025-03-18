import { useTranslations } from "next-intl";
import React from "react";

function Loading() {
  const t = useTranslations("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div>
        <img src="/logo.png" alt="Logo" className="mb-4 mx-auto" />
        <p className="text text-center" >{t("loading")} ...</p>
      </div>
    </div>
  );
}

export default Loading;
