import React from "react";
import { useTranslations } from "next-intl";
import { Eye } from "lucide-react";
import Table from "../../../components/ui/Table";
import { Link } from "../../../../../../navigation";

function TableUser({ data, userId }) {
  const t = useTranslations("");

  return (
    <Table
      header={[
        "",
        t("tables-title.request-code"),
        t("tables-title.payment-method"),
        t("tables-title.order-cost"),
        "",
        "",
      ]}
    >
      {data?.map((item, i) => (
        <tr key={i} className="text-center">
          <td
            className={`py-2.5 ${
              i % 2 == 0 && "bg-[#D9D9D9]/20"
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
            className={`py-2.5 ${i % 2 == 0 && "bg-[#D9D9D9]/20"} text-nowrap`}
          >
            {item?.id}
          </td>
          <td
            className={`py-2.5 ${i % 2 == 0 && "bg-[#D9D9D9]/20"} text-nowrap`}
            dir="ltr"
          >
            {item?.payment_Method}
          </td>
          <td
            className={`py-2.5 ${i % 2 == 0 && "bg-[#D9D9D9]/20"} text-nowrap`}
          >
            {item?.amount} {t("KWD")}
          </td>
          <td
            colSpan={2}
            className={`py-2.5 ${i % 2 == 0 && "bg-[#D9D9D9]/20"}`}
          >
            <div className="flex gap-3 justify-center items-center">
              <Link href={"/dashboard/users/" + userId + "/" + item?.id}>
                <Eye className="text-[#F36E21]" />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
}

export default TableUser;
