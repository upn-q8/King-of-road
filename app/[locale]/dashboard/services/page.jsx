
// "use client";
// import React, { useState } from "react";
// import TableService from "./components/TableService"; 
// import { useRouter } from "../../../../navigation";

// const services = [
//   { id: 1, title: "Installation Service", icon: "/dashboard/icon/working.svg", path: "/services/installation" },
//   { id: 2, title: "Maintenance Service", icon: "/dashboard/icon/suspension.svg", path: "/services/maintenance" },
// ];

// export default function ServicesPage() {
//   const [selectedService, setSelectedService] = useState(null); 
//   const router = useRouter();
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       {selectedService ? ( 
//         <TableService service={selectedService} onBack={() => setSelectedService(null)} />
//       ) : (
//         services.map((service) => (
//           <div
//             key={service.id}
//             onClick={() => router.push(service.path)} 
//             className="flex items-center justify-center w-full  px-36 py-12 mb-4 border border-orange-500 rounded-lg shadow-md bg-white hover:bg-orange-50 transition cursor-pointer container"
//           >
//             <img src={service.icon} alt={service.title} className="w-20 h-20 mr-4" />
//             <p className="text-lg font-semibold text-orange-600">{service.title}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
"use client";
import React from "react";
import { useRouter } from "../../../../navigation"; // ✅ استيراد صحيح

const services = [
  { id: "installation", title: "Installation Service", icon: "/dashboard/icon/working.svg" },
  { id: "maintenance", title: "Maintenance Service", icon: "/dashboard/icon/suspension.svg" },
];

export default function ServicesPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {services.map((service) => (
        <div
          key={service.id}
          onClick={() => router.push(`/dashboard/services/${service.id}`)} // ✅ التأكد من أن التوجيه صحيح
          className="flex items-center justify-center w-full px-36 py-12 mb-4 border border-orange-500 rounded-lg shadow-md bg-white hover:bg-orange-50 transition cursor-pointer container"
        >
          <img src={service.icon} alt={service.title} className="w-20 h-20 mr-4" />
          <p className="text-lg font-semibold text-orange-600">{service.title}</p>
        </div>
      ))}
    </div>
  );
}

