import React from "react";
import SideBar from "../components/SideBar";
import ProductCard from "../../components/card/ProductCard";
import Paginate from "../../components/ui/Pagination";

async function getItem(page) {
  const res = await fetch(process.env.Api + "products?page=" + page, {
    cache: "no-store",
    // next: { revalidate: Number(process.env.KEEP_DATA) },
  });
  return res.json();
}

async function getDataCategories() {
  const res = await fetch(process.env.Api + "categories", {
    cache: "no-store",
    // next: { revalidate: Number(process.env.KEEP_DATA) },
  });
  return res.json();
}

const Page = async ({ params }) => {
  const locale = await params?.locale;
  let page = Number(await params?.page);

  // const [data, dataCategory] = await Promise.all([
  //   getItem(page),
  //   getDataCategories(),
  // ]);

  const dataCategory = [
    { id: 1, name_En: "Engine Components (50)" },
    { id: 2, name_En: "All Categories (50)" },
    { id: 3, name_En: "Transmission (50)" },
    { id: 4, name_En: "Braking System (50)" },
    { id: 5, name_En: "Exhaust System (50)" },
    { id: 6, name_En: "Fuel System (50)" },
    { id: 7, name_En: "Cooling System (50)" },
  ];
  
  const dataBrand = [
    { id: 1, name_En: "Audi" },
    { id: 2, name_En: "BMW" },
    { id: 3, name_En: "Mercedes" },
    { id: 4, name_En: "Toyota" },
    { id: 5, name_En: "Ford" },
    { id: 6, name_En: "Honda" },
  ];
  

  return (
    <section className="bg-[#F0F0F0] pb-10">
    
      <div className="container mx-auto grid md:flex md:justify-between md:min-h-screen min-h-[80vh] max-md:flex-wrap">
        <div className="max-md:max-h-24">
          <SideBar
            dataCategory={dataCategory}
            dataBrand={dataBrand}
            locale={locale}
          />
        </div>
        <div className="md:py-20 px-2">
          <h1 className="text-sm ml-8 md:ml-0 md:text-xl font-semibold mb-2 -mt-9 hidden md:block">
            Showing 1-20 of 85 result
          </h1>
          <div className="flex flex-wrap md:justify-items-center md:gap-4 gap-2">
            {Array.from({ length: 8 })?.map((item, i) => (
              <ProductCard
                key={i}
                title="Front Suspension Systems"
                subTitle="Front Suspension Systems"
                image={`/home/product-${i < 4 ? i + 1 : i - 3}.png`}
                offer={240}
                className={"rounded-lg mt-5"}
                price={250}
                rate={4}
                product={item}
                sale={"10"}
              />
            ))}
          </div>
          <div className="text-center">
            <Paginate
              length={4}
              page={page}
              // length={data?.lastPage == 0 ? 1 : data?.lastPage}
              // disabled={data?.lastPage == 0 ? true : page == data?.lastPage}
              // page={page}
              category={null}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
