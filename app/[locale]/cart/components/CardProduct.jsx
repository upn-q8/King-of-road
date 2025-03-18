import React from "react";

function CardProduct({ subTitle, title, price , color, size , image, product}) {
  return (
    <div className="flex items-center shadow max-md:flex-wrap gap-3 bg-white rounded-md mt-5 overflow-hidden">
      <img className="md:w-[37%] w-full" src={image} alt="" />
      <div className="md:w-[62%] w-full p-3">
        <div className="flex items-center justify-between w-full">
          <div>
            <h4 className="text-sm text">{subTitle}</h4>
            <h1 className="md:text-xl">{title}</h1>
          </div>
          <p className="text font-semibold">{price}$</p>
        </div>
        <div className="flex gap-4 items-start text-xs mt-2">
          <div>
            <h1 className="text-gray-500 mb-2">Selected color</h1>
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ background: color}}
            ></div>
          </div>
          <div>
            <h1 className="text-gray-500 mb-2">Selected size</h1>
            <h1>{size}</h1>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 border rounded-lg p-0.5">
            <button className="w-7 h-7 bg-gray-400 text-white flex items-center justify-center rounded-lg">
              -
            </button>
            <span className="w-12 text-center text-lg">1</span>
            <button className="w-7 h-7 btn text-2xl flex items-center justify-center cursor-pointer rounded-lg">
              +
            </button>
          </div>
          <img src="/delete.png" className="cursor-pointer" alt="" />
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
