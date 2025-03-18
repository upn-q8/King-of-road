"use client";
import React from "react";
import { MessageCircle, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

function ClientsInProductSwiper() {
  const [isSmallScreen, setIsSmallScreen] = useState(3);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 600) setIsSmallScreen(1.2);
      else setIsSmallScreen(3);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <section className="container flex items-center mx-auto gap-3 p-4">
      <div className="w-[95%] relative">
        <div className="flex items-center gap-3 relative">
          <h1 className="md:text-xl text-sm font-semibold">
            What customers say about the product
          </h1>
          <img
            src="/icon/line.png"
            className="absolute left-0 -bottom-2 w-[50%]"
            alt=""
          />
        </div>

        <Swiper
          slidesPerView={isSmallScreen}
          spaceBetween={10}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next-client",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {Array.from({ length: 8 })?.map((item, i) => (
            <SwiperSlide
              key={i}
              className="rounded-lg bg-white overflow-hidden my-4 mb-6 border p-5"
            >
              <div className="flex items-center justify-between">
                <img src="/home/person.png" alt="" />
                <div className="flex text-yellow-500 text-sm items-center gap-3 my-2">
                  {Array.from({ length: Number(4) })?.map((item, i) => (
                    <img key={i} src="/home/starYellow.png" alt="" />
                  ))}
                  {Array.from({ length: 5 - Number(4) })?.map((item, i) => (
                    <img key={i} src="/home/starBorder.png" alt="" />
                  ))}
                </div>
              </div>
              <h1 className="text-xl font-semibold my-3">User Name</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <MoveRight className="cursor-pointer swiper-button-next-client" />
    </section >
  );
}

export default ClientsInProductSwiper;
