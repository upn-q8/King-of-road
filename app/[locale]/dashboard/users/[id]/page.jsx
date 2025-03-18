"use client";
import { Mail, MoveRight, Phone, UserCircle2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { use, useEffect, useState } from "react";
import TableUser from "./components/TableUser";
import { Link } from "../../../../../navigation";
import axiosInstance from "../../../components/axios/axiosInstance";

function Page({ params }) {
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || "en";
  const id = unwrappedParams?.id || "en";

  const t = useTranslations("");

  const [data, setData] = useState();

  const getData = async () => {
    try {
      const res = await axiosInstance.get("user/" + id);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md border overflow-hidden flex items-center">
          <Link
            href={"/dashboard/users"}
            className="p-5 py-8 flex items-center justify-center text-white bg-[#3B745B]"
          >
            <MoveRight />
          </Link>
          <div className="flex justify-around items-center w-full  flex-wrap">
            <Card
              icon={<UserCircle2Icon size={45} className="text-[#F36E21]" />}
              title={t("tables-title.username")}
              description={data?.username}
            />
            <Card
              icon={<Mail size={45} className="text-[#F36E21]" />}
              title={t("authPage.email")}
              description={data?.email}
            />
            <Card
              icon={<Phone size={45} className="text-[#F36E21]" />}
              title={t("authPage.phone")}
              description={data?.phoneNumber}
            />
          </div>
        </div>
        <div className="p-3 bg-white rounded-xl shadow-md overflow-auto mt-4">
          <div className="flex gap-6 items-center pb-8">
            <img src="/dashboard/icon/features.png" alt="" />
            <h1 className="text-xl">{t("tables-title.users")}</h1>
          </div>
          <TableUser userId={id} data={data?.orders} />
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
        <p dir="ltr" className="text-gray-400 text-xs text-end">
          {description}
        </p>
      </div>
    </div>
  );
};

