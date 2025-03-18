"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { use, useContext, useEffect, useState } from "react";
import TableOrder from "./components/TableOrder";
import Paginate from "../components/ui/Pagination";
import axiosInstance from "../../components/axios/axiosInstance";
import { saveAs } from "file-saver";
import AppContext from "../../contexts";
import SearchBar from "../components/ui/SearchBar";

function Orders({ params }) {
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || "en";

  const t = useTranslations("");

  const { token } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState("");
  const [search, setSearch] = useState("");
  const [startSerach, setStartSerach] = useState("");
  const [category, setCategory] = useState(null);

  const getData = async () => {
    try {
      const query = search ? `&query=${search}` : "";
      const categoryid = category ? `&status=${category}` : "";
      const res = await axiosInstance.get(
        "orders?page=" + page + query + categoryid,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setData(res?.data?.items);
      setLastPage(res?.data?.lastPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExcelExport = async () => {
    try {
      const res = await axiosInstance.get("dashboard/orders/excel-export", {
        headers: { Authorization: "Bearer " + token },
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "orders.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page, startSerach, category]);
  const dummyData = [
  
    {

   
      name_En: "Test Product 2",
      cost: "P002",
      status_En: "process",
    }
  ];
  return (
    <div className="p-5">
    
    
       
          <TableOrder getData={getData} locale={locale} data={dummyData} />
          <div className="text-center my-5">
            {/* <Paginate setPage={setPage} length={lastPage + 1} page={page} /> */}
          </div>
        
    
    </div>
  );
}

export default Orders;

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
