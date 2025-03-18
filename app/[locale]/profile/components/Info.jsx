"use client";
import React, { useContext, useEffect, useState } from "react";
import Title from "../../components/ui/Title";
import Input from "../../components/ui/Input";
import { Earth, LocateFixed, Mail, Map, Phone, User } from "lucide-react";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import axiosInstance from "../../components/axios/axiosInstance";
import { useRouter } from "../../../../navigation";
import AppContext from "../../contexts";
import { toast } from "react-toastify";

function Info() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const { user, token } = useContext(AppContext);

  const t = useTranslations("");

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await axiosInstance
        .delete(`user/${user?.id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          toast.error("Deleted the user");
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axiosInstance.get("user/" + user?.id, {
        headers: { Authorization: "Bearer " + token },
      });
      setData({
        user_Name: res?.data?.username,
        phone_Number: res?.data?.phoneNumber,
        Address: res?.data?.address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendData = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance
        .put(
          `user/` + user?.id,
          {
            Phone_Number: data?.phone_Number,
            User_Name: data?.user_Name,
            Address: data?.address,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          toast.success("updated the user");
          getData();
          setIdUpdate(null);
        });
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) getData();
  }, [user?.id]);

  const Inputs = [
    { title: "Full name", name: "Full_Name", icon: User },
    { title: "Phone", name: "Phone_Number", icon: Phone },
    { title: t("address"), name: "Address", icon: LocateFixed },
    { title: "Email", name: "Email" },

  ];

  const handleSetData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSendData} className="container mx-auto  p-4">
        <h1 className="text-xl">Personal information</h1>
        <div className="flex items-center flex-wrap justify-between gap-4">
          {Inputs?.map((item, i) => (
            <Input
              key={i}
              value={data?.[item?.name] ? data?.[item?.name] : ""}
              classNameInput={"w-full bg-[#FAFAFA] rounded-md p-4"}
              className={"my-1 md:w-[48%] w-full"}
              placeholder={item?.title}
              name={item?.name}
              onChange={handleSetData}
              required
            />
          ))}
        </div>

        <Button
          type="submit"
          className={"mx-auto md:w-1/3 w-full btn rounded-md p-2 block mt-10"}
        >
          Save change
        </Button>

        <p className="text-center text-xl my-10 mb-20">
          <img
            src="/delete.png"
            className="inline-block me-2"
            width={22}
            alt=""
          />
          {t("delete-account")}
        </p>
      </form>

      {open && (
        <ModalDelete
          action={handleDelete}
          open={true}
          closeModal={() => setOpen(false)}
          text={t("delete")}
        />
      )}
    </div>
  );
}

export default Info;
