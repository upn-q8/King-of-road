import Select from "../../ui/Select";

export default function HeroSection() {
  return (
    <div
      style={{
        background: `url("/home/banner.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="md:min-h-[70vh] min-h-[100vh] flex items-center justify-center"
    >
      <div className="container mx-0 p-3 max-md:py-20">
        <div className="text-white text-center text-xl md:text-5xl space-y-3">
          <p className="max-md:text-2xl">
            We provide everything your <span className="text">car</span> needs
          </p>
          <p>
            Over <span className="text">100,000</span> car parts
          </p>
        </div>
        <div className="md:flex items-center justify-center max-md:space-y-6 gap-3 mt-4 max-md:flex-wrap">
          <Select
            placeholder={"Category"}
            className={"py-3 w-full lg:w-60 max-md:rounded-md rounded-s-lg"}
          />
          <Select
            placeholder={"Select brand"}
            className={"py-3 max-md:rounded-md w-full lg:w-60 "}
          />
          <Select
            placeholder={"Select price"}
            className={"py-3 max-md:rounded-md w-full lg:w-60 "}
          />
          <button className="w-full lg:w-28 btn py-3 mt-1 max-md:rounded-md md:rounded-e-lg">
            Search
          </button>
        </div>
        <img src="/bottom.png" className="mx-auto mt-5" alt="" />
      </div>
    </div>
  );
}
