import React, { useState } from "react";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import { Button } from "@headlessui/react";
import { ChevronLeftIcon, Clock, Mail, Map, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { dataKW } from "./../../cart/data-kw";

function Delivery({ step, setStep, handlePay }) {
  const [data, setData] = useState({ pay: "", pay_X: "" });

  const [location, setLocation] = useState({
    country: "",
    city: "",
    street: null,
  });

  const t = useTranslations("cart");

  console.log(location);
  

  const Inputs = [
    { placeholder: t("street-name"), name: "Street_Name", Icon: Map },
    { placeholder: t("name"), name: "Name", Icon: User },
    { placeholder: t("phone"), name: "Phone", type: "number", Icon: Phone },
  ];

  const handleSetData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const countries = dataKW?.map((item, i) => Object.keys(item)[0]);

  return (
    <div>
      {step == "1" ? (
        <>
          <Select
            className={"w-full rounded-full px-4 mt-3"}
            onChange={(e) => {
              setLocation({ ...location, country: e.target.value });
            }}
            options={countries}
          />
          {location?.country && (
            <Select
              className={"w-full rounded-full px-4 mt-3"}
              onChange={(e) => {
                setLocation({ ...location, city: e.target.value });
              }}
              options={
                dataKW?.find(
                  (item, i) => Object.keys(item)[0] == location?.country
                )[location?.country]
              }
            />
          )}
        </>
      ) : step == "2" ? (
        <div>
          {/* <div className="flex items-center flex-wrap gap-4">
            <Card
              title={t("delivery-to")}
              description={`${location?.country} , ${location?.city} , ${location?.street}`}
              Icon={<img className="w-8" src="/routing.png" />}
            />
            <Card
              title={t("delivery-time")}
              description={t("possible")}
              Icon={<Clock className="text" size={28} />}
            />
          </div> */}
          <form>
            {Inputs?.map((item, i) => (
              <Input
                key={i}
                icon={<item.Icon className="text" />}
                classNameInput={"w-full rounded-full ps-12"}
                iconClassName={"absolute top-2 right-2"}
                className={"my-4"}
                placeholder={item?.placeholder}
                type={item?.type || "text"}
                name={item?.name}
                onChange={handleSetData}
              />
            ))}
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold">{t("payment-method")}</h1>
          <div className="flex justify-between items-center my-4">
            {["net.png", "cash.png", "visa.png"]?.map((item, i) => (
              <div
                key={i}
                className="bg-white border py-4 w-[30%] rounded-full shadow-sm cursor-pointer"
                onClick={() =>
                  setData({
                    ...data,
                    pay: i == 1 ? "cash" : "payment",
                    pay_X: item,
                  })
                }
                style={{ borderColor: item == data?.pay_X ? "#896e4b" : "" }}
              >
                <img src={"/pay/" + item} className="mx-auto h-10" alt="" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {step == 2 && (
          <Button
            className={
              "w-72 mx-auto text-xl btn-secondary rounded-full p-2 block mt-10"
            }
            onClick={() => setStep(step - 1)}
          >
            {t("previous")}
          </Button>
        )}
        <Button
          disabled={
            step == 1
              ? !location?.city
              : step == 2
              ? !data?.Street_Name || !data?.Name || !data?.Phone
              : !data?.pay
          }
          className={"w-72 mx-auto text-xl btn rounded-full p-2 block mt-10"}
          onClick={() => {
            step == 3
              ? handlePay({
                  Location: `${location?.country} , ${location?.city} , ${data?.Street_Name}`,
                  Recevier: data?.Name,
                  Phone: data?.Phone,
                  Payment_Method: data?.pay,
                })
              : setStep(step + 1);
          }}
        >
          {step == 3 ? t("pay-now") : t("next")}
        </Button>
      </div>
    </div>
  );
}

export default Delivery;

const Card = ({ Icon, title, description }) => {
  return (
    <div className="border rounded-full p-2 md:w-[48%] w-full shadow-md flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-2">
        {Icon}
        <div>
          <p className="text text-xl font-semibold">{title}</p>
          <p className="text-gray-600">{description?.substr(0, 20)}...</p>
        </div>
      </div>
      <ChevronLeftIcon className="btn rounded-full p-1" />
    </div>
  );
};
