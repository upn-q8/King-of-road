"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { use, useEffect, useState } from "react";
import TableCategory from "./components/TableCategory";
import Paginate from "../components/ui/Pagination";
import CategoryAdd from "./components/CategoryAdd";
import { Button } from "@headlessui/react";
import axiosInstance from "../../components/axios/axiosInstance";
import SearchBar from "../components/ui/SearchBar";

function Categories({ params }) {
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || "en";

  const t = useTranslations("");

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [startSerach, setStartSerach] = useState("");

  // const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const query = search ? `&query=${search}` : "";
      const res = await axiosInstance.get("categories?page=" + page + query);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getData();
  }, [page, startSerach]);
  const [data, setData] = useState([
    {
      id: 1,
      name_Ar: "إلكترونيات",
      name_En: "Electronics",
      image: "/images/electronics.jpg",
      color: "#3498db",
    },
    {
      id: 2,
      name_Ar: "ملابس",
      name_En: "Clothing",
      image: "/images/clothing.jpg",
      color: "#e74c3c",
    },
    {
      id: 3,
      name_Ar: "أثاث",
      name_En: "Furniture",
      image: "/images/furniture.jpg",
      color: "#2ecc71",
    },
    {
      id: 4,
      name_Ar: "ألعاب",
      name_En: "Toys",
      image: "/images/toys.jpg",
      color: "#f39c12",
    },
  ]);
  
  return (
    <div>
      <div className="p-5">
        <div className=" bg-white rounded-xl shadow-md overflow-auto">
          <div className="p-6 flex gap-6 items-center pb-8 justify-between">
            <div className="flex items-center gap-3">
              <img src="/dashboard/icon/features.png" alt="" />
              <h1 className="text-xl font-semibold">{t("dashboard.categories")}</h1>
            </div>
            <SearchBar
              setSearch={setSearch}
              startSerach={startSerach}
              setStartSerach={setStartSerach}
            />

            <Button
              onClick={() => setOpen(true)}
              className={"btn w-36 rounded-md p-2"}
            >
              {t("add")}
            </Button>
          </div>
          <TableCategory getData={getData} locale={locale} data={data} />
          {/* <div className="text-center my-5">
            <Paginate length={4} page={1} />
          </div> */}
        </div>
      </div>

      {open && (
        <CategoryAdd
          getData={getData}
          open={open}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default Categories;
