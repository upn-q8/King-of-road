"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import TableUsers from "./components/TableUsers";
import Paginate from "../components/ui/Pagination";
import { Button } from "@headlessui/react";
import axiosInstance from "../../components/axios/axiosInstance";
import { saveAs } from "file-saver";
import SearchBar from "../components/ui/SearchBar";
function Users() {
  const t = useTranslations("");

  const [data, setData] = useState([]);
  const [startSerach, setStartSerach] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [lastPage, setLastPage] = useState("");

  const getData = async () => {
    try {
      const query = search ? `&query=${search}` : "";

      const res = await axiosInstance.get("user/users?page=" + page + query);
      setData(res?.data?.items);
      setLastPage(res?.data?.lastPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExcelExport = async () => {
    try {
      const res = await axiosInstance.get("dashboard/users/excel-export", {
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "users.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page, startSerach]);
  const data1 = [
    { user_Name: "Client name", phone_Number: "+965 856 235 96", email: "user@example.com" }
  ];
  
  <TableUsers getData={getData} data1={data1} />
  
  return (
    <div>
      <div className="p-5">
        <div className=" bg-white rounded-xl shadow-md overflow-auto">
        
               
       <div className="p-6 flex gap-6 justify-between items-center pb-8">
       <div className="flex items-center gap-1" >

            <img src="/dashboard/icon/customer.png" alt="" />
            <h1 className="text-xl">Client</h1>
</div>
           <SearchBar
              
              options={["s"]}
              classNameInput=""
            />

            
          </div>
          <TableUsers getData={getData} data1={data1} />
          <div className="text-center my-5">
            <Paginate length={lastPage + 1} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;

const Card = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#D9D9D9]/40 cursor-pointer border p-2 px-4 rounded-full min-w-40"
    >
      {children}
    </div>
  );
};
