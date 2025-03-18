import React from "react";
import Input from "../../components/ui/Input";
import { MoveRight } from "lucide-react";

function Payment() {
  const Details = [
    { title: "Subtotal", value: "300" },
    { title: "Shipping", value: "100" },
    { title: "Discount", value: "10" },
    { title: "Total", value: "490" },
  ];

  return (
    <div className="bg-[#2A2A2A] rounded-lg p-8 text-white">
      <h1 className="text-xl mb-5">
        {" "}
        Payment <span className="text">details</span>
      </h1>
      <h4 className="text-sm">Select payment method</h4>
      <div className="flex items-center justify-between my-5">
        {["visa", "knet", "cash"].map((item, i) => (
          <div
            key={i}
            className="bg-white cursor-pointer border w-28 md:w-36 rounded-full p-3 px-4"
          >
            <img
              src={`/pay/${item}.png`}
              className="w-28 h-8 object-contain"
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 my-5">
        <Input
          classNameInput={"w-full px-4 rounded-lg bg-white"}
          className={"w-3/4"}
          placeholder={"Discount code"}
        />
        <button className="btn text-white rounded-md md:w-1/4 p-2.5">
          Confirm
        </button>
      </div>
      <hr />
      <div className="space-y-4 p-5">
        {Details?.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <p className="text">{item?.title}</p>
            <p className="text-start w-10" >${item?.value}</p>
          </div>
        ))}
      </div>
      <button className="flex items-center justify-center gap-1 btn p-3 rounded-md w-full" >Checkout <MoveRight /></button>
    </div>
  );
}

export default Payment;
