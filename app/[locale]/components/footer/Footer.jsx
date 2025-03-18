"use client";
import React from "react";
import { Link, usePathname } from "../../../../navigation";
import { useTranslations } from "next-intl";

function Footer({ data, locale }) {
  const t = useTranslations("");

  const socail = [
    {
      icon: "/icon/facebook.png",
      link: "#",
    },
    {
      icon: "/icon/twitter.png",
      link: "#",
    },
    {
      icon: "/icon/linkedin.png",
      link: "#",
    },
    {
      icon: "/icon/instagram.png",
      link: "#",
    },
  ];

  const info = [
    {
      icon: "/icon/location.png",
      title: "Lorem ipsum dolor",
    },
    {
      icon: "/icon/mail.png",
      title: "Infostore@gmail.com",
    },
    {
      icon: "/icon/phone.png",
      title: "+999 9854 2631 7852",
    },
  ];

  const links = [
    { title: "Home", href: "/" },
    { title: "About us", href: "/" },
    { title: "Product Categories", href: "/" },
    { title: "Installation service", href: "/" },
    { title: "Maintenance service", href: "/" },
  ];

  const pathName = usePathname();

  return (
    !pathName.startsWith("/dashboard") &&
    !pathName.startsWith("/erro") && (
      <footer
        className="lg:min-h-80"
        style={{
          background: `url("/footer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="bg-[#2A2A2A]/25 md:p-12 p-5">
          <div className="container mx-auto">
            <div className="flex items-start justify-between max-md:flex-wrap">
              <div className="md:max-w-[48%] w-full">
                <img src="/logo.png" className="max-w-72" alt="" />
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="text-white">
                <h2 className="mb-2 font-semibold">Pages</h2>
                {links?.map((item, i) => (
                  <Link
                    key={i}
                    href={item?.href}
                    className="block mt-1 text-[15px] font-normal"
                  >
                    {item?.title}
                  </Link>
                ))}
              </div>
              <div className="text-white">
                <h2>Contact US</h2>
                {info?.map((item, i) => (
                  <div
                    key={i}
                    className="mt-5 flex items-center gap-4 text-[15px] font-normal"
                  >
                    <img src={item?.icon} width={20} alt="" />
                    {item?.title}
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <p>Follow Us</p>
                  {socail?.map((item, i) => (
                    <Link
                      href={item?.link}
                      key={i}
                    >
                      <img src={item?.icon} className="w-4 h-3.5 object-contain" alt="" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <hr className="mt-5" />
            <h1 className="text-center text-white mt-4">
              {t("footer")}{" "}
              <Link
                href={"https://www.upnq8.com/"}
                className="underline"
                target="_blank"
              >
                | Powered by UPNQ8
              </Link>
            </h1>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;
