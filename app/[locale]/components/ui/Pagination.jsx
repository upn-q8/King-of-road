import { Link } from "../../../../navigation";
import React from "react";

const Paginate = ({ page, category, disabled, length }) => {
  return (
    <div className="mx-auto w-48">
      <nav className="mt-4 ">
        <ul className="flex items-center pb-5 gap-3 text-sm">
          <li>
            <Link
              href={
                disabled || page === 1
                  ? ""
                  : category && page > 1
                  ? `/products/${category}/${page - 1}`
                  : "/products/" + Number(page - 1)
              }
              className="flex gap-2 text-[17px] items-center justify-center px-3 h-8 ms-0 leading-tight text-[#F36E21]"
            >
              <span className="text-xl font-semibold">{"<<"}</span>
            </Link>
          </li>

          {Array.from({ length: Math.min(length, 3) }).map((_, i) => {
            const pageNumber = page == 1 ? page + i : page + i - 1;
            if (pageNumber <= length && pageNumber > 0)
              return (
                <Link
                  key={i}
                  className={`${
                    pageNumber === page
                      ? "bg-[#F36E21] text-white"
                      : "text-[#F36E21]"
                  } rounded-md p-0.5 px-3`}
                  href={
                    category && page > 1
                      ? `/products/${category}/${Number(i + 1)}`
                      : "/products/" + Number(i + 1)
                  }
                  disabled={pageNumber === page}
                >
                  {pageNumber}
                </Link>
              );
          })}
          <li>
            <Link
              href={
                page === length
                  ? ""
                  : category && page > 1
                  ? `/products/${category}/${page + 1}`
                  : "/products/" + Number(page + 1)
              }
              className="flex gap-2 text-[17px] items-center justify-center px-3 h-8 ms-0 leading-tight text-[#F36E21]"
            >
              <span className="text-xl font-semibold">{">>"}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
