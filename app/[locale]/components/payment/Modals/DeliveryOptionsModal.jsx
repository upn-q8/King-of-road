"use client";

import { CircleX } from "lucide-react";
import RoundedButton from "../../ui/RoundedButton";
import Modal from "../../ui/Modal";

const DeliveryOptionsModal = ({ isOpen, onClose, onNext }) => {
  return (
    <Modal
      className={"border border-main-green max-w-[979px] p-6 bg-[#F0F0F0]"}
      open={isOpen}
      close={onClose}
    >

      <div className="flex flex-col h-full gap-4 p-4 ">

        {/* Dropdowns */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative">
              <select className="w-full p-3 bg-white border rounded-full text-right appearance-none pr-4">
                <option>العاصمة</option>
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <div className="flex justify-center items-center ">
          <RoundedButton
            className={
              "bg-main-yellow p-3 text-white min-w-[320px] hover:opacity-80 duration-300 "
            }
            text="ألتالي"
            onClick={onNext}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeliveryOptionsModal;
