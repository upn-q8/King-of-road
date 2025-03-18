import React, { useState } from "react";
import Table from "../../components/ui/Table";
import { useTranslations } from "next-intl";
import { Link } from "../../../../../navigation";
import { BadgePercent, Edit, Eye, Globe, Phone, User } from "lucide-react";
import { toast } from "react-toastify";
import ModalDelete from "../../../components/ui/ModalDelete";
import axiosInstance from "../../../components/axios/axiosInstance";
import Modal from "../../../components/ui/Modal";
import Input from "../../..//components/ui/Input";
import { Button } from "@headlessui/react";
import { useRouter } from "../../../../../navigation";
import DiscountAdd from "./DiscountAdd"

function TableUsers({ data1, getData }) {
  const t = useTranslations("");
  const router = useRouter();

  const [idDelete, setIdDelete] = useState(null);
  const [idUpdate, setIdUpdate] = useState(null);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
const [selectedProductForDiscount, setSelectedProductForDiscount] = useState(null);
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`user/${idDelete}`).then(() => {
        toast.error("Deleted the user");
        getData();
        setIdDelete(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const res = await axiosInstance
        .put(`user/${idUpdate?.id}`, {
          Phone_Number: idUpdate?.phone_Number,
          User_Name: idUpdate?.user_Name,
        })
        .then(() => {
          toast.success("updated the user");
          getData();
          setIdUpdate(null);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <Table
        header={[
          "",
         "Client name",
         "Mobile number",
          "e-mail",
          "",
        ]}
      >
        {data1?.map((item, i) => (
          <tr key={i} className="text-center">
            <td
              className={`py-2.5 ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              } px-2 border-l`}
            >
              <input
                type="checkbox"
                className="block mx-auto w-fit"
                name=""
                id=""
              />
            </td>
            <td
              className={`py-2.5 min-w-32 ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              } text-nowrap`}
            >
              {item?.user_Name}
            </td>
            <td
              className={`py-2.5 min-w-32 ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              } text-nowrap`}
              dir="ltr"
            >
              {item?.email}
            </td>
            <td
              className={`py-2.5 min-w-32 ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              } text-nowrap`}
              dir="ltr"
            >
              {item?.phone_Number}
            </td>
            <td
              className={`py-2.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
            >
              <div className="flex gap-3 justify-center items-center">
                {/* <Link href={"/dashboard/users/" + item?.id}> */}
                  <Eye className="text-[#F36E21]" onClick={() => router.push(`/dashboard/users/details/${item.id}`)}/>
                {/* </Link> */}

                <Edit
                  onClick={() => setIdUpdate(item)}
                  className="text-gray-700 cursor-pointer"
                />

                <BadgePercent
               onClick={() => {
                setSelectedProductForDiscount(item);
                setDiscountModalOpen(true);
              }}
                  className="text-green-700 cursor-pointer"
                />

                <img
                  onClick={() => setIdDelete(item?.id)}
                  className="cursor-pointer"
                  src="/delete.png"
                  width={25}
                />
              </div>
            </td>
          </tr>
        ))}
     

      </Table>

      {idDelete && (
        <ModalDelete
          action={handleDelete}
          open={true}
          closeModal={() => setIdDelete(null)}
          text={t("delete")}
        />
      )}

      {idUpdate && (
        <UpdateUser
          handleSendData={handleUpdateUser}
          data1={idUpdate}
          setData={setIdUpdate}
          close={() => setIdUpdate(null)}
        />
      )}
          {discountModalOpen && (
  <DiscountAdd
    open={discountModalOpen}
    close={() => setDiscountModalOpen(false)}
    getData={getData}
    dataUpdate={selectedProductForDiscount}
  />
)}
    </>
  );
}

export default TableUsers;

const UpdateUser = ({ data1, setData, handleSendData, close }) => {
  const t = useTranslations("");

  const Inputs = [
    { title: t("tables-title.username"), name: "user_Name", icon: User },
    { title: t("tables-title.phone"), name: "phone_Number", icon: Phone },
  ];

  return (
    <Modal className={"md:max-w-2xl"} close={close} open={true}>
      <div className="my-5">
        {Inputs?.map((item, i) => (
          <Input
            name={item?.name}
            value={data1[item?.name] || ""}
            onChange={(e) => setData({ ...data1, [item?.name]: e.target.value })}
            placeholder={item?.title}
            title={item?.title}
            className={" text-black w-full"}
            classNameInput={
              "rounded-full w-1/2 bg-white p-3 border w-full ps-12  text-black border-[#DADADA]"
            }
            icon={<item.icon className=" text-mid-orange" />}
            iconClassName={`absolute   top-2.5 right-4`}
            key={i}
          />
        ))}
      </div>
      <Button
        className={"btn w-full rounded-md text-xl"}
        onClick={handleSendData}
      >
        {t("save")}
      </Button>
    </Modal>
  );
};



