import React from "react";

function Brands() {
  return (
    <div className="container mx-auto p-2 py-10">
      <h1 className="text-2xl">
        We provide all <span className="text">Maintenance</span> services
        related to these brands
      </h1>
      <img src="/icon/line.png" className="mt-5" alt="" />
      <div className="flex items-center gap-10 mt-10 overflow-auto pb-5">
        {Array.from({ length: 6 })?.map((item, i) => (
          <img
            src={`/service/${i % 2 == 0 ? "Hyundai" : "BMW"}.png`}
            key={i}
            className="w-16 md:w-28 md:h-28 h-16 object-contain"
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

export default Brands;
