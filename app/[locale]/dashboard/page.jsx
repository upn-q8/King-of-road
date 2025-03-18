"use client";
import { Calendar1 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axios/axiosInstance";
import { saveAs } from "file-saver";

function Page() {
  const t = useTranslations("homeDashboard");

  const startYear = 2025;
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const [data, setData] = useState({});
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(years[years?.length - 1]);

  const getData = async () => {
    try {
      const query = month
        ? `?month=${month}${year ? "&year=" + year : ""}`
        : year
        ? `?year=${year}${month ? "&month=" + month : ""}`
        : "";
      const res = await axiosInstance.get("dashboard/statistics" + query);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExcelExport = async () => {
    try {
      const res = await axiosInstance.get("dashboard/statistics/excel-export", {
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "statistics.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [month, year]);

  return (
    <div>
      <div className="mt-5 container mx-auto p-4">
        <div className="bg-white rounded-md shadow-md p-3 flex items-center flex-wrap gap-9">
          <Card>
            <div className="flex items-center text-[#F36E21] gap-1">
              <Calendar1 className="text" />
              <select
                name=""
                onChange={(e) => setYear(e.target.value)}
                style={{ color: "#F36E21" }}
                className="bg-transparent text"
                id=""
              >
                <option hidden className="text-[#F36E21]">
                  {t("last-year")}
                </option>
                {years?.map((item, i) => (
                  <option key={i} value={item} className="">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </Card>
          <Card>
            <div className="flex items-center text-[#F36E21] gap-1">
              <Calendar1 className="text" />
              <select
                onChange={(e) => setMonth(e.target.value)}
                name=""
                className="bg-transparent text"
                id=""
              >
                <option hidden className="">
                  {t("last-month")}
                </option>
                {Array.from({ length: 12 })?.map((_, i) => (
                  <option key={i} value={i + 1} className="">
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </Card>
          <Card onClick={handleExcelExport}>
            <div className="flex items-center gap-4 text-[#2A2A2A]">
              <img src="/dashboard/icon/csv.png" width={25} alt="" />
              {t("export-file")} Excel
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 mt-5">
          <div className="xl:col-span-1 col-span-2 grid md:grid-cols-2 gap-2">
            <div className="max-md:w-full">
              <h1 className="mb-5 text-2xl">{t("order-statistics")}</h1>
              <AnalystCard
                title={data?.completed_Orders}
                description={t("completed-orders")}
                icon={"/true.png"}
                classNameIcon={"bg-[#EFFFEF]"}
              />
            </div>
            <div>
              <div className="mb-[52px]"></div>
              <AnalystCard
                title={data?.cancelled_Orders}
                description={t("canceled-orders")}
                icon={"/false.png"}
                classNameIcon={"bg-[#FFDCDB]"}
              />
            </div>
          </div>
          <div className="xl:col-span-1 col-span-2 grid md:grid-cols-2 gap-2">
            <div className="max-md:w-full">
              <h1 className="mb-5 text-2xl">{t("revenue-statistics")}</h1>
              <AnalystCard
                title={data?.total_Payment}
                description={t("gross-income")}
                icon={"/money.png"}
                classNameIcon={"bg-[#EFFFEF]"}
              />
            </div>
            <div>
              <div className="mb-[52px]"></div>
              <AnalystCard
                title={data?.profit}
                description={t("net-profit")}
                icon={"/$.svg"}
                classNameIcon={"bg-[#EFFFEF]"}
              />
            </div>
          </div>
        </div>

        <h1 className="mb-5 text-2xl mt-5">{t("user-statistics")}</h1>
        <AnalystCard
          title={data?.total_Users}
          description={t("number-of-users")}
          icon={"/usersBlue.png"}
          classNameIcon={"bg-[#E5F7FF]"}
        />
      </div>
    </div>
  );
}

export default Page;

const Card = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#D9D9D9] cursor-pointer border border-[#9D9BAF] p-2 px-4 rounded-full w-full md:w-fit "
    >
      {children}
    </div>
  );
};

const AnalystCard = ({ icon, classNameIcon, title, description }) => {
  return (
    <div className="bg-[#fff] p-6 px-5 rounded-md max-md:w-full xl:min-w-40 xl:max-w-64 flex items-center gap-4">
      <img
        src={"/dashboard/icon" + icon}
        className={`shadow-md rounded-full p-3 ${classNameIcon}`}
        alt=""
      />
      <div>
        <h1 className="text-2xl">{title}</h1>
        <h1 className="text-gray-400 text-xl text-nowrap">{description}</h1>
      </div>
    </div>
  );
};
