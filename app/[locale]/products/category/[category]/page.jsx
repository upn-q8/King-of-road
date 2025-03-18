import React from "react";
import SideBar from "../../../components/products/Sidebar";
import ProductCard from "../../../components/card/ProductCard";

async function getItem(slug) {
  const res = await fetch(process.env.Api + "products/category/" + slug, {
    cache: "no-store",
  });

  return res.json();
}

async function getDataCategories() {
  const res = await fetch(process.env.Api + "categories", {
    cache: "no-store",
  });
  return res.json();
}

const Page = async ({ params }) => {
  const locale = await params?.locale;
  let category = await params?.category;

  const [data, dataCategory] = await Promise.all([
    getItem(category),
    getDataCategories(),
  ]);

  return (
    <div className="flex justify-between min-h-screen max-md:flex-wrap h-full">
      <SideBar categoryParams={category} data={dataCategory} locale={locale} />
      {/* <SideBar dataCategory={dataCategory} data={dataBrand} locale={locale} /> */}

      <div className="container mx-auto py-10">
        <div className="flex flex-wrap justify-center gap-4 p-2">
          {data?.length > 0 &&
            data?.map((item, index) => (
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
                lightColor={"bg-light-orange"}
                mainColor={"bg-main-orange"}
                dimensionsClasses={
                  "xl:max-w-[450px] max-md:w-full border border-main-orange max-md:min-h-44"
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
