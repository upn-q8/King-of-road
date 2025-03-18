
           


"use client";

 import React, { useState } from "react";

 import { useParams, useRouter } from "next/navigation";

 import { Eye, Edit, Trash2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
 import SearchBar from "../../components/ui/SearchBar";
 import Paginate from "../../../components/ui/Pagination";

 const appointments = [
   { id: 1, client: "Client Name", email: "user@gmail.com", phone: "+961 995 265 4235", carType: "Car type", subject: "Subject", details: "Parts to be installed or maintained", date: "12/3/2025 AT 19:30 PM", status: "Completed", notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
   { id: 2, client: "Another Client", email: "client2@mail.com", phone: "+961 985 123 4567", carType: "SUV", subject: "Maintenance", details: "Oil Change", date: "15/3/2025 AT 14:00 PM", status: "In Progress", notes: "Vehicle needs full maintenance..." },
 ];


 const getStatusClass = (status) => {
   switch (status) {
     case "In Progress":
       return "bg-yellow-200 text-yellow-900 text-xs px-3 py-1 rounded-full font-medium w-[120px] flex items-center justify-center border border-yellow-400";
     case "Canceled":
       return "bg-red-200 text-red-900 text-xs px-3 py-1 rounded-full font-medium w-[120px] flex items-center justify-center border border-red-400";
     case "Completed":
       return "bg-green-200 text-green-900 text-xs px-3 py-1 rounded-full font-medium w-[120px] flex items-center justify-center border border-green-400";
     default:
       return "bg-gray-200 text-gray-900 text-xs px-3 py-1 rounded-full font-medium w-[120px] flex items-center justify-center border border-gray-400";
   }
 };
 const headers = ["Client name", "Appointment booked", "Appointment status", "Actions"];
 const getDaysInMonth = (date) => {
   if (!date || !(date instanceof Date)) return []; 
   const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   return Array.from({ length: days }, (_, i) => i + 1);
 };





 export default function TableService({ serviceId }) {
  const { id } = useParams();
  const router = useRouter();
   const [currentPage, setCurrentPage] = useState(1);
   const rowsPerPage = 5; 
   const totalPages = Math.ceil(appointments.length / rowsPerPage);

   const indexOfLastRow = currentPage * rowsPerPage;
   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
   const currentRows = appointments.slice(indexOfFirstRow, indexOfLastRow);
   const [activeTab, setActiveTab] = useState("booked");
   const [selectedAppointment, setSelectedAppointment] = useState(null);
   const [newTime, setNewTime] = useState("");
   const [timeSlots, setTimeSlots] = useState([]);
   const [currentMonth, setCurrentMonth] = useState(new Date());
   const [selectedDay, setSelectedDay] = useState(null);
   const [bookedTimes, setBookedTimes] = useState({});
  

   const handleMonthChange = (offset) => {
     setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + offset)));
   };
   const headers = ["Client name", "Appointment booked", "Appointment status", "Actions"];

   const actions = {
     onView: (appointment) => console.log("Viewing:", appointment),
     onEdit: (appointment) => console.log("Editing:", appointment),
     onDelete: (appointment) => console.log("Deleting:", appointment),
   };
   const handleDaySelect = (day) => {
     setSelectedDay(day);
   };

   const addTimeSlot = () => {
     if (newTime && selectedDay) {
       const formattedDate = `${selectedDay}/${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`;
       setBookedTimes((prev) => ({
         ...prev,
         [formattedDate]: [...(prev[formattedDate] || []), newTime],
       }));
       setNewTime("");
     }
     else{
       if (newTime) {
               setTimeSlots([...timeSlots, newTime]);
               setNewTime("");
             }
     }
   };

   const removeTimeSlot = (date, index) => {
     setBookedTimes((prev) => ({
       ...prev,
       [date]: prev[date].filter((_, i) => i !== index),
     }));
   };

   return (
     <div className="p-6 bg-gray-100 min-h-screen w-full">
       <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
         {selectedAppointment ? (
           <button onClick={() => setSelectedAppointment(null)} className="flex items-center text-gray-700">
             <ArrowLeft size={20} className="mr-2" />
             <span className="font-semibold text-lg text-[#2a2a2a]">Appointment Details</span>
           </button>

         ) : (
           <>
               <button className="flex items-center text-[#2a2a2a] font-semibold text-lg mr-4"   onClick={() => router.push("./")}
      >
        ← 
      </button>
             <button
               onClick={() => setActiveTab("booked")}
               className={`px-4 py-2 rounded-md font-semibold ${activeTab === "booked" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
             >
               Appointments Booked
             </button>
             <button
               onClick={() => setActiveTab("management")}
               className={`px-4 py-2 rounded-md font-semibold ml-4 ${activeTab === "management" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
             >
               Appointment Management
             </button>
           </>
         )}
       </div>

       {selectedAppointment ? (
         <div className="bg-white p-6 rounded-lg shadow-md mt-4">
           <div className="grid grid-cols-3 gap-4 mt-4">
             {Object.entries(selectedAppointment).map(([key, value]) => (
               key !== "id" && (
                 <p key={key} className="text-[20px] font-normal text-[#2a2a2a]">
                   <strong className="text-[#2a2a2a] opacity-70">{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                 </p>
               )
             ))}
           </div>
         </div>
       ) : activeTab === "booked" ? (

         <div className="mt-4 w-full">
         <div className="bg-white rounded-xl shadow-md overflow-hidden">
         
           <div className="flex justify-between items-center py-4 px-6">
           <div className="flex items-center"> <img src="/dashboard/icon/appointment.png"/> <h1 className="text-xl font-bold  pl-4">Appointments booked</h1></div>
             <SearchBar className="w-[40%] border rounded-md px-3 py-1 text-sm" placeholder="Search.." />
           </div>
  
      
           <table className="w-full border-collapse">
             <thead>
               <tr className="bg-orange-500 text-white text-center">
                 <th className="font-medium text-sm py-3 text-left px-6 w-[25%]">Client name</th>
                 <th className="font-medium text-sm py-3 w-[25%]">Appointment booked</th>
                 <th className="font-medium text-sm py-3 w-[25%]">Appointment status</th>
                 <th className="font-medium text-sm py-3 w-[25%]">Actions</th>
               </tr>
             </thead>
             <tbody>
               {currentRows.map((appointment) => (
                 <tr key={appointment.id} className="border-b text-gray-700 text-center">
                   <td className="p-4 text-left px-6">{appointment.client}</td>
                   <td className="p-4">{appointment.date}</td>
                   <td className="p-4  justify-items-center">
                     <span className={getStatusClass(appointment.status)}>{appointment.status}</span>
                   </td>
                   <td className="p-4 flex justify-center space-x-3">
                     <Eye className="text-orange-500 cursor-pointer hover:scale-110 transition" />
                     <Edit className="text-black cursor-pointer hover:scale-110 transition" />
                     <Trash2 className="text-red-500 cursor-pointer hover:scale-110 transition" />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
  

           <div className="flex justify-center mt-4">
             <Paginate
               page={currentPage}
               category={null}
               disabled={false}
               length={totalPages}
               onPageChange={(newPage) => setCurrentPage(newPage)}
             />
           </div>
         </div>
       </div>
       ) : activeTab === "management" && (
               

                 <div className=" bg-gray-100 min-h-screen w-full">
     
                 <div className="mt-4 flex">
                   <div className="bg-white p-5 rounded-lg shadow-md flex-1">
                     <div className="flex justify-center items-center">
                       <ChevronLeft size={24} className="cursor-pointer" onClick={() => handleMonthChange(-1)} />
                       <h2 className="text-xl font-medium text-orange-500 px-4">
                         {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                       </h2>
                       <ChevronRight size={30} className="cursor-pointer" onClick={() => handleMonthChange(1)} />
                     </div>
                     <div className="grid grid-cols-7 text-center mt-4">
                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                         <div key={day} className="font-semibold">{day}</div>
                       ))}
                       {getDaysInMonth(currentMonth).map((day) => (
                         <div
                           key={day}
                           className={`py-2 cursor-pointer rounded-md ${selectedDay === day ? "bg-orange-500 text-white" : "hover:bg-orange-100"}`}
                           onClick={() => handleDaySelect(day)}
                         >
                           {day}
                         </div>
                       ))}
                     </div>
                   </div>
          
                 
                   <div className="bg-[#2a2a2a] p-5 rounded-lg shadow-md text-white w-1/3 ml-4">
                     <h2 className="text-lg font-semibold">Select Time</h2>
                     <input
                       type="time"
                       className="w-full p-2 rounded-md text-black mt-2"
                       value={newTime}
                       onChange={(e) => setNewTime(e.target.value)}
                     />
                     <button onClick={addTimeSlot} className="bg-orange-500 w-full p-2 rounded-md mt-2" >
                       Add
                     </button>

                     <h3 className="mt-4">Added Times</h3>
                       {timeSlots.map((time, index) => (
                         <div key={index} className="flex justify-between items-center text-gray-300 mt-2">
                           <span>🟠 {time}</span>
                           <Trash2 size={16} className="cursor-pointer text-red-500" onClick={() => removeTimeSlot(index)} />
                         </div>
                       ))}
                    
                   </div>



                 </div>
          
          
                 <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                   <h2 className="text-lg font-semibold text-gray-700">Booked Times</h2>
                   <div className="mt-2 flex flex-wrap justify-start px-4">
                     {Object.entries(bookedTimes).map(([date, times]) => (
                       <div key={date} className="mb-2 ml-4">
                         <h3 className="font-semibold text-orange-500">{date}</h3>
                         <div className="grid gap-4 mt-1">
                           {times.map((time, index) => (
                             <span key={index} className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                               🟠 {time}
                               <Trash2 size={16} className="ml-2 cursor-pointer text-red-500" onClick={() => removeTimeSlot(date, index)} />
                             </span>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            

                   )}




     </div>
   );
 }
 

