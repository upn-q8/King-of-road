"use client";
import LocalSwitcherSelect from "./LocaleSwitcherSelect";
import { useEffect, useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "../../../../navigation";

function LocalSwitcher() {
  const [openChangeLang, setOpenChangeLang] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  function onSelectChange(locale) {
    setOpenChangeLang(false);
    startTransition(() => {
      router.replace({ pathname: pathname }, { locale });
    });
  }

  const t = useTranslations("langs");

  return (
    <LocalSwitcherSelect>
      <div className="relative">
        <button
          disabled={isPending}
          id="dropdownDefaultButton"
          className="text-center flex items-center lg:text-white text-black mt-0.5  text-[16px]"
          style={{ color: pathname.startsWith("/dashboard") ? "#000" : "" }}
          type="button"
          onClick={() => setOpenChangeLang(!openChangeLang)}
        >
          <picture>
            <img src={"/icon/global.png"} width={25} alt="" className="me-2" />
          </picture>
          {t("title")}
          <svg
            className="w-2.5 h-2.5 ms-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className={`z-50 absolute top-6 xl:top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${
            openChangeLang ? "block" : "hidden"
          }`}
          style={{ zIndex: 1000000 }}
        >
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <p
                onClick={() => onSelectChange("ar")}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-black"
              >
                <picture>
                  <img
                    src={"/icon/global.png"}
                    width={25}
                    alt=""
                    className="me-2"
                  />
                </picture>
                العربية
              </p>
            </li>
            <li>
              <p
                onClick={() => onSelectChange("en")}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <picture>
                  <img
                    src={"/icon/global.png"}
                    width={25}
                    alt=""
                    className="me-2"
                  />
                </picture>
                English
              </p>
            </li>
          </ul>
        </div>
      </div>
    </LocalSwitcherSelect>
  );
}

export default LocalSwitcher;
