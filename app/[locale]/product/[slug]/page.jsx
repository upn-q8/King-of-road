import AddProduct from "./components/AddProduct";
import ProductCard from "../../components/card/ProductCard";
import Images from "./components/Images";
import { useTranslations } from "next-intl";
import Stars from "../../components/card/Stars";
import ClientsInProductSwiper from "./components/ClientsInProductSwiper";
import ProductsSwiper from "../../components/home/ProductsSwiper/ProductsSwiper";

async function ProductPage({ params }) {
  const slug = await params?.slug;
  const locale = await params?.locale;

  const descriptions = [
    {
      title: "Here we Write the title",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
amet, consectetur`,
    },
    {
      title: "Here we Write the title",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
amet, consectetur`,
    },
    {
      title: "Here we Write the title",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
amet, consectetur`,
    },
  ];

  return (
    <section className="bg-[#F0F0F0] p-4 pt-10">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row  gap-8 items-center ">
          {/* Image Gallery */}
          <div className="lg:w-2/5 w-full">
            <Images
              cover_image={"/home/product-1.png"}
              images={[
                "/home/product-1.png",
                "/home/product-1.png",
                "/home/product-1.png",
                "/home/product-1.png",
              ]}
            />
            {/* <Images
            cover_image={process.env.Images + data?.product?.cover_Image}
            images={data?.product?.imagesPath?.map(
              (item) => process.env.Images + item
            )}
          /> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:w-3/5">
            <div>
              <h4 className="text">Front Suspension Systems</h4>
              <div className="flex items-center justify-between max-md:flex-wrap">
                <h1 className="text-2xl md:text-3xl">
                  Front Suspension Systems
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text">240$</p>
                  <del className="text-sm text-gray-500">250$</del>
                </div>
              </div>
              <Stars rate={4} />
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              </p>
            </div>

            <div className="space-y-4">
              <AddProduct
              // data={data?.product}
              // quantities={data?.product?.quantities}
              // locale={locale}
              />
            </div>
          </div>
        </div>
        {descriptions?.map((item, i) => (
          <article key={i}>
            <h1 className="text-2xl mt-5">{item?.title}</h1>
            <p className="text-gray-500 mt-2 mb-5">{item?.description}</p>
          </article>
        ))}
        <ClientsInProductSwiper />
        <ProductsSwiper
          title="Frequently bought together"
          dataProduct={[]}
          locale={locale}
        />
      </div>
    </section>
  );
}

export default ProductPage;
