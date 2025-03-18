import { Box } from "lucide-react";

export default function OrderArchive() {
  const orders = [
    // { id: 1, number: "2548-52", cost: 500, method: "Cash On Delivery", status: "Pending", color: "bg-gray-200 text-gray-700" },
    // { id: 2, number: "2548-52", cost: 500, method: "Cash On Delivery", status: "Delivery in Progress", color: "bg-yellow-200 text-yellow-800" },
    // { id: 3, number: "2548-52", cost: 500, method: "Cash On Delivery", status: "Cancelled", color: "bg-red-200 text-red-800" },
    // { id: 4, number: "2548-52", cost: 500, method: "Cash On Delivery", status: "Delivered", color: "bg-green-200 text-green-800" },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-xl mb-6 text-main-black self-start">Order Archive</h1>


      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
        
          <img src="../no-archive.png" className="w-32 "/>
          <p className="text-gray-600 text-lg font-medium">Your Order Archive Is Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-5 md:p-6 rounded-xl shadow-md w-full mx-auto transition-transform duration-200 hover:scale-105">
              <div className="flex flex-col lg:flex-row items-start justify-between">
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 border-2 border-main-orange rounded-full flex items-center justify-center">
                    <Box stroke="#F36E21" size={24} />
                  </div>
                  <div>
                    <p className="text-main-black opacity-60 text-sm">Order Number</p>
                    <p className="text-lg text-main-black font-normal">{order.number}</p>
                  </div>
                </div>
                
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${order.color}`}>
                  ● {order.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-main-black opacity-60 text-sm">Order Cost</p>
                  <p className="text-lg text-main-black font-normal">${order.cost}</p>
                </div>
                <div>
                  <p className="text-main-black opacity-60 text-sm">Payment Method</p>
                  <p className="text-lg text-main-black font-normal">{order.method}</p>
                </div>
              </div>

              <button className="text-main-orange font-normal mt-4 flex items-center hover:underline transition-colors duration-200">
                View Details &raquo;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
