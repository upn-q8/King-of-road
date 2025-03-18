"use client";
import React, { useEffect, useState } from "react";
import Title from "../../ui/Title";
import { useTranslations } from "next-intl";
import { Link } from "../../../../../navigation";
import { MoveRight, ShoppingCartIcon } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../../card/ProductCard";
import ProductsSwiper from "../ProductsSwiper/ProductsSwiper";

function Categories({ locale, data }) {
  const t = useTranslations("home");
  const [check, setCheck] = useState(data[0]?.title);

  const [isSmallScreen, setIsSmallScreen] = useState(4);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 600) setIsSmallScreen(1.2);
      else setIsSmallScreen(4);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="py-10 container mx-auto px-4">
      <div className="bg-[#2A2A2A] p-3 rounded-md px-4 relative lg:block hidden">
        <div className="flex items-center justify-between border-b-2 border-gray-600 pb-2">
          <div className="flex items-center uppercase text-2xl text-white gap-2">
            <img src="/home/star.png" />
            Featured Categories
          </div>
          <div className="flex text-white gap-6 items-center">
            {data?.map((item, i) => (
              <div key={i} className="relative">
                <p
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setCheck(item?.title)}
                >
                  {item?.title}
                </p>
                {check == item?.title && (
                  <span className="absolute w-full h-0.5 bg -bottom-[26px]"></span>
                )}
              </div>
            ))}
            <MoveRight className="text" />
          </div>
        </div>

        <Swiper
          slidesPerView={isSmallScreen}
          spaceBetween={10}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper w-[95%] mb-3"
        >
          {Array.from({ length: 8 })?.map((item, i) => (
            <SwiperSlide
              key={i}
              className="rounded-lg overflow-hidden my-4 mb-6"
            >
              <ProductCard
                title="Front Suspension Systems"
                subTitle="Front Suspension Systems"
                image={`/home/product-${i < 4 ? i + 1 : i - 3}.png`}
                offer={240}
                price={250}
                rate={4}
                product={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <MoveRight
          className="text-white absolute top-1/2 right-3 z-20 swiper-button-next cursor-pointer"
          size={30}
        />
      </div>
      <div className="lg:hidden">
      <ProductsSwiper
  title="Featured Categories"
  dataProduct={[]} 
  categories={data || []} 
  locale={locale}
/>


      </div>
   
  
 


    </div>
  );
}

export default Categories;
