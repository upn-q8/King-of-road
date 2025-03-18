import { useState } from "react";
import Paginate from "../../../components/ui/Pagination";

function Table({ headers, rows, actions, rowsPerPage = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div className="w-full  overflow-hidden ">
      <table className="w-full ">
        <thead>
          <tr className="bg-orange-500 text-white">
            {headers.map((header, index) => (
              <th key={index} className="p-2 border-b border-gray-300 font-medium text-base">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, i) => (
            <tr key={i} className="text-center">
              {Object.values(row).map((cell, j) => (
                <td key={j} className="p-2 border-b border-gray-300 justify-items-center justify-center items-center">
                  {cell}
                </td>
              ))}
              {actions && (
                <td className="p-2 border border-gray-300">
                    <div className="flex gap-3 justify-center items-center">
                <Eye
                  className="text-[#F36E21] cursor-pointer"
                  
                
                  onClick={() => router.push(`/dashboard/products/details/${item.id}`)}


                />
                <Edit
                  onClick={() => setIdUpdate(item)}
                  className="text-gray-700 min-w-5 cursor-pointer"
                />
                <BadgePercent className="text-green-700 cursor-pointer" />
                <img
                  onClick={() => setIdDelete(item?.id)}
                  src="/delete.png"
                  className="cursor-pointer"
                  width={23}
                  alt=""
                />
              </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="flex justify-center mt-4">
        <Paginate
          page={currentPage}
          category={null}
          disabled={false}
          length={totalPages}
        />
      </div>
    </div>
  );
}

export default Table;
  