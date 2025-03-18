"use client";

import { ArrowDownCircleIcon, Filter, X } from "lucide-react";
import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import PriceFilter from "./Range";

export default function Sidebar({ dataCategory, dataBrand }) {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const toggleSelection = (id) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };

  return (
    <div className="relative">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-[290px] md:w-80 min-h-[600px] space-y-9 p-5 pt-12">
        <DisclosureData
          title="Product Category"
          data={dataCategory}
          selectedItems={selectedItems}
          toggleSelection={toggleSelection}
        />
        <DisclosureData
          title="Brand"
          data={dataBrand}
          selectedItems={selectedItems}
          toggleSelection={toggleSelection}
        />

        <PriceFilter />
        <DisclosureData
          title="Product Status"
          data={[
            { id: 1, name_En: "Not included in the discount" },
            { id: 2, name_En: "Within the discount" },
          ]}
          selectedItems={selectedItems}
          toggleSelection={toggleSelection}
        />
      </div>

      {/* Sidebar Mobile */}
      <div className="sm:hidden flex justify-between items-center px-4 py-6 mb-6 bg-[#2a2a2a] text-white text-sm font-semibold">
        <button
          className="flex items-center text-sm font-normal"
          onClick={() => setOpen(true)}
        >
          Filters ({Object.values(selectedItems).filter(Boolean).length}){" "}
          <span className="ml-1">▼</span>
        </button>
      </div>

      {/* Filter Modal (Mobile) */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
          <div className="w-full h-3/4 bg-white p-5 pt-12 shadow-lg rounded-t-2xl transition-transform transform translate-y-0">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-600"
            >
              <X size={24} />
            </button>

            {/* Filter Options */}
            <div className="space-y-6 overflow-y-auto h-[70%] px-2">
              <DisclosureData
                title="Product Category"
                data={dataCategory}
                selectedItems={selectedItems}
                toggleSelection={toggleSelection}
              />
              <DisclosureData
                title="Brand"
                data={dataBrand}
                selectedItems={selectedItems}
                toggleSelection={toggleSelection}
              />

              <PriceFilter />
              <DisclosureData
                title="Product Status"
                data={[
                  { id: 1, name_En: "Not included in the discount" },
                  { id: 2, name_En: "Within the discount" },
                ]}
                selectedItems={selectedItems}
                toggleSelection={toggleSelection}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between px-3">
              <button
                className="text-orange-500 font-medium"
                onClick={() => setSelectedItems({})}
              >
                Clear Filters
              </button>
              <button
                className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg"
                onClick={() => setOpen(false)}
              >
                Show {Object.values(selectedItems).filter(Boolean).length}{" "}
                Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DisclosureData = ({ data, title, selectedItems, toggleSelection }) => {
  return (
    <Disclosure
      as="div"
      className="rounded-lg bg-white p-4 shadow-none md:shadow-md"
    >
      <DisclosureButton className="flex items-center w-full justify-between cursor-pointer">
        <p>{title}</p>
        <ArrowDownCircleIcon />
      </DisclosureButton>
      <DisclosurePanel as="div">
        <hr className="my-3" />
        <div className="max-h-60 overflow-auto p-1 scrollbar-thin">
          {/* Desktop Mode (Checkbox) */}
          <div className="hidden lg:block">
            {data?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 text-nowrap text-sm mt-3"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-primary"
                    checked={!!selectedItems[item.id]}
                    onChange={() => toggleSelection(item.id)}
                  />
                  {item?.name_En}
                </label>
              </div>
            ))}
          </div>

          {/* Mobile Mode (Selectable Buttons) */}
          <div className="lg:hidden grid grid-cols-2 gap-2">
            {data?.map((item, i) => (
              <button
                key={i}
                className={`p-2 text-sm rounded-lg h-[40px] flex justify-start items-center ${
                  selectedItems[item.id]
                    ? "bg-orange-100 text-orange-600"
                    : "bg-gray-200"
                }`}
                onClick={() => toggleSelection(item.id)}
              >
                {item?.name_En}
              </button>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
