
"use client";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import TableDiscount from "./components/TableDiscount";
import Paginate from "../components/ui/Pagination";
import DiscountAdd from "./components/DiscountAdd";
import DiscountDetails from "./components/DetailsDiscounts";
import { Button } from "@headlessui/react";
import SearchBar from "../components/ui/SearchBar";

function Discount({ params }) {
  const locale = params?.locale || "en";
  const t = useTranslations("");

  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [search, setSearch] = useState("");
  const [startSearch, setStartSearch] = useState("");
  const [page, setPage] = useState(1);
  
  
  const dummyData = [
    { Value1: "Product", Value2: "25%", Value3: "7/1/2025", Value4: "9/1/2025" }
   
  ];

  const handleDetails = (discount) => {
    setSelectedDiscount(discount);
    setDetailsOpen(true);
  };

  return (
    <div>
      <div className="p-5">
        <div className=" bg-white rounded-xl shadow-md overflow-auto">
          <div className="p-6 flex gap-6 items-center pb-8 justify-between">
            <div className="flex items-center gap-3">
              <img src="/dashboard/icon/tag.png" alt="" />
              <h1 className="text-xl">{t("code-discount")}</h1>
            </div>
            <SearchBar setSearch={setSearch} options={["s"]} startSearch={startSearch} setStartSearch={setStartSearch} />
            <Button onClick={() => setOpen(true)} className={"btn w-36 rounded-md p-2"}>
              {t("add")}
            </Button>
          </div>
          <TableDiscount data={dummyData} onViewDetails={handleDetails} />
          <div className="text-center my-5">
            <Paginate length={4} page={page} />
          </div>
        </div>
      </div>

      {open && <DiscountAdd open={open} close={() => setOpen(false)} />}
      {detailsOpen && <DiscountDetails discount={selectedDiscount} close={() => setDetailsOpen(false)} />}
    </div>
  );
}

export default Discount;
