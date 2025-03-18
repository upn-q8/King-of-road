"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TableService from "../components/TableService";

export default function ServiceDetails() {
  const pathname = usePathname(); 
  const id = pathname.split("/").pop(); 

  if (!id) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-orange-600 capitalize">{id.replace("-", " ")} Details</h1>
      <TableService serviceId={id} />
    </div>
  );
}
