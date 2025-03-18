
"use client";
import { MoveLeft, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../../card/ProductCard";

const ProductsSwiper = ({ locale, title, dataProduct, categories = [] }) => {

  const t = useTranslations("");

  const [isSmallScreen, setIsSmallScreen] = useState(4.5);
  const [selectedCategory, setSelectedCategory] = useState(categories?.[0]?.title || "");


  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 600) setIsSmallScreen(1.2);
      else setIsSmallScreen(4.5);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <section className="py-20 container mx-auto p-4">
     
    
     
      <div className="flex items-center gap-3 relative mb-5">
      
        <img src="/icon/fire.png" alt="fire" />
        <h1 className="md:text-xl text-sm font-semibold">{title}</h1>
        <img
          src="/icon/line.png"
          className="absolute left-0 -bottom-4 w-[150%]"
          alt="line"
        />
           <div className="flex items-center gap-3 ml-auto">
          <MoveLeft
            className="text-gray-400 swiper-button-prev cursor-pointer"
            size={28}
          />
          <MoveRight className="swiper-button-next cursor-pointer" size={28} />
        </div>
       </div>
     
       
    

     
    
   
      <Swiper slidesPerView={3} spaceBetween={15} freeMode={true} className="mt-3">
      {Array.isArray(categories) && categories.map((item, i) => (

          <SwiperSlide key={i} className="w-auto">
            <div
              className={`text-gray-600 text-sm cursor-pointer px-2 ${
                selectedCategory === item.title ? "text-orange-500 font-normal" : ""
              }`}
              
              onClick={() => setSelectedCategory(item.title)}
            >
              {item.title}
              {selectedCategory === item.title && (
                <span className="block h-[2px] bg-orange-500 mt-1 w-max pl-20"></span>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     
    
    
      <Swiper
  slidesPerView={isSmallScreen}
  spaceBetween={10}
  navigation={true}
  modules={[Navigation, Pagination]}
>

        {Array.from({ length: 8 })?.map((item, i) => (
          <SwiperSlide key={i} className="rounded-lg overflow-hidden my-4 mb-6">
            <ProductCard
              title="Front Suspension Systems"
              subTitle="Front Suspension Systems"
              image={`/home/product-${i < 4 ? i + 1 : i - 3}.png`}

              offer={240}
              price={250}
              rate={4}
              product={item}
              sale={"10"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductsSwiper;
