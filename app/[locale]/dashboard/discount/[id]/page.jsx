

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Edit, Trash2,Eye,BadgePercent } from "lucide-react";
import axiosInstance from "../../../../components/axios/axiosInstance";
import TableUser from "../../components/TableUsers";
import Table from "../../components/Table";
import { Search, SlidersHorizontal } from "lucide-react";
import SearchBar from "../../../components/ui/SearchBar";


function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("main");
  const [productDetails, setProductDetails] = useState(null);
  const [rows, setRows] = useState([]);
  const data1 = [
    { user_Name: "Client name", phone_Number: "+965 856 235 96", email: "user@example.com" }
  ];
  const fakeReviews = [
    { id: "Order id", name:"Samer Salem", cost: "350$",status:"Pending" },
    
  ];
  const fakeRequests = [
    { value: "Discount value", orderDate: "2024-03-10", endDate: "2024-03-10" },
   
  ];
  

  useEffect(() => {
    if (!id) return;
  
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/dashboard/users/${id}`);
        console.log("Fetched Product Data:", res.data);
        setProductDetails(res.data);
  
       
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
        ← Customer Name
      </button>
      <div className="flex gap-4">
        <img src="/dashboard/icon/print.svg"/>
        {/* <Edit className="text-[#7F7F7F] text-lg font-normal cursor-pointer hover:text-gray-800" />
        <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" /> */}
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
                />
           
               
              </div>
      ),
    }))}
  />
  </div>


        <div className=" bg-white rounded-md mx-4  md:max-h-[650px] max-h-[450px] overflow-y-auto">

        <div className="p-6 flex gap-6 justify-between items-center pb-8">
       <div className="flex items-center gap-1" >

            <img src="/dashboard/icon/tag.png" alt="" />
            <h1 className="text-xl">Discount</h1>
</div>
           <SearchBar
              
              options={["s"]}
              classNameInput=""
            />

            
          </div>
  <Table
    headers={["","Applicant’s Name", "Order Date", "Order Status", ""]}
    rows={fakeRequests.map((request, index) => ({
        value: request.value,
      orderDate: request.orderDate,
      endDate: request.endDate,
      actions: (
        <div className="flex gap-3 justify-center items-center">
              
                <Edit
                 
                  className="text-gray-700 min-w-5 cursor-pointer"
                />
           
                <img
                 
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
       </div>
  
  );
}

export default ProductDetails;
