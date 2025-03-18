import React from "react";

function Table({ header, children }) {
  return (
    <table className="w-full overflow-auto border">
      <thead className="border-b border-t">
        <tr className="bg text-white text-center" >
          {header?.map((item, i) => (
            <td
              className={`min-w-6 text-nowrap font-semibold p-1 py-2`}
              key={i}
            >
              {item}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default Table;
