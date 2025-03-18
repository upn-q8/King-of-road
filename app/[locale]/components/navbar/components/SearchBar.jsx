import { ChevronDown, Search } from "lucide-react";
import React from "react";

function SearchBar() {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#FAFAFA] border border-[#FE5F0D]/20 rounded-md">
      <div>
        <p className="text">
          All Categories <ChevronDown className="inline-block" size={13} />{" "}
        </p>
      </div>
      <p className="text-gray-500">|</p>
      <div className="flex items-center gap-2">
        <Search className="text-gray-500" />
        <input
          type="search"
          placeholder="Search for items..."
          className="bg-transparent border-none focus:outline-none px-2"
        />
      </div>
    </div>
  );
}

export default SearchBar;
