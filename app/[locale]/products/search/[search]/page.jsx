"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../../../components/products/Sidebar";
import ProductCard from "../../../components/card/ProductCard";
import axiosInstance from "../../../components/axios/axiosInstance";

const Page = async ({ params }) => {
  const locale = await params?.locale;
  let search = await params?.search;
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState();

  const handleGetData = async () => {
    try {
      const res = await axiosInstance.get("products?query=" + search);
      setData(res.data);
      const resCategory = await axiosInstance.get("categories");
      setDataCategory(resCategory.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [search]);

  return (
    <div className="flex justify-between min-h-screen max-md:flex-wrap h-full">
      <SideBar data={dataCategory} locale={locale} />
      <div className="container mx-auto py-20">
        <div className="flex flex-wrap justify-center gap-8 p-2">
          {data?.items?.map((item, index) => (
            <ProductCard
              key={index}
              id={item?.id}
              image={process?.env?.Images + item?.cover_Image}
              title={locale == "ar" ? item?.name_Ar : item?.name_En}
              price={item?.quantities?.find((i) => i?.default == true)?.price}
              offer={item?.quantities?.find((i) => i?.default == true)?.offer}
              subtitle={
                locale == "ar"
                  ? item?.categories[0]?.name_Ar
                  : item?.categories[0]?.name_En
              }
              product={item}
              slug={locale == "ar" ? item?.slug_Ar : item?.slug_En}
              lightColor={"bg-light-yellow"}
              mainColor={"bg-main-yellow"}
              dimensionsClasses={
                "xl:max-w-[450px] max-md:w-full max-md:min-h-96"
              }
              buttonDimensionClasses={"sm:w-[200px]"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
