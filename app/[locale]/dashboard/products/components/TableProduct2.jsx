import { useState } from "react";
import Paginate from "../../../components/ui/Pagination";

function TableProduct2({ headers, rows, actions, rowsPerPage = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md">
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
                <td key={j} className="p-2 border-b border-gray-300">
                  {cell}
                </td>
              ))}
              {actions && (
                <td className="p-2 border border-gray-300">
                  <button
                    className="text-red-500"
                    onClick={() => actions.onDelete(i)}
                  >
                    🗑
                  </button>
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

export default TableProduct2;
  