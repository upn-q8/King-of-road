import React, { useState } from "react";
import Modal from "../../ui/Modal";
import { DialogTitle } from "@headlessui/react";
import { CircleX } from "lucide-react";
import RoundedButton from "../../ui/RoundedButton";

const PaymentModal = ({ isOpen, onClose, onNext }) => {
  const [check, setCheck] = useState(null);

  const paymentMethods = [
    {
      name: "",
      img: "/pay/cash.png",
    },
    {
      name: "",
      img: "/pay/net.png",
    },
    {
      name: "",
      img: "/pay/visa.png",
    },
  ];
  return (
    <Modal
      className={"border border-main-green max-w-[979px] p-6 bg-[#F0F0F0]"}
      open={isOpen}
      close={onClose}
    >
      <div onClick={onClose} className="flex  justify-end  cursor-pointer">
        <CircleX size={24} />
      </div>
      <DialogTitle className="text-xl font-medium flex justify-center   text-right mb-4">
        وسيلة الدفع
      </DialogTitle>

      <div className="flex flex-col justify-center h-full gap-4 p-4 ">
        <div className="flex  flex-col justify-center items-center   gap-4">
          <div className="flex flex-col justify-center  gap-6">
            <p className="text-[22px]  font-semibold self-start">
              اخترر وسيلة دفع
            </p>
            <div className="flex justify-center max-md:flex-wrap items-center md:w-[652px]  gap-2">
              {paymentMethods.map((item, index) => {
                return (
                  <button
                    onClick={() => setCheck(index)}
                    className="flex border-2 justify-center w-full md:w-1/3 h-[96px] items-center bg-white rounded-full p-4"
                    key={index}
                    style={{borderColor : check == index ? "#FEB91B" :"" }}
                  >
                    <img src={item.img} />
                  </button>
                );
              })}
            </div>
            <RoundedButton
              className={
                "bg-main-yellow p-3 self-center text-white w-[320px] hover:opacity-80 duration-300 "
              }
              text="ألتالي"
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
