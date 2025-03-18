import React from "react";
import HeroSection from "./components/home/heroSection/HeroSection";
import FeaturedCategories from "./components/home/featuredCategories/FeaturedCategories";
import Gallery from "./components/home/gallery/Gallery";
import ProductsSwiper from "./components/home/ProductsSwiper/ProductsSwiper";
import HeroServices from "./components/home/heroSection/HeroServices";
import ClientsSwiper from "./components/home/ClientsSwiper/ClientsSwiper";
import { redirect } from "../../navigation";

export default async function Home({ params }) {
  const locale = await params?.locale;

  const dataCategories = [
    { title: "Front Suspension Systems" },
    { title: "Springs" },
    { title: "Coilovers" },
    { title: "Shock Absorbers" },
  ];

  return (
    <main className="bg-[#F0F0F0] pb-10">
      <HeroSection />
      <HeroServices />
      <FeaturedCategories data={dataCategories} locale={locale} />
      <Gallery />
      <ProductsSwiper
        title={"Best Selling Products"}
        dataProduct={[]}
        locale={locale}
      />
      <Gallery />
      <ProductsSwiper title="Products on sale" dataProduct={[]} locale={locale} />
      <ClientsSwiper title="Products on sale" dataProduct={[]} locale={locale} />
    </main>
  );
}
