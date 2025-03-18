import { useState } from "react";
import { ChevronLeft, Send, User, Headphones } from "lucide-react";
import Input from "../../../components/ui/Input";

export default function ChatMessages({ selectedChat, onBack }) {
  const [messages, setMessages] = useState(selectedChat.messages);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-3">
        <button onClick={onBack} className="p-2">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:max-h-[650px] max-h-[450px] ">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start my-8 ${msg.sender === "user" ? "justify-end " : "justify-start"}`}>
            {msg.sender === "agent" && (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 shadow border border-orange-400">
                <Headphones stroke="#F36E21" size={24} />
              </div>
            )}
            <div className={`max-w-[75%] p-3 rounded-lg text-sm bg-white shadow ${msg.sender === "user" ? "text-right text-black mr-2" : "text-left text-black ml-2"}`}>
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 shadow border border-gray-400">
                <User />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center w-full px-4 py-2 bg-white  rounded-xl">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1"
          classNameInput="w-full px-4 py-3 text-sm outline-none bg-gray-100 border border-orange-200 rounded-xl"
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white rounded-xl w-[60px] h-[45px] flex items-center justify-center ml-2 hover:bg-orange-600 transition-all"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
}
