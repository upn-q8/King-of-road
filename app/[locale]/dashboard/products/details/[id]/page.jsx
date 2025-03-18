

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Edit, Trash2,Eye,BadgePercent } from "lucide-react";
import axiosInstance from "../../../../components/axios/axiosInstance";
import TableProduct from "../../components/TableProduct";
import Table from "../../components/Table";


function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("main");
  const [productDetails, setProductDetails] = useState(null);
  const [rows, setRows] = useState([]);
  const fakeReviews = [
    { customer: "John Doe", comment:  <Eye
      className="text-[#F36E21] cursor-pointer"

    />, rating: 5 },
    { customer: "Jane Smith", comment:  <Eye
      className="text-[#F36E21] cursor-pointer"

    />, rating: 4 },
    { customer: "Michael Brown", comment:  <Eye
      className="text-[#F36E21] cursor-pointer"

    />, rating: 2 },
  ];
  const fakeRequests = [
    { applicant: "Alice Johnson", orderDate: "2024-03-10", status: "Pending" },
    { applicant: "Bob Williams", orderDate: "2024-03-09", status: "Completed" },
    { applicant: "Charlie Davis", orderDate: "2024-03-08", status: "Cancelled" },
  ];
  

  useEffect(() => {
    if (!id) return;
  
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/dashboard/products/${id}`);
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
           ← Product Details
         </button>
         <div className="flex gap-4">
           <Edit className="text-[#7F7F7F] text-lg font-normal cursor-pointer hover:text-gray-800" />
           <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
         </div>
       </div>

       {/* Tabs */}
       <div className="flex border-b bg-white rounded-md p-5 justify-around mx-4 mt-4 ">
         {[
           { id: "main", label: "Main Information" },
           { id: "size_color", label: "Size and color" },
           { id: "reviews", label: "Customer reviews" },
           { id: "requests", label: "Requests" },
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`py-2 px-5 text-sm font-semibold transition ${
               activeTab === tab.id
                 ? "text-white bg-[#F36E21] rounded-md"
                 : "text-[#7F7F7F] text-lg font-normal hover:text-gray-800"
             }`}
           >
             {tab.label}
           </button>
         ))}
       </div>

       {/* Main Content */}
       <div className="p-6 bg-white rounded-md mx-4  md:max-h-[650px] max-h-[450px] overflow-y-auto">
         {activeTab === "main" && (
           <>
             <div className="grid grid-cols-3 gap-6">
               <div>
                 <p className="font-medium text-[#2a2a2a] flex items-center">
                   <img src="/dashboard/dot.svg" className="mr-2" /> Product Name
                 </p>
                 <p className="text-[#7F7F7F] text-lg font-normal"> {productDetails?.name_En || "Sample Product"}</p>
               </div>
               <div>
                 <p className="font-medium text-[#2a2a2a] flex items-center">
                   <img src="/dashboard/dot.svg" className="mr-2" /> Product Code
                 </p>
                 <p className="text-[#7F7F7F] text-lg font-normal">{productDetails?.code || "SP12345"}</p>
               </div>
               <div>
                 <p className="font-medium text-[#2a2a2a] flex items-center">
                   <img src="/dashboard/dot.svg" className="mr-2" /> Price
                 </p>
                 <p className="text-[#7F7F7F] text-lg font-normal"> {productDetails?.quantities?.[0]?.price || "10.00"} KWD</p>
               </div>
             </div>

             <div className="mt-6">
               <p className="font-medium text-[#2a2a2a] flex items-center">
                 <img src="/dashboard/dot.svg" className="mr-2" /> Product Image
               </p>
               <div className="grid grid-cols-3 gap-2 mt-2">
               
                 {(productDetails?.images || ["/home/car1.png","/home/car1.png","/home/car1.png"]).map(
    (img, i) => (
      <img key={i} src={img} className="w-44 h-44 object-cover rounded-lg shadow-md border" alt="Product" />
    )
  )}
               </div>
             </div>

             <div className="mt-6">
               <p className="font-medium text-[#2a2a2a] flex items-center">
                 <img src="/dashboard/dot.svg" className="mr-2" /> Description
               </p>
               <p className="text-[#7F7F7F] text-lg font-normal leading-relaxed">  {productDetails?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
             </div>

             <div className="mt-6">
               <p className="font-medium text-[#2a2a2a] flex items-center">
                 <img src="/dashboard/dot.svg" className="mr-2" /> Product Features
               </p>
               <p className="text-[#7F7F7F] text-lg font-normal leading-relaxed"> 
                
                 {productDetails?.features || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
             </div>
           </>
         )}

         {activeTab === "size_color" && (
           <TableProduct
             headers={["Colors", "Size", "Weight", "Available Quantity", "Actions"]}
             rows={rows.map((row, index) => ({
               ...row,
               colors: (
                 <div className="flex gap-2">
                   {row.colors.map((color, i) => (
                     <div key={i} className="flex items-center gap-1">
                       <div className="w-6 h-6 border" style={{ backgroundColor: color }}></div>
                     </div>
                   ))}
                 </div>
               ),
               actions: (
                 <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteRow(index)}>
                   Delete
                 </button>
               ),
             }))}
           />
         )}
         {/*  */}

         {activeTab === "reviews" && (
  <Table
    headers={["Customer Name", "Comment", "Evaluation"]}
    rows={fakeReviews.map((review, index)  => ({
      customer: review.customer,
      comment: review.comment,
      evaluation: (
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>
      ),
    }))}
  />
)}


         {/*  */}
         {activeTab === "requests" && (
  <Table
    headers={["Applicant’s Name", "Order Date", "Order Status", "Actions"]}
    rows={fakeRequests.map((request, index) => ({
      applicant: request.applicant,
      orderDate: request.orderDate,
      status: (
        <span
          className={`px-3 py-1 rounded-full font-medium justify-items-center ${
            request.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : request.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {request.status}
        </span>
      ),
      actions: (
        <div className="flex gap-3 justify-center items-center">
                <Eye
                  className="text-[#F36E21] cursor-pointer"
                  
                
             


                />
                <Edit
                 
                  className="text-gray-700 min-w-5 cursor-pointer"
                />
                <BadgePercent className="text-green-700 cursor-pointer" />
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
)}

       </div>
     </div>
  );
}

export default ProductDetails;
