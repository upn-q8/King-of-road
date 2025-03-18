import Modal from "../../../components/ui/Modal";
import React, { useEffect, useState } from "react";
import Title from "../../../components/ui/Title";
import Input from "../../../components/ui/Input";
import Dropzone from "../../components/ui/DropImage";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import axiosInstance from "../../../components/axios/axiosInstance";
import { toast } from "react-toastify";

function CategoryAdd({ open, close, getData, id }) {
  const [data, setData] = useState({ image: null });

  const t = useTranslations("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance
        .post("category/create", data)
        .then(() => {
          toast.success("The category has been created successfully");
          getData();
          close();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance
        .put("category/" + id?.id, data)
        .then(() => {
          toast.success("The category has been updated successfully");
          getData();
          close();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id)
      setData({
        ...data,
        Name_En: id?.name_En,
        Name_Ar: id?.name_Ar,
      });
  }, [id]);

  return (
    <Modal
      open={open}
      close={close}
      className={"md:bg-[#F0F0F0] border-2 md:max-w-2xl border-[#3B745B]"}
    >
      <div className="flex items-center justify-between">
        <div className="mb-3">
          <Title title={t("add")} className={"text-xl w-40 mb-0 mt-0"} />
        </div>
        <div
          onClick={close}
          className="border-2 cursor-pointer border-black rounded-full p-0.5 px-2 font-semibold"
        >
          X
        </div>
      </div>
      <form onSubmit={(e) => (id ? handleSubmitUpdate(e) : handleSubmit(e))}>
        <Input
          placeholder={t("name-ar")}
          title={t("name-ar")}
          value={data?.Name_Ar || ""}
          onChange={(e) => setData({ ...data, Name_Ar: e.target.value })}
          classNameInput={"w-full rounded-md"}
        />

        <Input
          placeholder={t("name-en")}
          title={t("name-en")}
          value={data?.Name_En || ""}
          onChange={(e) => setData({ ...data, Name_En: e.target.value })}
          classNameInput={"w-full rounded-md"}
          className={"my-4"}
        />
        
        <Button
          type="submit"
          className={"w-full block text-xl btn rounded-md p-2"}
        >
          {id ? t("save") : t("add")}
        </Button>
      </form>
    </Modal>
  );
}

export default CategoryAdd;
