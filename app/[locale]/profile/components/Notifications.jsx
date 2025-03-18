import { Bell, Inbox } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Notification Archive",
      message:
        "Dear User, Your Listing Has Been Reviewed And Is Now Live On Our Website. We Wish You Success In Selling Your Car 🚗! If You Have Any Questions, Feel Free To Contact Us.",
      date: "12/3/2024",
    },
    {
      id: 2,
      title: "Notification Archive",
      message:
        "Dear User, Your Listing Has Been Reviewed And Is Now Live On Our Website. We Wish You Success In Selling Your Car 🚗! If You Have Any Questions, Feel Free To Contact Us.",
      date: "12/3/2024",
    },
    {
      id: 3,
      title: "Notification Archive",
      message:
        "Dear User, Your Listing Has Been Reviewed And Is Now Live On Our Website. We Wish You Success In Selling Your Car 🚗! If You Have Any Questions, Feel Free To Contact Us.",
      date: "12/3/2024",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      <h1 className="text-xl font-normal text-gray-800 self-start mb-4">
        Notification Archive
      </h1>

    
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          {/* <Inbox size={80} strokeWidth={1.5} className="text-orange-500 mb-4" /> */}
          
          <img src="../no-archive.png" className="w-32 "/>

          <p className="text-lg font-medium">Your Notification Archive Is Empty</p>
        </div>
      ) : (
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-4 divide-y">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-6 transition-all hover:bg-gray-50">
              <div className="flex items-start sm:items-center gap-3">
                <div className="md:min-w-16 min-w-10 max-w-16 h-10 flex items-center justify-center rounded-full bg-white border border-orange-400">
                  <Bell stroke="#F36E21" size={22} />
                </div>
                <div>
                  <h2 className="text-base font-normal text-gray-800">{notif.title}</h2>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                </div>
              </div>

              <span className="text-sm text-gray-500 sm:self-start sm:ml-auto">
                {notif.date}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
