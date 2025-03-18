import Modal from "../../../components/ui/Modal";
import React, { useEffect, useState } from "react";
import Title from "../../../components/ui/Title";
import Input from "../../../components/ui/Input";
import Dropzone from "../../components/ui/DropImage";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import axiosInstance from "../../../components/axios/axiosInstance";
import { toast } from "react-toastify";
import Select from "../../../components/ui/Select";

function DiscountAdd({ open, close, getData, dataUpdate }) {
  const [data, setData] = useState({});

  const t = useTranslations("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data?.Start_Date > data?.End_Date) {
      toast.error("Modify the expiration date value");
      return "";
    }
    try {
      const res = await axiosInstance
        .post("discount/create", data, {})
        .then(() => {
          toast.success("The discount has been created successfully");
          getData();
          close();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (data?.Start_Date > data?.End_Date) {
      toast.error("Modify the expiration date value");
      return "";
    }
    try {
      const res = await axiosInstance
        .put("discount/" + dataUpdate?.id, {...data, Id : dataUpdate?.id})
        .then(() => {
          toast.success("The discount has been updated successfully");
          getData();
          close();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dataUpdate)
      setData({
        ...data,
        Code: dataUpdate?.code,
        Start_Date: dataUpdate?.starDate,
        End_Date: dataUpdate?.endDate,
        Percent: dataUpdate?.percent,
        Status: dataUpdate?.status,
      });
  }, [dataUpdate]);

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
      <form
        onSubmit={(e) => (dataUpdate ? handleSubmitUpdate(e) : handleSubmit(e))}
      >
        <Input
          placeholder={t("code-discount")}
          title={t("code-discount")}
          value={data?.Code || ""}
          onChange={(e) => setData({ ...data, Code: e.target.value })}
          classNameInput={"w-full rounded-md"}
          required
        />

        <Input
          placeholder={t("percent")}
          title={t("percent")}
          value={data?.Percent || ""}
          onChange={(e) => setData({ ...data, Percent: e.target.value })}
          classNameInput={"w-full rounded-md"}
          className={"my-4"}
          required
        />

        <Input
          placeholder={t("start-date")}
          title={t("start-date")}
          value={
            data?.Start_Date
              ? new Date(data?.Start_Date).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => setData({ ...data, Start_Date: e.target.value })}
          classNameInput={"w-full rounded-md"}
          type={"date"}
          تclassName={"my-4"}
          required
        />

        <Input
          placeholder={t("end-date")}
          title={t("end-date")}
          value={
            data?.End_Date
              ? new Date(data?.End_Date).toISOString().split("T")[0]
              : ""
          }
          type={"date"}
          onChange={(e) => setData({ ...data, End_Date: e.target.value })}
          classNameInput={"w-full rounded-md"}
          className={"my-4"}
          required
        />

        {typeof data?.Status == "boolean" && (
          <Select
            placeholder={t("status")}
            title={t("status")}
            value={data?.Status ? "فعال" : "غير فعال" || ""}
            options={["فعال", "غير فعال"]}
            onChange={(e) =>
              setData({
                ...data,
                Status: e.target.value == "فعال" ? true : false,
              })
            }
            className={"w-full rounded-md my-4"}
            required
          />
        )}
        <Button
          type="submit"
          className={"w-full block text-xl btn rounded-md p-2"}
        >
          {dataUpdate ? t("save") : t("add")}
        </Button>
      </form>
    </Modal>
  );
}

export default DiscountAdd;
