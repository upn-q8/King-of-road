"use client";
import React, { useContext, useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "../../../../navigation";
import { Bell, ChevronRight, MoveLeft, Search,MessagesSquare,Globe  } from "lucide-react";
import { useTranslations } from "next-intl";
import LocalSwitcher from "../../components/ui/LocalSwitcher";
import AppContext from "../../contexts";

function CSR({ children }) {
  const t = useTranslations("");

  const Links = [
    {
      title: t("dashboard.categories"),
      link: "/dashboard/categories",
      icon: "category",
    },
    {
      title: t("dashboard.products"),
      link: "/dashboard/products",
      icon: "box",
    },
    { title: t("dashboard.orders"), link: "/dashboard/order", icon: "order" },
    // {
    //   title: t("dashboard.contact-info"),
    //   link: "/dashboard/contact",
    //   icon: "phone",
    // },
    {
      title: ("Services"),
      link: "/dashboard/services",
      icon: "layer",
    },
    {
      title: "Discounts",
      link: "/dashboard/discount",
      icon: "discount",
    },
    {
      title: "Clients",
      link: "/dashboard/users",
      icon: "users",
    },
    {
      title: ("Messages"),
      link: "/dashboard/messages",
      icon: "sms",
    },
  ];
  const pathname = usePathname();

  const { user } = useContext(AppContext);

  const [open, setOpen] = useState(true);

  const router = useRouter();

  // useEffect(() => {
  //   if (user?.role !== "admin") router.push("/");
  // }, [pathname]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="flex">
      <aside
        className="flex flex-col  justify-start max-w-64 max-h-screen h-screen fixed md:sticky top-0 bg-[#2a2a2a] "
        style={{
          width: open ? "240px" : "0px",
          minWidth: open ? "240px" : "0px",
          transition: "0.5s all",
          zIndex: 10000,
        }}
      >
        
          <div className="flex flex-col items-center justify-center w-full pt-10">
      <Link href={"/"} target="_blank">
        <img
          src="/logo2.png"
          className="mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-gray-800 bg-black"
          alt="King Offroad Logo"
        />
      </Link>

    
      <div className="w-36 h-[1px] mt-4 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 opacity-70"></div>
    </div>
        <div
          className="py-3"
          style={{ visibility: open ? "visible" : "hidden" }}
        >
          <ul className="space-y-1 font-medium">
            {Links?.map((item, i) => (
              <Link
                key={i}
                href={item?.link}
                className="flex items-center p-2 text-[#fff] rounded-e-full"
                onClick={() => isSmallScreen && setOpen(false)}
                style={
                  pathname == item?.link
                    ? { color: "#fff", background: "#F36E21" }
                    : {}
                }
              >
                <img
                  src={"/dashboard/icon/" + item?.icon + "White" + ".png"}
                  className="max-md:w-6 w-7"
                  alt=""
                />
                <span className="ms-3">{item?.title}</span>
              </Link>
            ))}
          </ul>
        </div>
        {/* <img src="/dashboard/nute.png" alt="" /> */}
      </aside>

      <div className="min-h-[100vh] w-full bg-[#F0F0F0] overflow-auto">
      
        {/* <div className="bg-white p-3 border border-gradient-to-r from-orange-100 via-orange-300 to-orange-500 opacity-70 flex justify-between items-center"> */}
        <div className="bg-white p-3 border-[1px] border-transparent flex justify-between items-center" 
     style={{ borderImage: "linear-gradient(to right, #EA580C, #FB923C, #FED7AA) 1" }}>
  {/* Left Section: Welcome Message */}
  <h1 className="text-lg font-semibold ms-4">Welcome Hala</h1>

  {/* Center: Search Bar */}
  <div className="flex-1 flex justify-center">
    <div className="border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 w-[65%]">
      <Search className="text-gray-500" />
      <input
        type="search"
        className="border-none outline-none bg-transparent w-full text-sm text-gray-700"
        placeholder="Search..."
      />
    </div>
  </div>

  {/* Right Section: Icons & Profile */}
  <div className="flex items-center gap-4 me-4">
    <button className="bg-gray-100 rounded-full p-2">
      <Globe className="text-gray-500" size={20} />
    </button>
    <button className="bg-gray-100 rounded-full p-2 relative">
      <Bell className="text-gray-500" size={20} />
      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">•</span>
    </button>
    {/* Profile Image */}
    <div className="w-10 h-10 rounded-full overflow-hidden border">
      <img src="/path-to-user-image.jpg" alt="User Profile" className="w-full h-full object-cover" />
    </div>
  </div>
</div>

        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
}

export default CSR;
