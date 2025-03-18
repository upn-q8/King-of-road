import React, { useContext, useEffect, useState } from "react";
import Table from "../../dashboard/components/ui/Table";
import axiosInstance from "../../components/axios/axiosInstance";
import { useTranslations } from "next-intl";
import AppContext from "../../contexts";

function OrdersTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AppContext);

  const getData = async () => {
    try {
      setLoading(false);
      const res = await axiosInstance.get("orders", {
        headers: { Authorization: "Bearer " + token },
      });
      setLoading(true);
      setData(res?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  const t = useTranslations("");

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-[80vh]">
      {data?.length > 1 ? (
        <Table
          header={[
            "",
            t("tables-title.username"),
            t("tables-title.phone"),
            t("tables-title.price"),
            t("tables-title.payment-method"),
            t("tables-title.status"),
            "",
          ]}
        >
          {data?.map((item, i) => (
            <tr key={i} className="text-center">
              <td
                className={`py-1.5 ${
                  i % 2 == 0 && "bg-[#D9D9D9]/50"
                } px-2 border-l`}
              >
                <input
                  type="checkbox"
                  className="block mx-auto w-fit"
                  name=""
                  id=""
                />
              </td>
              <td
                className={`py-1.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
              >
                {item?.user_Name}
              </td>
              <td
                className={`py-1.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
                dir="ltr"
              >
                {item?.user_PhoneNumber}
              </td>
              <td
                className={`py-1.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
              >
                {item?.total_Amount} {t("KWD")}{" "}
              </td>
              <td
                className={`py-1.5 min-w-32 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}
              >
                {/* {item?.pay} */}
                كاش عند التسليم
              </td>
              <td className={`py-1.5 ${i % 2 == 0 && "bg-[#D9D9D9]/50"}`}>
                {item?.status_En == "Pending" && (
                  <Status
                    bg="#D3D3D3"
                    color={"#B4B4B4"}
                    text={"قيد الانتظار"}
                  />
                )}
                {item?.status_En == "Completed" && (
                  <Status
                    bg="#00640070"
                    color={"#006400"}
                    text={"تم التسليم"}
                  />
                )}
                {item?.status_En == "Process" && (
                  <Status
                    bg="#ffa5006b"
                    color={"#FFA500"}
                    text={"قيد التسليم"}
                  />
                )}
                {item?.status_En == "Cancelled" && (
                  <Status bg="#ff45008c" color={"#FF0000"} text={"ملغي"} />
                )}
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        loading && (
          <div className="flex items-center min-h-96 justify-center">
            <div className="text text-2xl font-semibold">لا يوجد طلبات</div>
          </div>
        )
      )}
    </div>
  );
}

export default OrdersTable;

const Status = ({ color, onClick, bg, text }) => {
  return (
    <div
      className={`flex w-32 mx-auto items-center gap-3 p-2 px-4 rounded-full`}
      onClick={onClick}
      style={{ background: bg }}
    >
      <div
        style={{ background: color }}
        className={` rounded-full w-2.5 h-2.5`}
      ></div>
      <p style={{ color: color }}>{text}</p>
    </div>
  );
};
