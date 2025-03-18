import { useState } from "react";
import Paginate from "../../../components/ui/Pagination";
import { Eye, Edit, Trash2 } from "lucide-react";

function Table({ headers, rows, actions, rowsPerPage = 5 }) {
  const appointments2 = [
    {  ClientName: "Client Name", AppointmentBooked: "Appointment booked", Completed: "Completed" },
    // { id: 2, client: "Another Client", email: "client2@mail.com", phone: "+961 985 123 4567", carType: "SUV", subject: "Maintenance", details: "Oil Change", date: "15/3/2025 AT 14:00 PM", status: "In Progress", notes: "Vehicle needs full maintenance..." },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress": return "bg-yellow-200 text-yellow-700";
      case "Canceled": return "bg-red-200 text-red-700";
      case "Completed": return "bg-green-200 text-green-700";
      default: return "bg-gray-200 text-gray-700";
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-orange-500 text-white text-center">
            {headers.map((header, index) => (
              <th key={index} className="p-3 font-medium text-sm">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((appointment2, i) => (
            <tr key={appointment2.id || i} className="border-b text-gray-700 text-center">
              <td className="p-3 py-6">{appointment2.client}</td>
              <td className="p-3 py-6">{appointment2.date}</td>
              <td className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusClass(appointment2.status)}`}>
                {appointment2.status}
              </td>
              <td className="p-3 flex justify-center space-x-3 py-6">
                <Eye className="text-orange-500 cursor-pointer" onClick={() => actions.onView(appointment2)} />
                <Edit className="text-black cursor-pointer" onClick={() => actions.onEdit(appointment2)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => actions.onDelete(appointment2)} />
              </td>
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
