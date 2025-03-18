"use client";
import { ReactNode } from "react";

export default function LocalSwitcherSelect({ children, label }) {
  return (
    <label className={` text-gray-50 `}>
      <p className="sr-only">{label}</p>
      {children}
    </label>
  );
}
