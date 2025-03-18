

import React from "react";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Table from "./Table"
const DetailsDiscounts = ({ data, onClose }) => {
 
  const sampleData = {
    user_Name: "John Doe",
    user_PhoneNumber: "123456789",
    products: [
      {
        name: "Product 1",
        code: "P001",
        size: "180cm×240cm",
        color: "Black",
        quantity: 5
      },
      {
        name: "Product 2",
        code: "P002",
        size: "200cm×300cm",
        color: "Red",
        quantity: 3
      }
    ]
  };
  
 
  return (
    <div className="bg-gray-100  rounded-md shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-md border-b p-5 relative top-[-23px] ">
        <button onClick={onClose} className="flex items-center text-gray-600">
          <ArrowLeft size={24} className="mr-2" />
          <span className="text-lg font-semibold">Discount details</span>
        </button>
        <div className="flex items-center gap-4">
        <button className="text-gray-600  p-2 flex items-center"><img src="/dashboard/icon/print.svg" /></button>

         
        </div>
      </div>
 
      {/* Customer Information */}
      <div className="bg-white p-4 rounded-md mb-6 shadow-md">
       
        <p className="font-medium text-[#2a2a2a] flex items-center">
                  <img src="/dashboard/dot.svg" className="mr-2" /> Discount details
                </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-normal text-[#2a2a2a] opacity-70">Value subject to deduction</p>
            <p>{data?.user_Name || "N/A"}</p>
          </div>
          <div>
        <p className="font-normal text-[#2a2a2a] opacity-70">Discount Value</p>
            <p>example@mail.com</p>
          </div>
          <div>
        <p className="font-normal text-[#2a2a2a] opacity-70">Discount start date</p>
            <p>{data?.user_PhoneNumber || "N/A"}</p>
          </div>
          <div>
          <p className="font-normal text-[#2a2a2a] opacity-70">Discount end date</p>
            <p>26/4/2025</p>
          </div>
        </div>
      </div>

      <Table
  headers={["Product Name", "Quantity sold", "Price before discount", "Price after discount"]}
  rows={data?.products || []} 
/>

    </div>
  );
};

export default DetailsDiscounts;

