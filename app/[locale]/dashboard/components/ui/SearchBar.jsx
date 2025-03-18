import { Search, SlidersHorizontalIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

function SearchBar({
  options,
  setSearch,
  setCategory,
  setStartSerach,
  startSerach,
  classNameInput,
}) {
  const t = useTranslations("");

  return (
    <div className="bg-[#D9D9D9]/25 px-4 rounded-md p-2 flex items-center gap-2 w-[60%]">
      {options?.length > 0 && (
        <>
          <div className="flex items-center text gap-1">
            <SlidersHorizontalIcon />
            <select
              className="bg-transparent w-16"
              onChange={(e) => setCategory(e.target?.value)}
            >
              <option hidden>{t("filter")}</option>
              {options?.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="h-4 w-[2px] bg-gray-400"></div>
        </>
      )}
      <Search
        className="cursor-pointer text-gray-500"
        onClick={() => setStartSerach(!startSerach)}
      />
      <input
        type="search"
        className={
          "border-none outline-none p-1 bg-transparent max-lg:w-16 text-[#9D9BAF] "
          + classNameInput
        }
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") setStartSerach(!startSerach);
        }}
        placeholder={t("search") + ".."}
      />
    </div>
  );
}

export default SearchBar;
