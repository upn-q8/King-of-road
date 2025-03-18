"use client";
import {
  LocateFixedIcon,
  Lock,
  LogOut,
  MapPin,
  PhoneCallIcon,
  Search,
  ShoppingBag,
  User,
  UserCircle,
} from "lucide-react";
import React, { useContext, useState } from "react";
import LocalSwitcher from "../ui/LocalSwitcher";
import AppContext from "../../contexts";
import { Link, useRouter } from "../../../../navigation";
import Input from "../ui/Input";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";

function NavbarMobile({
  dataCategories,
  data,
  locale,
  isAuth,
  user,
  logout,
  setSerach,
  handleSerachProduct,
}) {
  const { cart } = useContext(AppContext);

  const t = useTranslations("");

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      icon: "/icon/location-2-2.png",
      title: locale == "ar" ? data?.location_Ar : data?.location_En,
      link: "#",
    },
    {
      icon: "/icon/call-calling-2.png",
      title: data?.phone_Number,
      link: data?.phone_Number,
    },
  ];

  const router = useRouter();

  return (
    <>
      <nav className="py-2">
        <p className="text-center text-sm text">Buy now and get 20% discount</p>
        <hr className="my-2" />
        <div className="flex justify-between items-center p-2">
          <img src="/logo.png" className="w-36" alt="" />
          <div className="flex items-center gap-3">
            <img src="/icon/cart.png" width={28} alt="" />
            <div className="bg-[#FE5F0D]/10 rounded-md p-2 px-3">
              <input
                checked={open}
                onChange={() => setOpen(!open)}
                id="checkbox2"
                type="checkbox"
              />
              <label className="toggle toggle2" htmlFor="checkbox2">
                <div id="bar4" className="bars"></div>
                <div id="bar5" className="bars"></div>
                <div id="bar6" className="bars"></div>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarMobile;
