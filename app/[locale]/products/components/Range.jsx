import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ArrowDownCircleIcon } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

export default function PriceFilter() {
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <Disclosure as={"div"} className="p-4 bg-white shadow-none md:shadow-md rounded-lg">
      <DisclosureButton
        className="flex items-center justify-between cursor-pointer"
        as="div"
      >
        <h2>Filter by price</h2>
        <ArrowDownCircleIcon />
      </DisclosureButton>

      <DisclosurePanel as="div">
        <hr className="my-2" />
        <Slider
          range
          min={0}
          max={500}
          step={5}
          value={priceRange}
          onChange={setPriceRange}
          trackStyle={[{ backgroundColor: "orange" }]}
          handleStyle={[
            { borderColor: "orange", backgroundColor: "white" },
            { borderColor: "orange", backgroundColor: "white" },
          ]}
        />

        <div className="flex justify-between items-center mt-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600">
            Filter
          </button>
          <p className="text-sm">
            Price: <span className="text-orange-500">{priceRange[0]}$</span> -{" "}
            <span className="text-orange-500">{priceRange[1]}$</span>
          </p>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
