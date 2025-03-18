import React, { useState } from "react";
import Table from "../../components/ui/Table";
import { useTranslations } from "next-intl";
import { BadgeDollarSign, BadgePercent, Edit, Eye } from "lucide-react";
import CategoryAdd from "./CategoryAdd";
import Modal from "../../../components/ui/Modal";
import ModalDelete from "../../../components/ui/ModalDelete";
import axiosInstance from "../../../components/axios/axiosInstance";
import { toast } from "react-toastify";
import DiscountAdd from "./DiscountAdd"
function TableCategory({ data, locale, getData }) {
  const t = useTranslations("");

  const [openImage, setOpenImage] = useState(null);
  const [open, setOpen] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
const [selectedProductForDiscount, setSelectedProductForDiscount] = useState(null);
  const handleDelete = async () => {
    try {
      const res = await axiosInstance
        .delete(`category/${idDelete}`)
        .then(() => {
          toast.error("Deleted the category");
          getData();
          setIdDelete(null);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table
        header={["", t("tables-title.image"), t("tables-title.name"), "", ""]}
      >
        {data?.map((item, i) => (
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
              className={`py-2.5 min-w-32 text-center ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              }`}
            >
              <div className="flex items-center gap-3 justify-center">
                <Eye
                  className="text-[#F36E21] cursor-pointer"
                  onClick={() => setOpenImage(process.env.Images + item?.image)}
                />
                <p>{t("view-the-image")}</p>
              </div>
            </td>
            <td
              className={`py-2.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
              dir="ltr"
            >
              {locale == "ar" ? item?.name_Ar : item?.name_En}
            </td>
            <td
              className={`py-2.5 min-w-20 text-center ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              }`}
            >
              <div
                className="w-6 mx-auto h-6 rounded-full"
                style={{ background: item?.color }}
              ></div>
            </td>
            <td
              colSpan={2}
              className={`py-2.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
            >
              <div className="flex gap-3 justify-center items-center">
                <Edit
                  onClick={() => setOpen(item)}
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
                  src="/delete.png"
                  className="cursor-pointer"
                  width={23}
                  alt=""
                />
              </div>
            </td>
          </tr>
        ))}
      </Table>
      {discountModalOpen && (
  <DiscountAdd
    open={discountModalOpen}
    close={() => setDiscountModalOpen(false)}
    getData={getData}
    dataUpdate={selectedProductForDiscount}
  />
)}
      {idDelete && (
        <ModalDelete
          action={handleDelete}
          open={true}
          closeModal={() => setIdDelete(null)}
          text={t("delete")}
        />
      )}

      {open && (
        <CategoryAdd
          getData={getData}
          open={true}
          close={() => setOpen(null)}
          id={open}
        />
      )}

      {openImage && (
        <Modal
          className={"md:max-w-2xl"}
          open={true}
          close={() => setOpenImage(null)}
        >
          <img src={openImage} className="mx-auto object-contain" alt="" />
        </Modal>
      )}
    </div>
  );
}

export default TableCategory;
