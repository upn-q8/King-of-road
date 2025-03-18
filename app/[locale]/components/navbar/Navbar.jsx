"use client";
import React, { useContext, useState } from "react";
import { Link, usePathname, useRouter } from "../../../../navigation";
import AppContext from "../../contexts";
import NavbarMobile from "./NavbarMobile";
import { useTranslations } from "next-intl";
import SearchBar from "./components/SearchBar";
import { ChevronDown, LayoutGrid } from "lucide-react";

function Navbar({ data, dataCategories, locale }) {
  const { cart, isAuth, user, logout } = useContext(AppContext);

  const t = useTranslations("");

  const socail = [
    {
      icon: "/icon/instagram.png",
      title: t("navbar.instagram"),
      link: data?.instagram,
    },
    {
      icon: "/icon/whatsapp.png",
      title: t("navbar.whatsapp"),
      link: data?.whatsApp,
    },
    { icon: "/icon/tiktok.png", title: t("navbar.tiktok"), link: data?.tikTok },
  ];

  const info = [
    {
      icon: "/icon/location.png",
      title: locale == "ar" ? data?.location_Ar : data?.location_En,
      link: "#",
    },
    {
      icon: "/icon/call-calling.png",
      title: data?.phone_Number,
      link: data?.phone_Number,
    },
  ];

  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSerachProduct = () => {
    router.push("/products/search/" + search);
  };

  const pathname = usePathname();

  return (
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/erro") && (
      <header>
        <header className="xl:block hidden">
          <nav className="flex items-center justify-between container mx-auto text-xs px-4 py-2 pt-4">
            <div className="flex items-center gap-2 ">
              <Link href={"#"} className="border-r pr-2 uppercase">
                About us
              </Link>
              <Link href={"#"} className="border-r pr-2 uppercase">
                Installation service
              </Link>
              <Link href={"#"} className="uppercase">
                Maintenance service
              </Link>
            </div>
            <p className="text text-nowrap ">Buy now and get 20% discount</p>
            <div className="flex text-nowrap items-center gap-3">
              <p className="border-r pr-2">
                need help ? call us : <span className="text">+960 546 215</span>
              </p>
              <select className="border-r pr-2">
                <option value="" hidden>
                  English
                </option>
                <option value="">English</option>
                <option value="">العربية</option>
              </select>
              <select>
                <option value="" hidden>
                  USD
                </option>
                <option value="">KWD</option>
                <option value="">USD</option>
              </select>
            </div>
          </nav>

          <hr className="my-4" />

          <nav className="flex items-center justify-between container mx-auto text-xs pb-2">
            <Link href={"/"}>
              <img src="/logo.png" className="max-w-72" alt="" />
            </Link>

            <SearchBar />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/icon/notfication.png" width={30} alt="" />
                <p>Notfication</p>
              </div>
              <Link href={"/cart"} className="flex items-center gap-2">
                <div className="relative">
                  <img src="/icon/cart.png" width={30} alt="" />
                  <p className="absolute -right-2 -top-2 bg text-white text-[10px] p-0.5 px-1.5 rounded-full">
                    0
                  </p>
                </div>
                <p>Cart</p>
              </Link>
              <div className="flex items-center gap-2">
                <img src="/icon/user.png" width={30} alt="" />
                <p>Account</p>
              </div>
            </div>
          </nav>

          <nav className="bg-[#2A2A2A]">
            <div className="flex items-center justify-between p-3 container mx-auto">
              <div className="flex items-center gap-1 bg p-3 rounded-md text-white text-[12px]">
                <LayoutGrid />
                <div className="flex items-center gap-2">
                  All Categories
                  <ChevronDown />
                </div>
              </div>
              {dataCategories?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white text-[12px] text-nowrap"
                >
                  {item?.title == "Special Offers" && (
                    <img src="/icon/fire.png" alt="" />
                  )}
                  {item?.title}
                  <ChevronDown size={12} />
                </div>
              ))}
              <div className="flex items-center gap-1 text-[12px] text-nowrap">
                <img src="/icon/drift.png" alt="" />
                <div>
                  <p className="text-white">+960 546 215</p>
                  <p className="text">24/7 support center</p>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <header className="xl:hidden">
          <NavbarMobile
            data={data}
            isAuth={isAuth}
            user={user}
            locale={locale}
            logout={logout}
            dataCategories={dataCategories}
            setSerach={setSearch}
            handleSerachProduct={handleSerachProduct}
          />
        </header>
      </header>
    )
  );
}

export default Navbar;
