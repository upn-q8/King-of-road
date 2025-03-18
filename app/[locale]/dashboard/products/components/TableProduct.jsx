
import React, { useState } from "react";
import Table from "../../components/ui/Table";
import { useTranslations } from "next-intl";
import { BadgePercent, Edit, Eye } from "lucide-react";
import ModalDelete from "../../../components/ui/ModalDelete";
import axiosInstance from "../../../components/axios/axiosInstance";
import { toast } from "react-toastify";
import ProductAdd from "./ProductAdd";
import ProductDetails from "./ProductDetails";
import { useRouter } from "../../../../../navigation";
import DiscountAdd from "./DiscountAdd"

function TableProduct({ data, locale, getData }) {
  const t = useTranslations("");
  const router = useRouter();

  const [idDelete, setIdDelete] = useState(null);
  const [idUpdate, setIdUpdate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`product/${idDelete}`).then(() => {
        toast.error("Deleted the product");
        getData();
        setIdDelete(null);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [productDetails, setProductDetails] = useState({
    name_En: "Sample Product",
    code: "SP12345",
    quantities: [{ price: "10.00" }],
    images: ["/placeholder.jpg", "/placeholder.jpg"],
    description: "This is a sample product description.",
  });
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
const [selectedProductForDiscount, setSelectedProductForDiscount] = useState(null);

  return (
    <div className="w-full">
      {selectedProduct ? (
    
        <ProductDetails
          data={selectedProduct}
          close={() => setSelectedProduct(null)}
        />
      ) : (
     
        <Table
          header={[
            "",
            t("tables-title.name"),
            t("tables-title.image"),
            "Product Code",
            t("tables-title.price"),
            "",
            "",
            "",
          ]}
        >
          {data?.map((item, i) => (
            <tr key={i} className="text-center">
              <td
                className={`py-2.5 ${i % 2 === 0 && "bg-[#D9D9D9]/50"} px-2 border-l`}
              >
                <input type="checkbox" className="block mx-auto w-fit" />
              </td>
              <td
                className={`py-2.5 min-w-32 text-center ${i % 2 === 0 && "bg-[#D9D9D9]/50"}`}
              >
                {locale === "ar" ? item?.name_Ar : item?.name_En}
              </td>
              <td
                className={`py-2.5 min-w-24 ${i % 2 === 0 && "bg-[#D9D9D9]/50"}`}
              >
                <div className="flex items-center gap-3 justify-center">
                  <Eye
                    className="text-[#F36E21] cursor-pointer"
             
                  />
                  <p>{t("choose-image")}</p>
                </div>
              </td>
              <td className={`py-2.5 min-w-20 ${i % 2 === 0 && "bg-[#D9D9D9]/50"}`}>
                {item?.quantities?.find((q) => q?.default)?.price} {t("KWD")}
              </td>
              <td colSpan={3} className={`py-2.5 ${i % 2 === 0 && "bg-[#D9D9D9]/50"}`}>
                <Edit className="mx-auto text-gray-700 cursor-pointer" size={22} />
              </td>
              <td className={`py-2.5 min-w-28 ${i % 2 === 0 && "bg-[#D9D9D9]/50"}`}>
                <div className="flex gap-3 justify-center items-center">
                  <Eye
                    className="text-[#F36E21] cursor-pointer"
                    
                  
                    onClick={() => router.push(`/dashboard/products/details/${item.id}`)}


                  />
                  <Edit
                    onClick={() => setIdUpdate(item)}
                    className="text-gray-700 min-w-5 cursor-pointer"
                  />
        <BadgePercent
  className="text-green-700 cursor-pointer"
  onClick={() => {
    setSelectedProductForDiscount(item);
    setDiscountModalOpen(true);
  }}
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
      )}

      {idDelete && (
        <ModalDelete
          action={handleDelete}
          open={true}
          closeModal={() => setIdDelete(null)}
          text={t("delete")}
        />
      )}

      {idUpdate && (
        <ProductAdd
          getData={getData}
          dataUpdate={idUpdate}
          open={true}
          close={() => setIdUpdate(null)}
          update={true}
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

     
    </div>
  );
}

export default TableProduct;
