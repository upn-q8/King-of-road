
"use client";
import React from "react";
import { Link } from "../../../../../navigation";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Gallery = () => {
  const t = useTranslations("home");

  return (
    <div className="container mx-auto py-6 p-2">
      
      <div className="md:hidden">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div
              style={{
                background: `url("/home/car1.png")`,
                backgroundSize: "cover",
              }}
              className="w-full hover:opacity-85 transition-all flex rounded-md items-center p-4 h-[250px] relative"
            >
              <div className="text-white space-y-1">
                <p className="text-2xl font-semibold">Lamps & Light</p>
                <p>Mega Sale!</p>
                <p className="text-gray-300">Sale Up To 25% Off</p>
                <Link
                  href={"/products/1"}
                  className="btn px-4 py-2 mt-2 inline-block rounded-md text-sm"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                background: `url("/home/car2.png")`,
                backgroundSize: "cover",
              }}
              className="w-full hover:opacity-85 transition-all flex rounded-md items-center p-4 h-[250px] relative"
            >
              <div className="text-white space-y-2 text-xl">
                <p>
                  From <span className="text">$10.000</span>
                </p>
                <p>BMW Series Available</p>
                <Link
                  href={"/products/1"}
                  className="btn px-4 py-2 rounded-md text-sm"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

     
      <div className="hidden md:flex flex-wrap items-center justify-between">
        <div
          style={{
            background: `url("/home/car1.png")`,
            backgroundSize: "cover",
          }}
          className="md:w-[46%] hover:opacity-85 transition-all w-full mt-2 flex rounded-md items-center p-4 h-[250px] relative"
        >
          <div className="text-white space-y-1">
            <p className="text-2xl font-semibold">Lamps & Light</p>
            <p>Mega Sale!</p>
            <p className="text-gray-300">Sale Up To 25% Off</p>
            <Link
              href={"/products/1"}
              className="btn px-4 py-2 mt-2 inline-block rounded-md text-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div
          style={{
            background: `url("/home/car2.png")`,
            backgroundSize: "cover",
          }}
          className="md:w-[46%] hover:opacity-85 transition-all w-full mt-2 flex rounded-md items-center p-4 h-[250px] relative"
        >
          <div className="text-white space-y-2 text-xl">
            <p>
              From <span className="text">$10.000</span>
            </p>
            <p>BMW Series Available</p>
            <Link
              href={"/products/1"}
              className="btn px-4 py-2 rounded-md text-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
