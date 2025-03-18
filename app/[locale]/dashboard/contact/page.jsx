"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import axiosInstance from "../../components/axios/axiosInstance";
import { toast } from "react-toastify";

function Contact() {
  const [data, setData] = useState({});

  const t = useTranslations("");

  const Inputs = [
    { placeholder: t("authPage.phone"), icon: "/call", name: "Phone_Number" },
    { placeholder: t("location_Ar"), icon: "/location", name: "Location_Ar" },
    { placeholder: t("location_En"), icon: "/location", name: "Location_En" },
    {
      placeholder: t("navbar.instagram"),
      icon: "/instgram",
      name: "Instagram",
    },
    { placeholder: t("navbar.whatsapp"), icon: "/whatsapp", name: "WhatsApp" },
    { placeholder: t("navbar.tiktok"), icon: "/tiktok", name: "TikTok" },
  ];

  const handleSetData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSendData = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put("contact/update", data).then(() => {
        toast.success("Updated contact info");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GetData = async () => {
    try {
      const res = await axiosInstance.get("contact/info");
      setData({
        ...data,
        Phone_Number: res?.data?.phone_Number,
        Location_Ar: res?.data?.location_Ar,
        Location_En: res?.data?.location_En,
        Instagram: res?.data?.instagram,
        WhatsApp: res?.data?.whatsApp,
        TikTok: res?.data?.tikTok,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <div className="p-6">
        <div className="p-6 rounded-xl min-h-[80vh] bg-white shadow-md">
          <div className="flex items-center gap-3">
            <img src="/dashboard/support.png" alt="" />
            <h1 className="text-xl font-semibold text">
              {t("dashboard.contact-info")}
            </h1>
          </div>
          <hr className="my-4" />

          <form onSubmit={handleSendData}>
            {Inputs?.map((item, i) => (
              <div key={i} className="flex items-center gap-4 mb-5">
                <img src={"/icon" + item?.icon + "-2.png"} alt="" />
                <Input
                  name={item?.name}
                  placeholder={item.placeholder}
                  value={data?.[item?.name] || ""}
                  onChange={handleSetData}
                  classNameInput={
                    "md:w-96 w-full p-2 rounded-full bg-gray-300 "
                  }
                />
              </div>
            ))}
            <Button
              type="submit"
              className={
                "btn md:w-96 w-full text-xl rounded-full p-2 mt-2 md:ms-14"
              }
            >
              {t("save-changes")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
