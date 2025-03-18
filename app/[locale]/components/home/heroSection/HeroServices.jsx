import { ArrowUpRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeroServices() {
  const t = useTranslations("home.our-services");

  const heroServices = [
    {
      title: "Installation service",
      description: "",
      image: "/home/installation.png",
    },
    {
      title: "Maintenance service",
      description: "",
      image: "/home/fix.png",
    },
    {
      title: "Fast delivery service",
      description: "",
      image: "/home/clock.png",
    },
  ];
  return (
    <section className="bg-[#FCFCFC] pt-5">
      <div className="container mx-auto">
        <h1 className="text-center mt-5 md:text-2xl">Our special services</h1>
        <span className="bg w-28 md:w-36 h-1 mx-auto rounded-lg mt-2 block"></span>
        <div className="flex items-center justify-between max-md:gap-4 max-lg:flex-wrap mt-10">
          {heroServices.map((service, i) => {
            return (
              <div className="w-full hover:-translate-y-2 transition-all lg:w-[30%] rounded-md p-2" key={i}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={service.image} className="max-lg:w-14" alt="" />
                    <h4>{service.title}</h4>
                  </div>
                  <ArrowUpRightIcon className="text" size={28} />
                </div>
                <hr className="my-2" />
                <p className="text-[15px]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
