import { Send, User, Headphones, MessageCircle } from "lucide-react";
import { useState } from "react";
import Input from "../../components/ui/Input";
import { Button } from "@headlessui/react";

export default function Chat() {
  const [messages, setMessages] = useState([
    // { id: 1, text: "Hi, Do You Have A Front Suspension Part For A 2018 Toyota Corolla", sender: "user" },
    // { id: 2, text: "Hello! Yes, It's Available. Do You Need Details?", sender: "agent" },
    // { id: 3, text: "Is It Original Or Aftermarket? What's The Price?", sender: "user" },
    // { id: 4, text: "The Original Part Costs $250 With A 1-Year Warranty. A High-Quality Aftermarket Option Is $180.", sender: "agent" },
    // { id: 5, text: "Great! Do You Ship To Riyadh?", sender: "user" },
    // { id: 6, text: "Yes, Delivery Takes 2-3 Business Days.", sender: "agent" },
  ]);

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-xl mb-6 text-main-black self-start px-8">Chat Archive</h1>

   
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          {/* <MessageCircle size={80} strokeWidth={1.5} className="text-orange-500 mb-4" /> */}
          <img src="../no-mail.png" className="w-32"/>
          <p className="text-lg font-medium">Your message archive is blank</p>
          <Button
                    type="submit"
                    className={"mx-auto  w-full btn rounded-md p-2 block mt-10"}
                  >
                    Start a chat now!
                  </Button>
        </div>
      ) : (
        <div className="w-full p-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              
              {msg.sender === "agent" && (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 shadow">
                  <Headphones stroke="#F36E21" size={24} />
                </div>
              )}

              <div className={`max-w-[75%] p-3 rounded-lg text-sm bg-white shadow ${msg.sender === "user" ? "text-right text-black mr-2" : "text-left text-black ml-2"}`}>
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 shadow">
                  <User />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    
      <div className="flex items-center w-full px-4 py-2 mt-4 bg-white shadow-lg rounded-xl">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1"
          classNameInput="w-full px-4 py-3 text-sm outline-none bg-gray-100 border border-gray-300 rounded-xl"
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
