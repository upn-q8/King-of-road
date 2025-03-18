"use client";
import { Button } from "@headlessui/react";
import React, { useContext } from "react";
import AppContext from "../../contexts";
import { useTranslations } from "next-intl";
import { useRouter } from "../../../../navigation";
import { toast } from "react-toastify";
import { ShoppingCartIcon } from "lucide-react";

function CardAddButton({ product }) {
  const { setCart, cart, isAuth } = useContext(AppContext);

  const t = useTranslations("");

  const router = useRouter();

  const handleAddToCart = (item) => {
    if (isAuth) {
      toast.success(t("product-added"));
      const a = cart?.findIndex((i) => i?.id == item?.id);
      a != -1
        ? setCart((prev) => {
            const x = [...(prev || [])];
            x[a] = { ...x[a], qty: x[a]?.qty + 1 };
            return x;
          })
        : setCart((prev) => [...prev, { ...item, qty: 1 }]);
    } else {
      toast.warn(t("log-in-before"));
      router.push("/auth/login");
    }
  };

  return (
    <>
      <button
        onClick={() => handleAddToCart(product)}
        className="text bg-[#FE5F0D]/25 max-md:text-xs rounded-md md:p-2 md:px-3 p-1 px-1.5 flex items-center gap-1"
      >
        <ShoppingCartIcon size={16} /> Cart
      </button>
    </>
  );
}

export default CardAddButton;
