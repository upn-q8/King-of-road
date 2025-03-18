"use client";

import dynamic from "next/dynamic";

const CSR = dynamic(() => import("./components/CSR"), { ssr: false });

export default function DashboardLayout({ children }) {
  return <CSR lang="en">{children}</CSR>;
}
