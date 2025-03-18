"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { use, useEffect, useState } from "react";
import TableProduct from "./components/TableProduct";
import Paginate from "../components/ui/Pagination";
import ProductAdd from "./components/ProductAdd";
import { Button } from "@headlessui/react";
import axiosInstance from "../../components/axios/axiosInstance";
import { saveAs } from "file-saver";
import SearchBar from "../components/ui/SearchBar";

function Products({ params }) {
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || "en";

  const t = useTranslations("");

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [startSerach, setStartSerach] = useState("");

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState("");

  const getData = async () => {
    try {
      const query = search ? `&query=${search}` : "";
      const categoryid = category ? `&categoryid=${category}` : "";
      const res = await axiosInstance.get(
        "products?page=" + page + query + categoryid
      );
      setData(res?.data?.items);
      setLastPage(res?.data?.lastPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCategories = async () => {
    try {
      const res = await axiosInstance.get("categories");
      setCategories(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExcelExport = async () => {
    try {
      const res = await axiosInstance.get("dashboard/products/excel-export", {
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "products.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page, startSerach, category]);

  useEffect(() => {
    handleGetCategories();
  }, []);
  const dummyData = [
    {
      id: 1,
      name_Ar: "منتج تجريبي 1",
      name_En: "Test Product 1",
      code: "P001",
      slug_En: "test-product-1",
      cover_Image: "/test-image-1.jpg",
      description: "وصف المنتج التجريبي 1",
      quantities: [{ price: 20, default: true }],
      images: ["/test-image-1.jpg", "/test-image-2.jpg", "/test-image-3.jpg"]
    },
    {
      id: 2,
      name_Ar: "منتج تجريبي 2",
      name_En: "Test Product 2",
      code: "P002",
      slug_En: "test-product-2",
      cover_Image: "/test-image-2.jpg",
      description: "وصف المنتج التجريبي 2",
      quantities: [{ price: 35, default: true }],
      images: ["/test-image-4.jpg", "/test-image-5.jpg", "/test-image-6.jpg"]
    }
  ];
  
  return (
    <div>
      <div className="p-5">
        <div className="p-3 bg-white rounded-xl shadow-md overflow-auto">
          <div className="flex justify-between items-center pb-8">
            <div className="flex items-center gap-1" >
              <img src="/dashboard/icon/features.png" alt="" />
              <h1 className="text-xl font-semibold">{t("dashboard.products")}</h1>
            </div>
            <SearchBar
              setCategory={setCategory}
              setSearch={setSearch}
              options={["s"]}
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
          <TableProduct getData={data} locale={locale} data={dummyData } />
          <div className="text-center my-5">
            {/* <Paginate length={lastPage + 1} page={page} setPage={setPage} /> */}
          </div>
        </div>
      </div>

      {open && (
        <ProductAdd
          getData={getData}
          open={open}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default Products;

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
