import React, { useState } from "react";
import DeliveryOptionsModal from "./Modals/DeliveryOptionsModal";
import DeliveryInfoModal from "./Modals/DeliveryInfoModal";
import PaymentModal from "./Modals/PaymentModal";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Modal from "../ui/Modal";
import Delivery from "./delivery/Delivery";
import Receive from "./receive/Receive";
import { CircleX } from "lucide-react";

const PaymentFlow = ({ isOpen, onClose, onComplete,handlePay }) => {
  const [step, setStep] = useState(1);

  const [active, setActive] = useState("1");

  const t = useTranslations("");

  return (
    <Modal
      open={isOpen}
      className={"border border-main-green max-w-[979px] md:p-6 p-3 bg-[#F0F0F0]"}
      close={onClose}
    >
      <div onClick={onClose} className="flex  justify-end mb-5  cursor-pointer">
        <CircleX size={24} />
      </div>
      <Tab.Group>
        <Tab.List
          className={"flex w-full mb-4 items-center-full bg-white rounded-full"}
        >
          <Tab
            onClick={() => setActive("1")}
            className={
              "w-1/2 font-semibold text-center text-xl py-1.5 rounded-full"
            }
            style={{
              color: active == "1" ? "#fff" : "#3b745b",
              background: active == "1" ? "#3b745b" : "",
            }}
          >
            {t("delivery")}
          </Tab>
          <Tab
            onClick={() => setActive("2")}
            className={
              "w-1/2 font-semibold text-center text-xl py-1.5 rounded-full"
            }
            style={{
              color: active == "2" ? "#fff" : "#3b745b",
              background: active == "2" ? "#3b745b" : "",
            }}
          >
            {t("receive")}
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel className={"w-full"}>
            <Delivery handlePay={handlePay} step={step} setStep={setStep} />
          </Tab.Panel>
          <Tab.Panel className={"w-full"}>
            <Receive />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Modal>
  );
};

export default PaymentFlow;
