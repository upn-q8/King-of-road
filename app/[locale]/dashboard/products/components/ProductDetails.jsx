// import React, { useState, useEffect } from "react";
// import { Edit, Trash2 } from "lucide-react";
// import TableProduct from "./Table";
// import axiosInstance from "../../../components/axios/axiosInstance";

// function ProductDetails({ data, open, close }) {
//   const [activeTab, setActiveTab] = useState("main");
//   const [rows, setRows] = useState(data?.sizes || []);
//   const [productDetails, setProductDetails] = useState(data);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axiosInstance.get(`/api/products/${data?.id}`);
//         setProductDetails(res.data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };

//     if (data?.id) {
//       fetchProduct();
//     }
//   }, [data?.id]);

//   const handleDeleteRow = (index) => {
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   return (
//     <div className="w-full bg-white">
//       {/* Header */}
//       <div className="flex justify-between items-center border-b pb-4">
//         <button className="flex items-center text-[#2a2a2a] font-semibold text-lg" onClick={close}>
//           ← Back to Products
//         </button>
//         <div className="flex gap-4">
//           <Edit className="text-[#7F7F7F] text-lg font-normal cursor-pointer hover:text-gray-800" />
//           <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b bg-white rounded-md p-5 justify-around">
//         {[
//           { id: "main", label: "Main Information" },
//           { id: "size_color", label: "Size and color" },
//           { id: "reviews", label: "Customer reviews" },
//           { id: "requests", label: "Requests" },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`py-2 px-5 text-sm font-semibold transition ${
//               activeTab === tab.id
//                 ? "text-white bg-[#F36E21] rounded-md"
//                 : "text-[#7F7F7F] text-lg font-normal hover:text-gray-800"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="p-6 bg-white rounded-b-lg">
//         {activeTab === "main" && (
//           <>
//             <div className="grid grid-cols-3 gap-6">
//               <div>
//                 <p className="font-medium text-[#2a2a2a] flex items-center">
//                   <img src="/dashboard/dot.svg" className="mr-2" /> Product Name
//                 </p>
//                 <p className="text-[#7F7F7F] text-lg font-normal">{productDetails?.name_En}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-[#2a2a2a] flex items-center">
//                   <img src="/dashboard/dot.svg" className="mr-2" /> Product Code
//                 </p>
//                 <p className="text-[#7F7F7F] text-lg font-normal">{productDetails?.code}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-[#2a2a2a] flex items-center">
//                   <img src="/dashboard/dot.svg" className="mr-2" /> Price
//                 </p>
//                 <p className="text-[#7F7F7F] text-lg font-normal">{productDetails?.quantities?.[0]?.price} KWD</p>
//               </div>
//             </div>

//             <div className="mt-6">
//               <p className="font-medium text-[#2a2a2a] flex items-center">
//                 <img src="/dashboard/dot.svg" className="mr-2" /> Product Image
//               </p>
//               <div className="grid grid-cols-3 gap-2 mt-2">
//                 {productDetails?.images?.map((img, i) => (
//                   <img key={i} src={img} className="w-44 h-44 object-cover rounded-lg shadow-md border" alt="Product" />
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6">
//               <p className="font-medium text-[#2a2a2a] flex items-center">
//                 <img src="/dashboard/dot.svg" className="mr-2" /> Description
//               </p>
//               <p className="text-[#7F7F7F] text-lg font-normal leading-relaxed">{productDetails?.description}</p>
//             </div>
//           </>
//         )}

//         {activeTab === "size_color" && (
//           <TableProduct
//             headers={["Colors", "Size", "Weight", "Available Quantity", "Actions"]}
//             rows={rows.map((row, index) => ({
//               ...row,
//               colors: (
//                 <div className="flex gap-2">
//                   {row.colors.map((color, i) => (
//                     <div key={i} className="flex items-center gap-1">
//                       <div className="w-6 h-6 border" style={{ backgroundColor: color }}></div>
//                     </div>
//                   ))}
//                 </div>
//               ),
//               actions: (
//                 <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteRow(index)}>
//                   Delete
//                 </button>
//               ),
//             }))}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Edit, Trash2 } from "lucide-react";
import TableProduct from "./Table";
import axiosInstance from "../../../components/axios/axiosInstance";

function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("main");
  const [productDetails, setProductDetails] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/api/products/${id}`);
        setProductDetails(res.data);
        setRows(res.data.sizes || []);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  if (!productDetails) return <p>Loading...</p>;

  return (
    <div className="w-full bg-white">
      <div className="flex justify-between items-center border-b pb-4">
        <button className="flex items-center text-[#2a2a2a] font-semibold text-lg" onClick={() => router.push("/products")}>← Back to Products</button>
        <div className="flex gap-4">
          <Edit className="text-[#7F7F7F] text-lg font-normal cursor-pointer hover:text-gray-800" />
          <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
        </div>
      </div>

      <div className="p-6 bg-white rounded-b-lg">
        {activeTab === "main" && (
          <div>
            <p className="text-lg font-semibold">{productDetails.name_En}</p>
            <p className="text-gray-600">Code: {productDetails.code}</p>
            <p className="text-gray-600">Price: {productDetails.quantities?.[0]?.price} KWD</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {productDetails.images?.map((img, i) => (
                <img key={i} src={img} className="w-44 h-44 object-cover rounded-lg shadow-md border" alt="Product" />
              ))}
            </div>
            <p className="text-gray-600 mt-4">{productDetails.description}</p>
          </div>
        )}

        {activeTab === "size_color" && (
          <TableProduct
            headers={["Colors", "Size", "Weight", "Available Quantity", "Actions"]}
            rows={rows.map((row, index) => ({
              ...row,
              colors: row.colors.map((color, i) => (
                <div key={i} className="w-6 h-6 border" style={{ backgroundColor: color }}></div>
              )),
              actions: (
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteRow(index)}>
                  Delete
                </button>
              ),
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
