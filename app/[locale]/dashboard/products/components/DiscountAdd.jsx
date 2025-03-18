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
// import Modal from "../../../components/ui/Modal";
// import React, { useEffect, useState } from "react";
// import Title from "../../../components/ui/Title";
// import Input from "../../../components/ui/Input";
// import { Button } from "@headlessui/react";
// import { useTranslations } from "next-intl";
// import axiosInstance from "../../../components/axios/axiosInstance";
// import { toast } from "react-toastify";
// import Select from "../../../components/ui/Select";

// function DiscountAdd({ open, close, getData, dataUpdate }) {
//   const [data, setData] = useState({});
//   const [discountType, setDiscountType] = useState("Product");
//   const [notifySubscribed, setNotifySubscribed] = useState(true);
//   const [notifyPurchased, setNotifyPurchased] = useState(false);

//   const t = useTranslations("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (data?.Start_Date > data?.End_Date) {
//       toast.error("Modify the expiration date value");
//       return;
//     }
//     try {
//       await axiosInstance.post("discount/create", data);
//       toast.success("The discount has been created successfully");
//       getData();
//       close();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmitUpdate = async (e) => {
//     e.preventDefault();
//     if (data?.Start_Date > data?.End_Date) {
//       toast.error("Modify the expiration date value");
//       return;
//     }
//     try {
//       await axiosInstance.put(`discount/${dataUpdate?.id}`, {
//         ...data,
//         Id: dataUpdate?.id,
//       });
//       toast.success("The discount has been updated successfully");
//       getData();
//       close();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (dataUpdate)
//       setData({
//         Code: dataUpdate?.code,
//         Start_Date: dataUpdate?.starDate,
//         End_Date: dataUpdate?.endDate,
//         Percent: dataUpdate?.percent,
//         Status: dataUpdate?.status,
//       });
//   }, [dataUpdate]);

//   return (
//     <Modal open={open} close={close} className="md:bg-[#F0F0F0] border-2 md:max-w-2xl  p-5 rounded-lg">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         {/* <Title title={"Add Discount"} className="text-xl font-semibold" /> */}
//         <h1 className="text-xl font-semibold text-[#2a2a2a]">Add Discount</h1>
//         <div
//           onClick={close}
//           className=" cursor-pointer  px-3 font-semibold"
//         >
//           X
//         </div>
//       </div>
//       <div className="w-full h-[1px] mt-1 bg-gradient-to-r from-orange-500 via-orange-300 to-orange-100 opacity-70"></div>

//       {/* Discount Type Selection */}
//       <div className="mt-4 border-b pb-4">
//         <p className="font-semibold mb-2">Select the value to be deducted</p>
//         <div className="flex gap-4">
//           {["Product", "Category", "Create discount code", "Client"].map((type) => (
//             <label key={type} className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 name="discountType"
//                 value={type}
//                 checked={discountType === type}
//                 onChange={() => setDiscountType(type)}
//               />
//               {type}
//             </label>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={(e) => (dataUpdate ? handleSubmitUpdate(e) : handleSubmit(e))} className="mt-5">
//         {/* Conditional Inputs */}
//         {discountType === "Product" && (
//           <Input
//             placeholder="Enter product code"
//             title="Enter product code"
//             value={data?.Code || ""}
//             onChange={(e) => setData({ ...data, Code: e.target.value })}
//             classNameInput="w-full rounded-md"
//             required
//           />
//         )}

//         <Input
//           placeholder="Enter discount value"
//           title="Enter discount value"
//           value={data?.Percent || ""}
//           onChange={(e) => setData({ ...data, Percent: e.target.value })}
//           classNameInput="w-full rounded-md my-4"
//           required
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <Input
//             placeholder="Start date"
//             title="Enter start date"
//             type="date"
//             value={data?.Start_Date ? new Date(data?.Start_Date).toISOString().split("T")[0] : ""}
//             onChange={(e) => setData({ ...data, Start_Date: e.target.value })}
//             classNameInput="w-full rounded-md"
//             required
//           />

//           <Input
//             placeholder="End date"
//             title="Enter end date"
//             type="date"
//             value={data?.End_Date ? new Date(data?.End_Date).toISOString().split("T")[0] : ""}
//             onChange={(e) => setData({ ...data, End_Date: e.target.value })}
//             classNameInput="w-full rounded-md"
//             required
//           />
//         </div>

//         {/* Notification Checkboxes */}
//         <div className="mt-4">
//           <p className="font-semibold">Do you want to send a notification to:</p>
//           <div className="flex items-center gap-4 mt-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={notifySubscribed}
//                 onChange={() => setNotifySubscribed(!notifySubscribed)}
//               />
//               <span className="text-orange-500 font-semibold">All subscribed customers</span>
//             </label>

//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={notifyPurchased}
//                 onChange={() => setNotifyPurchased(!notifyPurchased)}
//               />
//               Customers who previously purchased from this site
//             </label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <Button type="submit" className="w-full text-xl bg-orange-500 text-white rounded-md p-3 mt-5">
//           {dataUpdate ? "Save" : "Add"}
//         </Button>
//       </form>
//     </Modal>
//   );
// }

// export default DiscountAdd;
