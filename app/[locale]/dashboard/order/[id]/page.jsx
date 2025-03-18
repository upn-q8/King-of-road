// "use client";
// import { Mail, MoveRight, Phone, UserCircle2Icon } from "lucide-react";
// import { useTranslations } from "next-intl";
// import React, { use, useEffect, useState } from "react";
// import { Link } from "../../../../../navigation";
// import axiosInstance from "../../../components/axios/axiosInstance";

// function Page({ params }) {
//   const unwrappedParams = use(params);
//   const locale = unwrappedParams?.locale || "en";

//   const id = unwrappedParams?.id;
//   const t = useTranslations("");
//   const [data, setData] = useState({});

//   const getData = async () => {
//     try {
//       const res = await axiosInstance.get("order/" + id);
//       setData(res?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       <div className="p-4">
//         <div className="bg-white rounded-lg shadow-md border overflow-hidden flex items-center">
//           <Link
//             href={"/dashboard/orders"}
//             className="p-5 py-8 flex items-center justify-center text-white bg-[#3B745B]"
//           >
//             <MoveRight />
//           </Link>
//           <div className="flex justify-around items-center w-full flex-wrap">
//             <Card
//               icon={<UserCircle2Icon size={45} className="text-[#F36E21]" />}
//               title={t("authPage.username")}
//               description={data?.user_Name}
//             />
//             <Card
//               icon={<Mail size={45} className="text-[#F36E21]" />}
//               title={t("authPage.email")}
//               description={data?.email}
//             />
//             <Card
//               icon={<Phone size={45} className="text-[#F36E21]" />}
//               title={t("authPage.phone")}
//               description={data?.user_PhoneNumber}
//             />
//           </div>
//         </div>
//         <div className="flex items-center gap-6 mt-10 justify-between flex-wrap">
//           {data?.orderDetails?.map((item, i) => (
//             <ProductCard
//               title={item?.product_Name_Ar}
//               option={item?.name_Ar + " / " + t("quantity") + item?.quantity_Of_Unit}
//               price={
//                 item?.offer ? item?.offer + t("KWD") : item?.price + t("KWD")
//               }
//               image={process.env.Images + item?.product_Image}
//               key={i}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

// const Card = ({ icon, title, description }) => {
//   return (
//     <div className="flex items-center gap-2">
//       {icon}
//       <div>
//         <p>{title}</p>
//         <p dir="ltr" className="text-gray-400 text-xs mt-1 text-end">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// const ProductCard = ({ image, title, option, price }) => {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-3 md:p-8 md:w-[48%] flex-wrap">
//       <img className="md:max-w-40" src={image} alt="" />
//       <div>
//         <h1 className="text-xl">{title}</h1>
//         <p className="text my-4">{option}</p>
//         <p className="text text-xl">{price}</p>
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../../components/axios/axiosInstance";
import AppContext from "../../../contexts";

function OrderDetails() {
  const { id } = useParams(); // جلب الـ ID من الرابط
  const { token } = useContext(AppContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/order/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        setOrder(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold">Order Details: #{order.id}</h1>
      <p><strong>Name:</strong> {order.user_Name}</p>
      <p><strong>Phone:</strong> {order.user_PhoneNumber}</p>
      <p><strong>Total Amount:</strong> {order.total_Amount} KWD</p>
      <p><strong>Payment Method:</strong> كاش عند التسليم</p>
    </div>
  );
}

export default OrderDetails;
