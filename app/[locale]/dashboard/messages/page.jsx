"use client";
import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontalIcon } from "lucide-react";
import TableMessage from "./components/TableMessage";
import axiosInstance from "../../components/axios/axiosInstance";
import SearchBar from "../components/ui/SearchBar";

function Page() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [startSearch, setStartSearch] = useState(false);

  const getMessages = async () => {
    try {
      const query = search ? `?query=${search}` : "";
      const res = await axiosInstance.get(`/messages${query}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [startSearch]);

  return (
    <div className="p-5">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="p-3 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="relative">
                <img
                  src="/new-email.svg"
                  className="w-6 h-6"
                  alt="Email Icon"
                />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </span>
              Messages
            </h2>

            <SearchBar classNameInput="xl:w-96" />
          </div>

          {/* Table */}
          <TableMessage data={messages} />
        </div>
      </div>
    </div>
  );
}

export default Page;
