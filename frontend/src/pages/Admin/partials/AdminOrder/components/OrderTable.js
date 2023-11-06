import { useMemo } from "react";
import Select from "../../../../../components/FormFields/Select";
import { ORDER_STATUS } from "../../../../../utils/constant";
import { formatCurrency } from "../../../../../utils/string";
import Table from "../../Table";

export default function OrderTable({
  data,
  handleDetailsBtnClick = null,
  handleAssignBtnClick = null,
  handleOrderStatusChange,
  loading = false,
  role,
  readonly = false,
}) {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "ID",
        accessor: (_row, i) => {
          return (
            <span
              className={_row?.orderId.startsWith("#") ? "!normal-case" : ""}
            >
              {_row.orderId}
            </span>
          );
        },
      },
      {
        Header: "Khách hàng",
        accessor: "name",
      },
      {
        Header: "Điện thoại",
        accessor: "mobile",
      },
      {
        Header: "Tổng tiền",
        accessor: (row) => (
          <span className="text-red-400 font-bold">
            {formatCurrency(row.totalPrice)}
          </span>
        ),
      },
      {
        Header: "Trạng thái",
        accessor: (row) => {
          const filterOrderStatus =   ORDER_STATUS.filter((o) =>
          row.method.name === "takeaway" && o === "delivering"
            ? false
            : true
        )
          
        
          return readonly ? (
            row.status
          ) : (
            <Select
              value={filterOrderStatus.findIndex((i) => i === row.status)}
              options={filterOrderStatus.map((i) => ({ title: i }))}
              onChange={(index) =>
                handleOrderStatusChange(filterOrderStatus[index], row._id)
              }
            />
          );
        },
      },
      {
        Header: "Hành động",
        accessor: (row, i) => {
          return (
            <div>
              <button
                onClick={() => handleDetailsBtnClick(row)}
                type="button"
                className="text-sky-600 hover:text-white border border-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  dark:hover:text-white  "
              >
                Chi tiết
              </button>
              {role !== "staff" && !readonly && (
                <button
                  onClick={() => handleAssignBtnClick(row)}
                  type="button"
                  className="text-purple-600 hover:text-white border border-purple-400 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  dark:hover:text-white  "
                >
                  Phân công
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [data]
  );
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div
            className=" text-sky-500 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </>
  );
}
