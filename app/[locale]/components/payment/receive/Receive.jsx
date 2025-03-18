import { Button } from "@headlessui/react";
import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Link } from "../../../../../navigation";

function Receive({ handlePay }) {
  const t = useTranslations("cart");

  return (
    <div className="md:p-4 p-1">
      <h1 className="text-xl font-serif my-8">{t("if-you")} :</h1>
      <Card
        title={t("store-address")}
        description={process.env.Address}
        Icon={<MapPin className="w-8 text" />}
        text={
          <Link href={process.env.Map || ""} target="_blank" className="text max-md:ms-5">
            {t("shop-on-map")}
          </Link>
        }
      />
      <Card
        title={t("phone-numbers")}
        description={process.env.Phone}
        Icon={<Phone className="text" size={28} />}
      />

      <Button
        onClick={handlePay}
        className={"md:w-72 w-full mx-auto text-xl btn rounded-full p-2 block mt-10"}
      >
        {t("order-request")}
      </Button>
    </div>
  );
}

export default Receive;

const Card = ({ Icon, title, description, text }) => {
  return (
    <div className="border rounded-full p-2  my-4 shadow-md flex items-center max-md:flex-wrap justify-between px-4 bg-white">
      <div className="flex items-center gap-2">
        {Icon}
        <div>
          <p className="text text-xl font-semibold">{title}</p>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div>{text}</div>
    </div>
  );
};
