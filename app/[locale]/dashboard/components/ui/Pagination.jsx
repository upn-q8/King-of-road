import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from "lucide-react";
import React from "react";

const Paginate = ({ page, setPage, disabled, length, perPage, setPerPage }) => {
  return (
    <div>
      <nav className="mt-4 ">
        <ul className="inline-flex -space-x-px gap-3 text-sm">
          <li>
            <button
              disabled={disabled || page === 1}
              onClick={() => setPage(page - 1)}
              className="flex gap-2 text-[17px] items-center justify-center px-3 h-8 ms-0 leading-tight text-[#F36E21]"
            >
              <span className="text-xl font-semibold">{"<<"}</span>
            </button>
          </li>

          {Array.from({ length: Math.min(length, 3) }).map((_, i) => {
            const pageNumber = page == 1 ? page + i : page + i - 1;
            if (pageNumber <= length && pageNumber > 0)
              return (
                <button
                  key={i}
                  className={`${
                    pageNumber === page
                      ? "bg-[#F36E21] text-white"
                      : "text-[#F36E21]"
                  } rounded-md p-0.5 px-3`}
                  onClick={() => setPage(pageNumber)}
                  disabled={pageNumber === page}
                >
                  {pageNumber}
                </button>
              );
          })}
          <li>
            <button
              disabled={page === length}
              onClick={() => setPage(page + 1)}
              className="flex gap-2 text-[17px] items-center justify-center px-3 h-8 ms-0 leading-tight text-[#F36E21]"
            >
              <span className="text-xl font-semibold">{">>"}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
