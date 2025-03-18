import React from "react";

import { CircleX, MapPin, Phone } from "lucide-react";
import RoundedButton from "../../ui/RoundedButton";
import Modal from "../../ui/Modal";

const ConfirmationModal = ({ isOpen, onClose, onNext }) => {
  return (
    <Modal
      className={"border border-main-green max-w-[979px] p-6 bg-[#F0F0F0]"}
      open={isOpen}
      close={onClose}
    >
      <div onClick={onClose} className="flex  justify-end  cursor-pointer">
        <CircleX size={24} />
      </div>

      <div className="flex flex-col justify-center items-center h-full gap-4 p-4 ">
        {/* Top buttons */}
        <div className="flex w-full bg-white rounded-full max-w-[652px]">
          <button className="flex-1 rounded-full  text-main-green  py-3 text-center bg-primary  bg-white">
            توصيل
          </button>
          <button className="flex-1 rounded-full  bg-main-green text-white border py-3 text-center">
            استلام
          </button>
        </div>

        <div className="flex flex-col justify-center max-w-[652px] gap-2">
          <p>
            في حال رغبتك باستلام الطلب من المتجر يمكنك استلام طلبك من الموقع
            التالي :
          </p>
          <div className="flex flex-1 justify-between ps-4 pe-4 items-center bg-white rounded-full p-1">
            <div className="flex  justify-center items-center">
              <MapPin size={30} className="text-main-green" />
              <div className=" flex  flex-col justify-center items-center">
                <p className="text-main-green  text-lg font-semibold">
                  التوصيل إلى
                </p>
                <p className=" text-sm">العنوان هنا</p>
              </div>
            </div>
            <p className="text-main-green font-bold underline">عرض الخريطة</p>
          </div>
          <div className="flex flex-1 justify-around items-center bg-white rounded-full p-1">
            <div className="flex  justify-center items-center ml-auto ps-4 pe-4 ">
              <Phone size={30} className="text-main-green" />
              <div className=" flex  flex-col justify-center items-center">
                <p className="text-main-green text-lg font-semibold">
                  أرقام الهواتف
                </p>
                <p className=" text-sm" dir="ltr">
                  +965 9552 4548/+965 9552 4548/+965 9552 4548
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next button */}
        <div className="flex justify-center items-center ">
          <RoundedButton
            className={
              "bg-main-yellow p-3 text-white min-w-[320px] hover:opacity-80 duration-300 "
            }
            text="طلب تجهيز الطلب"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
