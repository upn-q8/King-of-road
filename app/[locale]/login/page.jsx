"use client";
import { useContext, useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import Input from "../components/ui/Input";
import RoundedButton from "../components/ui/RoundedButton";
import React from "react";
import { Link, usePathname, useRouter } from "../../../navigation";
import { useTranslations } from "next-intl";
import { Button } from "@headlessui/react";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import axiosInstance from "../components/axios/axiosInstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import AppContext from "../contexts";

const Page = () => {
  const { login } = useContext(AppContext);

  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : null;

  const email =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("email")
      : null;

  const tokenReset =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tokenReset")
      : null;

  const emailReset =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("emailReset")
      : null;

  const t = useTranslations("");
  const [open, setOpen] = useState();
  const [data, setData] = useState({
    client_uri: "window.location.origin" + "/ar/login",
  });

  const inputs = [
    { title: t("authPage.email"), name: "email", type: "email", icon: Mail },
    {
      title: t("authPage.password"),
      name: "password",
      type: "password",
      icon: Lock,
    },
  ];

  const handleConfirm = async () => {
    try {
      await axiosInstance
        .post(`auth/email-confirm?token=${token}&email=${email}`, token)
        .then(() => {
          setData({
            email: email,
            client_uri: "window.location.origin" + "/ar/login",
          });
          toast.success("Your account has been verified");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token && email) {
      handleConfirm();
    }
    if (tokenReset) {
      setOpen(true);
    }
  }, [token, email, tokenReset]);

  const handleSendData = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("auth/login", data).then((res) => {
        login(res?.data);
        toast.success("welcome");
        if (res?.data?.user?.role == "admin") {
          router.push("/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
      if (error?.response?.data[0] == "Please Verify Your Email") {
        toast.warn("Check your inbox");
      }
    }
  };

  return (
    <div className="min-h-[80vh] items-center justify-center bg-[#F0F0F0] p-4">
      <div className="container mx-auto p-3 pt-10">
        <p className="text-xl font-semibold">{t("authPage.login")}</p>
        <img src="/icon/line.png" />
        <form onSubmit={handleSendData} className="pt-6 lg:w-[450px] mx-auto">
          {inputs.map((item, i) => (
            <Input
              required
              name={item.name}
              key={i}
              value={data[item?.name] || ""}
              placeholder={item.title}
              onChange={(e) =>
                setData({ ...data, [item.name]: e.target.value })
              }
              type={item?.type}
              className={" text-black  w-full"}
              classNameInput={"w-full p-3 md:bg-[#FAFAFA] rounded-md mb-5"}
            />
          ))}

          <p
            onClick={() => setOpen(true)}
            className="md:w-full cursor-pointer mx-auto mb-5"
          >
            {t("authPage.fogotpassword")}
          </p>
          <button className="btn w-full md:w-3/4 block rounded-md mx-auto p-2">
            {t("authPage.login")}
          </button>

          <div className="text-center mt-5">
            <span className="text-sm text-gray-600">
              {t("authPage.no-account")}{" "}
              <Link href="/register" className="text ">
                {t("authPage.register")}
              </Link>
            </span>
          </div>
        </form>
        {open && (
          <FogotPassword
            open={open}
            email={emailReset}
            token={tokenReset}
            close={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;

const FogotPassword = ({ open, close, email, token }) => {
  const t = useTranslations("");

  const [data, setData] = useState({
    client_uri: "window.location.origin" + "/ar/login",
  });

  const handleSendData = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("auth/forgot-password ", data).then(() => {
        toast.info("Check your inbox");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance
        .post("auth/reset-password ", {
          email,
          token,
          password: data?.password,
          confirm_password: data?.confirm_password,
        })
        .then(() => {
          close();
          toast.success("changed the password");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal className={"bg-[#F0F0F0] md:max-w-2xl"} open={open} close={close}>
      <div className="flex items-start justify-between">
        <h1 className="text">{t("authPage.fogotpassword")}</h1>
        <div
          onClick={close}
          className="font-semibold rounded-full text-xs cursor-pointer p-1 px-2 border-2 border-black"
        >
          X
        </div>
      </div>
      <img src="/icon/line.png" className="my-5" alt="" />
      <form
        onSubmit={(e) => (email ? handleResetPassword(e) : handleSendData(e))}
      >
        <Input
          classNameInput={"w-full rounded mb-10"}
          className={"w-full text-start"}
          placeholder={t("authPage.email")}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          title={t("authPage.email")}
          disabled={email}
          value={email ? email : data?.email}
        />
        {email && (
          <>
            <Input
              classNameInput={"w-full rounded mb-10"}
              className={"w-full text-start"}
              placeholder={t("authPage.password")}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              title={t("authPage.password")}
            />
            <Input
              classNameInput={"w-full rounded mb-10"}
              className={"w-full text-start"}
              placeholder={"Confirm password"}
              onChange={(e) =>
                setData({ ...data, confirm_password: e.target.value })
              }
              title={"Confirm password"}
            />
          </>
        )}
        <Button
          type="submit"
          className={"text-xl w-full block btn rounded-md p-2"}
        >
          {t("confirm")}
        </Button>
      </form>
    </Modal>
  );
};
