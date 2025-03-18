"use client";
import { Mail, Phone, Globe, User, Lock } from "lucide-react";
import Input from "../components/ui/Input";
import RoundedButton from "../components/ui/RoundedButton";
import axiosInstance from "../components/axios/axiosInstance";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../../../navigation";
import { toast } from "react-toastify";

const page = () => {
  const t = useTranslations("");

  const [data, setData] = useState({
    client_uri: "window.location.origin" + "/ar/login",
  });

  const inputs = [
    {
      title: t("authPage.username"),
      name: "username",
      type: "text",
      icon: User,
    },
    { title: "Phone Number", name: "phone", type: "number", icon: Phone },
    { title: t("authPage.email"), name: "email", type: "email", icon: Mail },
    {
      title: t("authPage.password"),
      name: "password",
      type: "password",
      icon: Lock,
    },
    {
      title: "Confirm password",
      name: "confirm_password",
      type: "password",
      icon: Globe,
    },
  ];

  const router = useRouter();

  const handleSendData = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("auth/register", data).then(() => {
        toast.info("Check your inbox");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#F0F0F0] p-4">
      <div className="container mx-auto p-3 pt-10">
        <p className="text-xl font-semibold mb-3">{t("authPage.register")}</p>
        <img src="/icon/line.png" />
        <div className="w-full max-w-[1145px] mx-auto">
          <form onSubmit={handleSendData} className="pt-6 ">
            <div className="flex w-full justify-center gap-2 items-center flex-wrap">
              {inputs.map((item, i) => (
                <Input
                  required
                  name={item.name}
                  key={i}
                  type={item?.type}
                  placeholder={item.title}
                  onChange={(e) =>
                    setData({ ...data, [item.name]: e.target.value })
                  }
                  className={" text-black md:w-[45%] w-full"}
                  classNameInput={"w-full p-3 md:bg-[#FAFAFA] rounded-md mb-5"}
                />
              ))}
            </div>
            <button className="btn w-full md:w-1/4 block rounded-md mx-auto p-2">
              {t("authPage.register")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
