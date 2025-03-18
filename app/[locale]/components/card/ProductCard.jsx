import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../../../navigation";
import ButtonAddToCart from "../ButtonAddToCart";
import CardAddButton from "./CardAddButton";
import Stars from "./Stars";

const ProductCard = ({
  title,
  subTitle,
  image,
  price,
  offer,
  sale,
  className,
  style,
  slug,
  rate,
  product,
}) => {
  const t = useTranslations("");

  return (
    <div
      className={` max-md:w-[48%] md:max-w-72 md:min-w-60 overflow-hidden hover:scale-105 transition-all ${className} relative`}
    >
      <img src={image} className="md:h-[210px] h-36 bg-white w-full" alt="" />
      {sale && (
        <span className="absolute top-0 right-0 text-sm bg text-white rounded-bl-lg p-2 px-3">
          Sale {sale}%
        </span>
      )}
      <div className="p-4 bg-white">
        <h5 className="text-[10px] md:text-xs text-gray-400">{subTitle}</h5>
        <h3 className="text-xs md:text-xl mt-1.5">{title}</h3>
       <Stars rate={rate} />
        <div className="flex items-center justify-between gap-2">
          {offer ? (
            <div className="flex items-center md:gap-2 gap-1 text-xs md:text-xl">
              <p className="text md:text-lg">${offer}</p>
              <del className="text-gray-500 md:text-lg">${price}</del>
            </div>
          ) : (
            <p className="text text-sm md:text-xl">${price}</p>
          )}
          <CardAddButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
