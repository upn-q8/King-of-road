import { CalendarFold } from "lucide-react";

export default function OrderArchive() {
  const orders = [
    { id: 1, number: "4/3/2025", cost: "Car type", method: "Parts to be installed or maintained", status: "Waiting", color: "bg-gray-200 text-gray-700" },
    { id: 2, number: "4/3/2025", cost: "Car type", method: "Parts to be installed or maintained", status: "Canceled", color: "bg-red-100 text-red-600" },
    { id: 3, number: "4/3/2025", cost: "Car type", method: "Parts to be installed or maintained", status: "Ongoing", color: "bg-orange-100 text-orange-600" },
    { id: 4, number: "4/3/2025", cost: "Car type", method: "Parts to be installed or maintained", status: "Complete", color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-xl mb-6 self-start">My Appointments</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <img src="../no-archive.png" className="w-24  " />

          <p className="text-gray-600 text-lg font-medium">
            Your Appointments Found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 md:p-6 rounded-xl shadow-md w-full mx-auto transition-transform duration-200 hover:scale-105"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 border-2 border-orange-500 rounded-full flex items-center justify-center">
                    <CalendarFold stroke="#FE5F0D" size={24} />
                  </div>
                  <div>
                    <p className="text-lg text-main-black font-normal">
                      {order.number}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${order.color}`}
                >
                  ● {order.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-lg text-main-black font-normal">
                    Car Type
                  </p>
                  <p className="text-main-black opacity-60 text-sm">
                    {order.cost}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-main-black font-normal">
                    Parts to be Installed/Maintained
                  </p>
                  <p className="text-main-black opacity-60 text-sm">
                    {order.method}
                  </p>
                </div>
              </div>

              <button className="text-orange-500 font-normal mt-4 flex items-center hover:underline transition-colors duration-200">
                View Details &raquo;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
