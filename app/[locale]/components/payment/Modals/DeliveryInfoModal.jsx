"use client";

import React from "react";
import { DialogTitle } from "@headlessui/react";
import Modal from "../../ui/Modal";
import {
  CircleX,
  LucideChevronLeft,
  LucideMoveLeft,
  LucideMoveRight,
} from "lucide-react";
import Input from "../../ui/Input";
import { MapPin } from "lucide-react";
import { User } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import RoundedButton from "../../ui/RoundedButton";

export function DeliveryInfoModal({ isOpen, onClose, onNext, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onNext({
      address: formData.get("address"),
      phone: formData.get("phone"),
      phone: formData.get("name"),
      email: formData.get("email"),
    });
  };

  return (
    <Modal
      className={"border  border-main-green max-w-[979px] p-8 bg-[#F0F0F0]"}
      open={isOpen}
      close={onClose}
    >
      <div onClick={onClose} className="flex  justify-end  cursor-pointer">
        <CircleX size={24} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between items-center gap-2  "
      >
        <DialogTitle className="text-xl font-medium  text-right mb-4">
          معلومات التوصيل
        </DialogTitle>

        <div className=" flex  justify-around items-center w-full max-md:flex-wrap max-w-[652px] gap-4">
          <div className="flex md:w-1/2 w-full border shadow-md justify-around items-center bg-white rounded-full p-1">
            <div className="flex  justify-center items-center">
              <img src="/routing.png" />
              <div className=" flex  flex-col justify-center items-center">
                <p className="text-main-green">التوصيل إلى</p>
                <p className=" text-sm">العاصمة/اسم المنطقة</p>
              </div>
            </div>
            <LucideChevronLeft className="bg-[#3B745B] text-white rounded-full p-1" />
          </div>
          <div className="flex md:w-1/2 w-full border shadow-md justify-around items-center bg-white rounded-full p-1">
            <div className="flex  justify-center items-center">
              <img src="/clock.png" />
              <div className=" flex  flex-col justify-center items-center">
                <p className="text-main-green">وقت التوصيل</p>
                <p className="text-sm">في أقرب وقت ممكن</p>
              </div>
            </div>
            <LucideChevronLeft className="bg-[#3B745B] text-white rounded-full p-1" />
          </div>
        </div>

        <div className="flex flex-col justify-center md:w-[652px] w-full gap-3">
          <Input
            id={"street"}
            placeholder={"اسم الشارع"}
            className={" text-black w-full"}
            classNameInput={
              "rounded-full bg-white p-3 border w-full ps-12  text-black border-[#DADADA]"
            }
            icon={<MapPin className="text-main-green" />}
            iconClassName={`absolute   top-2.5 right-4`}
          />
          <Input
            id={"person"}
            placeholder={"الطالب"}
            className={" text-black w-full"}
            classNameInput={
              "rounded-full bg-white p-3 border w-full ps-12  text-black border-[#DADADA]"
            }
            icon={<User className="text-main-green" />}
            iconClassName={`absolute   top-2.5 right-4`}
          />
          <Input
            id={"phone"}
            placeholder={"الهاتف"}
            className={" text-black w-full"}
            classNameInput={
              "rounded-full bg-white p-3 border w-full ps-12  text-black border-[#DADADA]"
            }
            icon={<Phone className="text-main-green" />}
            iconClassName={`absolute   top-2.5 right-4`}
          />
          <Input
            id={"email"}
            placeholder={"البريد الإلكتروني"}
            className={" text-black w-full"}
            classNameInput={
              "rounded-full bg-white p-3 border w-full ps-12  text-black border-[#DADADA]"
            }
            icon={<Mail className="text-main-green" />}
            iconClassName={`absolute   top-2.5 right-4`}
          />
        </div>

        <div className="flex justify-center items-center max-md:flex-wrap gap-2 w-full md:w-[652px]">
          <RoundedButton
            className={
              " border border-main-yellow  md:w-1/2 w-full p-2 text-main-yellow hover:text-white hover:bg-main-yellow duration-300"
            }
            text={"السابق"}
            onClick={onBack}
          />
          <RoundedButton
            className={
              "bg-main-yellow hover:opacity-80 duration-300 md:w-1/2 w-full p-2 text-white"
            }
            text={"ألتالي"}
            onClick={onNext}
          />
        </div>
      </form>
    </Modal>
  );
}

export default DeliveryInfoModal;
