

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Edit, Trash2,Eye,BadgePercent } from "lucide-react";
import axiosInstance from "../../../../components/axios/axiosInstance";
import TableOrder from "../../components/TableOrder";
import Table from "../../components/Table";
import { Search, SlidersHorizontal } from "lucide-react";
import SearchBar from "../../../components/ui/SearchBar";


function OrderDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("main");
  const [orderDetails, setOrderDetails] = useState(null);
  const [rows, setRows] = useState([]);
  
  const fakeReviews = [
    { name: "Product Name", code:"30A-AD452", size: "150cm*240cm",color:"Black",quantity:"Quantity" },
    
  ];
  const data1 = [
    { user_Name: "Client name", phone_Number: "+965 856 235 96", email: "user@example.com" }
  ];
  

  useEffect(() => {
    if (!id) return;
  
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/dashboard/users/${id}`);
        console.log("Fetched Product Data:", res.data);
        setOrderDetails(res.data);
  
       
        if (res.data?.sizes && res.data?.colors) {
          const formattedRows = res.data.sizes.map((size, index) => ({
            size,
            weight: res.data.weights?.[index] || "N/A",
            availableQuantity: res.data.availableQuantities?.[index] || 0,
            colors: res.data.colors[index] || [],
          }));
          setRows(formattedRows);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    fetchProduct();
  }, [id]);
  


  return (
    <div className="w-full bg-[#F5F5F5] ">
    {/* Header */}
    <div className="flex justify-between items-center border-b p-5 bg-white shadow-md mt-4 ">
      <button className="flex items-center text-[#2a2a2a] font-semibold text-lg"   onClick={() => router.push("../")}
      >
        ← Order Details
      </button>
      <div className="flex gap-4 items-center">
        <img src="/dashboard/icon/print.svg" className="w-10 h-10" />
        <Edit className="text-[#7F7F7F] text-lg font-normal cursor-pointer hover:text-gray-800" />
        <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
        <div className="flex items-center">
          <img src="/dashboard/icon/more.svg"/>
          <p className="font-medium text-lg text-[#2a2a2a] ml-2">Change status</p>
        </div>
      </div>
    </div>

    {/* Customer Information */}
    <div className="bg-white p-5 rounded-md m-5 shadow-md">
       
       <p className="font-medium text-[#2a2a2a] flex items-center">
                 <img src="/dashboard/dot.svg" className="mr-2 text-[#2a2a2a]" /> Customer Information
               </p>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
         <div>
           <p className="font-normal text-[#2a2a2a] opacity-70">Full Name</p>
           <p className="text-[#2a2a2a]">{data1?.user_Name || "N/A"}</p>
         </div>
         <div>
       <p className="font-normal text-[#2a2a2a] opacity-70">E-Mail</p>
       <p className="text-[#2a2a2a]">example@mail.com</p>
         </div>
         <div>
       <p className="font-normal text-[#2a2a2a] opacity-70">Phone Number</p>
       <p className="text-[#2a2a2a]">{data1?.user_PhoneNumber || "N/A"}</p>
         </div>
         <div>
         <p className="font-normal text-[#2a2a2a] opacity-70">Address</p>
         <p className="text-[#2a2a2a]">123 Main Street, City</p>
         </div>
       </div>
     </div>

       {/* Main Content */}
       <div className=" bg-white rounded-md mx-4  md:max-h-[650px] max-h-[450px] overflow-y-auto mb-4">
       
    

  <Table
    headers={["","Product Name", "Product Code", "Required size","Required color","Quantity Required"]}
    rows={fakeReviews.map((details, index)  => ({
      name: details.name,
      code: details.code,
      size:details.size,
      color:details.color,
      quantity:details.quantity
   
    }))}
  />
  </div>


    
       </div>
  
  );
}

export default OrderDetails;
