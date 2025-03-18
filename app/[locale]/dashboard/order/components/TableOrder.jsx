import React, { useContext, useState } from "react";
import Table from "./Table";
import { useTranslations } from "next-intl";
import { Edit, Eye } from "lucide-react";
import axiosInstance from "../../../components/axios/axiosInstance";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import AppContext from "../../../contexts";
import { toast } from "react-toastify";
import DetailsOrder from "./DetailsOrder";
import SearchBar from "../../components/ui/SearchBar";
import { useRouter } from "../../../../../navigation";

function TableOrder({ data, getData, locale }) {
 
   const router = useRouter();
  const [openDetails, setOpenDetails] = useState(null);
  const t = useTranslations("");
  const { token } = useContext(AppContext);
  const fakeReviews = [
    { id: "Order id", name:"Samer Salem", cost: "350$",status:"Pending" },
    
  ];
  const handleChangeStatus = async ({ id, status }) => {
    try {
      await axiosInstance.put(
        `order/${id}`,
        { Status: status },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      getData();
      toast.success("The change has been successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     
      <div className=" bg-white rounded-md mx-4  md:max-h-[650px] max-h-[450px] overflow-y-auto mb-4">
       
       <div className="p-6 flex gap-6 justify-between items-center pb-8">
       <div className="flex items-center gap-1" >

            <img src="/dashboard/icon/checklistb.png" alt="" />
            <h1 className="text-xl">Orders</h1>
</div>
           <SearchBar
              
              options={["s"]}
              classNameInput=""
            />

            
          </div>

  <Table
    headers={["","Order id", "Client name", "Order cost","Order Status",""]}
    rows={fakeReviews.map((review, index)  => ({
      id: review.id,
      name: review.name,
      cost:review.cost,
      status: (
        <span
          className={`px-3 py-1 rounded-full font-medium justify-items-center ${
            review.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : request.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {review.status}
        </span>
      ),
      actions: (
        <div className="flex gap-3 justify-center items-center">
        <Eye
          className="text-[#F36E21] cursor-pointer"
          
        
          onClick={() => router.push(`/dashboard/order/details/${review.id}`)}


        />
        <Edit
          onClick={() => setIdUpdate(item)}
          className="text-gray-700 min-w-5 cursor-pointer"
        />
     
        <img
          onClick={() => setIdDelete(item?.id)}
          src="/delete.png"
          className="cursor-pointer"
          width={23}
          alt=""
        />
      </div>
      ),
    }))}
  />
  </div>
    </>
  );
}

export default TableOrder;
