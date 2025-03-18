import React, { useState } from "react";
import Table from "../../components/ui/Table";
import { useTranslations } from "next-intl";
import { Edit,Eye } from "lucide-react";
import DiscountAdd from "./DiscountAdd";
import ModalDelete from "../../../components/ui/ModalDelete";
import axiosInstance from "../../../components/axios/axiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "../../../../../navigation";

function TableDiscount({ data, locale, getData }) {
  const t = useTranslations("");
  const [openDetails, setOpenDetails] = useState(null);
  const router = useRouter();

  const [dataUpdate, setDataUpdate] = useState(null);
  const [idDelete, setIdDelete] = useState(null);

  const handleDelete = async () => {
    try {
      const res = await axiosInstance
        .delete(`discount/${idDelete}`)
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
        header={[
          "",
         "Value subject to deduction",
         "Discount Value",
       "Discount start date",
         "Discount end date",
        
      
          "",
        ]}
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
                <p>{item?.Value1}</p>
              </div>
            </td>
            <td
              className={`py-2.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
              dir="ltr"
            >
              <p>{item?.Value2}%</p>
            </td>
            <td
              className={`py-2.5 min-w-20 text-center ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              }`}
            >
              <p>{item?.Value3?.substr(0, 10)}</p>
            </td>
            <td
              className={`py-2.5 min-w-20 text-center ${
                i % 2 == 0 && "bg-[#D9D9D9]/50"
              }`}
            >
              <p>{item?.Value4?.substr(0, 10)}</p>
            </td>
          
            <td
              colSpan={2}
              className={`py-2.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
            >
              <div className="flex gap-3 justify-center items-center">
                <Edit
                  // onClick={() => setDataUpdate(item)}
                  onClick={() => setOpenDetails(item)} 
                  className="text-gray-700 cursor-pointer"
                />
                                  <Eye className="text-[#F36E21]" onClick={() => router.push(`/dashboard/discount/details/${item.id}`)}/>
                
                {/* <img
                  onClick={() => setIdDelete(item?.id)}
                  src="/delete.png"
                  className="cursor-pointer"
                  width={23}
                  alt=""
                /> */}
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

      {dataUpdate && (
        <DiscountAdd
          getData={getData}
          open={true}
          close={() => setDataUpdate(null)}
          dataUpdate={dataUpdate}
        />
      )}
    </div>
  );
}

export default TableDiscount;


