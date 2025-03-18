"use client";
import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import Info from "./components/Info";
import Archive1 from "./components/Archive";
import Appointments from "./components/Appointments";
import Chat from "./components/Chat";
import Notifications from "./components/Notifications";
import OrdersTable from "./components/OrdersTable";
import { useTranslations } from "next-intl";
import { Archive, Bell, Box, CalendarFold, Mail, User } from "lucide-react";

function Page() {
  const [active, setActive] = useState(0); 
  const t = useTranslations("");

  const Tabs = [
    { title: t("personal-info"), icon: User, component: <Info /> },
    { title: t("order-archive"), icon: Box, component: <Archive1 /> },
    { title: "My Appointments", icon: CalendarFold, component: <Appointments /> },
    { title: "Chat Archive", icon: Mail, component: <Chat /> },
    { title: "Notification Archive", icon: Bell, component: <Notifications /> },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      <Tab.Group className="flex flex-col md:flex-row w-full max-w-[1850px] mx-auto">
  <h1 className="text-xl p-4 font-medium block sm:hidden ">My Account Info</h1>
        
<Tab.List className="bg-white w-full md:w-1/3 max-w-none md:max-w-96 pt-5 shadow-none md:shadow-md">
  <h1 className="text-xl p-4 font-medium hidden sm:block">My Account Info</h1>
  {Tabs.map((item, i) => (
    <button
      onClick={() => setActive(i)}
      className={`flex items-center gap-3 p-4 w-full transition-all rounded-md border-b ${
        active === i ? "bg-orange-500 text-white border-orange-500" : "text-gray-700 hover:bg-gray-100 border-gray-300"
      }`}
      key={i}
    >
      <div className="p-2 rounded-full border border-orange-400 bg-white">
        <item.icon stroke={active === i ? "#FE5F0D" : "#FE5F0D"} />
      </div>
      {item.title}
    </button>
  ))}
</Tab.List>

       
        <div className={`w-full p-5 rounded-lg mt-5 md:mt-0 ${active === null ? "hidden md:block" : ""}`}>
          {active !== null && Tabs[active].component}
        </div>
      </Tab.Group>
    </div>
  );
}

export default Page;
