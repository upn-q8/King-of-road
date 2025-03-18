
"use client";
import React from "react";
import CardProduct from "./components/CardProduct";
import Payment from "./components/Payment";

function Page() {
  return (
    <div className="bg-[#F0F0F0] py-10 px-3">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
  
        <div>
          <h1 className="text-xl mb-5">My Cart</h1>
          {Array.from({ length: 3 })?.map((_, i) => (
            <CardProduct
              key={i}
              subTitle="Front Suspension Systems"
              title="Front Suspension Systems"
              color={"#000"}
              price={250}
              size={"150cm*240cm"}
              image={"/home/product-1.png"}
            />
          ))}
        </div>
  
        <div>
          <Payment />
        </div>
      </div>
    </div>
  );
}

export default Page;
