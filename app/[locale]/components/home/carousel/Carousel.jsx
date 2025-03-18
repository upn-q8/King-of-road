"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "../../../../../navigation";
import { useTranslations } from "next-intl";

function Carousel() {
  const t = useTranslations("home");

  return (
    <div className="container mx-auto md:w-5/6">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{ waitForTransition: 300 }}
        modules={[Pagination, Autoplay]}
        className="mySwiper min-h-60"
      >
        {Array.from({ length: 3 })?.map((_, i) => (
          <SwiperSlide key={i} className="relative min-h-60">
            <img src={"/home/carousel.png"} className="min-h-60" alt="" />
            <div className="absolute z-10 md:left-1/4 top-1/3 max-md:w-full max-md:text-center ">
              <h1 className="text-4xl font-semibold mb-4">{t("discover")}</h1>
              <Link
                href={"/products"}
                className={
                  "p-1.5 px-4 text-xl rounded-md bg-white text shadow-md"
                }
              >
                {t("find")}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
