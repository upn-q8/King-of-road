"use client";
import React, { useContext } from "react";
import AppContext from "../contexts";
import { Link, useRouter } from "../../../navigation";
import RoundedButton from "./ui/RoundedButton";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

const ButtonAddToCart = ({
  product,
  buyBtnClassName,
  addToCartBtnClassName,
}) => {
  const { addToCart, cart, isAuth } = useContext(AppContext);

  const t = useTranslations("");

  const router = useRouter();

  const handleAddToCart = (product) => {
    toast.success(t("product-added"));
    addToCart({
      ...product,
      qty: 1,
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 p-1">
      <RoundedButton
        text={t("addToCart")}
        className={`${addToCartBtnClassName} max-md:text-xs duration-300`}
        onClick={() => {
          if (isAuth) {
            handleAddToCart(product);
          } else {
            router.push("/login");
          }
        }}
      />

      <RoundedButton
        onClick={() => {
          if (isAuth) {
            handleAddToCart(product);
            router.push("/cart");
          } else {
            router.push("/login");
          }
        }}
        text={t("direct")}
        className={`${buyBtnClassName} max-md:text-xs`}
      />
    </div>
  );
};

export default ButtonAddToCart;
