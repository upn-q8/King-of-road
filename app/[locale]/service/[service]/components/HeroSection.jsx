import React from "react";

export default function HeroSection() {
  return (
    <div
      style={{
        background: `url("/service/bg.png") fixed`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=""
    >
      <div className="md:min-h-[70vh] min-h-[100vh] bg-black/20 flex items-center justify-center">
        <div className="container mx-0 p-3 max-md:py-20">
          <div className="flex items-center gap-3">
            <img src="/service/fix.png" className="w-12" alt="" />
            <h1 className="md:text-6xl text-xl text-white">
              We provide all <span className="text">Maintenance</span> services
              for your car
            </h1>
          </div>
          <img src="/service/line.png" className="mt-5 max-md:w-3/4" alt="" />
          <div className="flex gap-2 items-center mt-10">
            <div className="flex items-center gap-2">
              <div className="w-[2px] hidden lg:block rounded-full h-24 bg-gradient-to-tr to-white from-transparent"></div>
              <div className="w-[2px] hidden lg:block rounded-full h-28 bg-gradient-to-tr to-white from-transparent"></div>
              <div className="w-[2px] hidden lg:block rounded-full h-32 bg-gradient-to-tr to-white from-transparent"></div>
            </div>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
