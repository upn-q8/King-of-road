 "use client"; 

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

function ClientsSwiper() {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 640 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-14 max-md:w-[95%] bg-white rounded-xl container mx-auto p-4">
      <div className="flex items-center gap-3 relative">
        <MessageCircle className="text-orange-500" size={32} />
        <h1 className="md:text-xl font-semibold text-orange-500">
          What our clients say about us
        </h1>
        <img
          src="/icon/line.png"
          className="absolute left-0 -bottom-2 w-[50%]"
          alt="underline"
        />
      </div>

      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={slidesPerView === 1 ? 5 : 20}
        pagination={{ dynamicBullets: true }}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        modules={[Navigation, Pagination]}
        className="mySwiper mt-6"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SwiperSlide
            key={i}
            className="rounded-lg overflow-hidden border p-5 shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src="/home/person.png"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <img key={i} src="/home/starYellow.png" alt="star" className="w-4" />
                ))}
                {Array.from({ length: 1 }).map((_, i) => (
                  <img key={i} src="/home/starBorder.png" alt="star" className="w-4" />
                ))}
              </div>
            </div>
            <h1 className="text-lg font-semibold mt-3">User Name</h1>
            <p className="text-gray-600 text-sm mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been the industry's standard dummy text ever since.
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ClientsSwiper;
