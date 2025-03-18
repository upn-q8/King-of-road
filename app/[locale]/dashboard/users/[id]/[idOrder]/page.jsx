"use client";
import {
  BadgePercent,
  CreditCard,
  Hash,
  Mail,
  MoveRight,
  Phone,
  UserCircle2Icon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { use, useEffect, useState } from "react";
import { Link } from "../../../../../../navigation";
import axiosInstance from "../../../../components/axios/axiosInstance";

function Page({ params }) {
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || "en";

  const id = unwrappedParams?.idOrder;
  const t = useTranslations("");
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const res = await axiosInstance.get("order/" + id);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const data1 = [
    { user_Name: "Client name", phone_Number: "+965 856 235 96", email: "user@example.com" }
  ];
  return (
    <div>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md border overflow-hidden flex items-center">
          <Link
            href={"/dashboard/orders"}
            className="py-16 p-5 flex h-full items-center justify-center text-white bg-[#3B745B]"
          >
            <MoveRight />
          </Link>
          <div className="w-full">
            <div className="flex justify-around items-center mb-4 w-full  flex-wrap">
              <Card
                icon={<UserCircle2Icon size={45} className="text-[#F36E21]" />}
                title={t("tables-title.username")}
                description={data?.user_Name}
              />
              <Card
                icon={<Mail size={45} className="text-[#F36E21]" />}
                title={t("authPage.email")}
                description={data?.email}
              />
              <Card
                icon={<Phone size={45} className="text-[#F36E21]" />}
                title={t("authPage.phone")}
                description={data?.user_PhoneNumber}
              />
            </div>
            <div className="flex justify-around items-center w-full mt-2 flex-wrap">
              <Card
                icon={<Hash size={45} className="text-[#F36E21]" />}
                title={t("tables-title.request-code")}
                description={data?.id}
              />
              <Card
                icon={<CreditCard size={45} className="text-[#F36E21]" />}
                title={t("tables-title.payment-method")}
                description={"كاش عند الاستلام"}
              />
              <Card
                icon={<BadgePercent size={45} className="text-[#F36E21]" />}
                title={t("tables-title.order-cost")}
                description={data?.total_Amount + t("KWD")}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-10 justify-between flex-wrap">
          {data?.orderDetails?.map((item, i) => (
            <ProductCard
              title={item?.product_Name_Ar}
              option={
                item?.name_Ar + " / " + t("quantity") + item?.quantity_Of_Unit
              }
              price={
                item?.offer ? item?.offer + t("KWD") : item?.price + t("KWD")
              }
              image={process.env.Images + item?.product_Image}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

const Card = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p>{title}</p>
        <p dir="ltr" className="text-gray-400 text-xs mt-2 text-end">
          {description}
        </p>
      </div>
    </div>
  );
};

const ProductCard = ({ image, title, option, price }) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-3 md:p-8 md:w-[48%] flex-wrap">
      <img className="md:max-w-40" src={image} alt="" />
      <div>
        <h1 className="text-xl">{title}</h1>
        <p className="text my-4">{option}</p>
        <p className="text text-xl">{price}</p>
      </div>
    </div>
  );
};
