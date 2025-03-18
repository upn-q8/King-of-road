import { useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  SlidersHorizontalIcon,
} from "lucide-react";
import ChatMessages from "./ChatMessages";

const messages = [
  {
    id: 1,
    name: "John Doe",
    message: "Hi, do you have front suspension parts?",
    date: "12/3/2024",
    messages: [
      {
        id: 1,
        text: "Hi, do you have front suspension parts?",
        sender: "user",
      },
      {
        id: 2,
        text: "Yes, it's available. Do you need details?",
        sender: "agent",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Smith",
    message: "How much is the battery for a 2020 Honda Civic?",
    date: "14/3/2024",
    messages: [
      {
        id: 1,
        text: "How much is the battery for a 2020 Honda Civic?",
        sender: "user",
      },
      { id: 2, text: "The original battery costs $150.", sender: "agent" },
    ],
  },
];

export default function TableMessage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChat, setSelectedChat] = useState(null);
  const itemsPerPage = 7;

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const displayedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (selectedChat) {
    return (
      <ChatMessages
        selectedChat={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <div className="mt-4 md:max-h-[650px] max-h-[450px] overflow-y-auto">
      {displayedMessages.map((msg, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          onClick={() => setSelectedChat(msg)}
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#F36E21] text-white w-10 h-10 flex justify-center items-center rounded-full text-lg font-bold">
              {msg.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{msg.name}</h3>
              <p className="text-gray-500 text-sm truncate w-[400px]">
                {msg.message}
              </p>
            </div>
          </div>
          <span className="text-sm text-[#F36E21]">{msg.date}</span>
        </div>
      ))}
    </div>
  );
}
