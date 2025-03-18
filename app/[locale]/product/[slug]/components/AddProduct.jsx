"use client";
import React, { useContext, useState } from "react";
import AppContext from "../../../contexts";
import SubmitCustomRequest from "./SubmitCustomRequest";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useRouter } from "../../../../../navigation";

function AddProduct({ data, quantities, locale }) {
  const [quantity, setQuantity] = useState(1);

  const [open, setOpen] = useState(false);

  const [selectedSize, setSelectedSize] = useState(
    data?.quantities?.find((i) => i?.default == true) || {}
  );

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const t = useTranslations("");

  const { isAuth, setCart, cart } = useContext(AppContext);

  const handleAddToCart = (item) => {
    toast.success(t("product-added"));
    const a = cart?.findIndex((i) => i?.id == item?.id);
    a != -1
      ? setCart((prev) => {
          const x = [...(prev || [])];
          x[a] = { ...x[a], qty: x[a]?.qty + 1 };
          return x;
        })
      : setCart((prev) => [
          ...prev,
          { ...item, qty: quantity, is_checked: selectedSize?.id },
        ]);
  };

  const router = useRouter();

  const quintity = [
    { title: "150cm*240cm" },
    { title: "150cm*240cm" },
    { title: "150cm*240cm" },
  ];

  const colors = [
    { color: "#2A2A2A" },
    { color: "#90061B" },
    { color: "#4F5155" },
    { color: "#4F5155" },
    { color: "#81A439" },
    { color: "#4F5155" },
  ];

  return (
    <>
      <h3 className="text-xl">Available sizes</h3>

      <div className="flex gap-3 items-center flex-wrap">
        {quintity?.map((item, i) => (
          <p
            key={i}
            className="bg-white border min-w-36 p-2 px-4 rounded-md shadow"
          >
            {item?.title}
          </p>
        ))}
      </div>

      <h3 className="text-xl">Available Colors</h3>

      <div className="flex gap-3 items-center overflow-auto">
        {colors?.map((item, i) => (
          <p
            style={{ background: item?.color }}
            key={i}
            className="rounded-full cursor-pointer w-7 h-7"
          ></p>
        ))}
      </div>

      <div className="flex items-center bg-white p-1 w-fit rounded-xl shadow border gap-4">
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 bg-gray-400 text-white flex items-center justify-center rounded-xl"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-12 text-center text-lg">{quantity}</span>
          <button
            className="w-9 h-9 btn text-2xl flex items-center justify-center cursor-pointer rounded-xl"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 max-md:flex-wrap">
        <button
          onClick={() => {
            if (isAuth) handleAddToCart(data);
            else {
              router.push("/login");
              toast.warn(t("log-in-before"));
            }
          }}
          className="md:w-[30%] w-full btn text-white text-lg py-2 px-6 rounded-lg transition-colors"
        >
          {t("addToCart")}
        </button>
        <button
          onClick={() => {
            if (isAuth) {
              handleAddToCart(data);
              router.push("/cart");
            } else {
              router.push("/login");
              toast.warn(t("log-in-before"));
            }
          }}
          className="md:w-[30%] w-full btn-three bg-transparent text-white text-lg py-2 px-6 rounded-lg transition-colors"
        >
          Buy Now
        </button>
        <button
          onClick={() => {
            if (isAuth) setOpen(true);
            else {
              router.push("/login");
              toast.warn(t("log-in-before"));
            }
          }}
          className="md:w-[30%] w-full btn-secondary text-white text-sm text-nowrap py-2 h-11 px-6 rounded-lg transition-colors"
        >
          Submit a custom request
        </button>
      </div>
      <SubmitCustomRequest open={open} close={() => setOpen(false)} />
    </>
  );
}

export default AddProduct;
