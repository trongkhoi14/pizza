import React, { useMemo, useState } from "react";
import { calculateSalePrice } from "../../../../../utils/Utils";
import { formatCurrency } from "../../../../../utils/string";
import Table, { SelectColumnFilter } from "../../Table";
import { BASE_URL } from "../../../../../utils/constant";

export default function ProductList({
  handleDeleteBtnClick = null,
  data = [],
  handleEditBtnClick = null,
  loading = false,
}) {
  const handleEdit = (item) => {
    handleEditBtnClick && handleEditBtnClick(item);
  };

  const handleDelete = (item) => {
    handleDeleteBtnClick && handleDeleteBtnClick(item);
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Tên món",
        accessor: (row) => (
          <div className="!whitespace-normal leading-normal">{row.title}</div>
        ),
      },
      ,
      {
        Header: "Hình ảnh",
        accessor: (row, i) => {
          return (
            <div className="w-20 h-20">
              <img
                src={BASE_URL + row.image}
                className="w-full h-full object-cover"
              />
            </div>
          );
        },
      },
      {
        Header: "Danh mục",
        accessor: (row, i) => {
          return row.category?.title;
        },
        Filter: SelectColumnFilter, // new
        filter: "includes",
      },
      {
        Header: "Size M",
        accessor: (row, i) => {
          const { price, sizes = [], salePercent = 0 } = row;
          const checkFoundM = sizes.find((s) => s.size.title === "m");
          if (!sizes.length) {
            return <SizeItem price={price} salePercent={salePercent} />;
          } else if (checkFoundM) {
            return (
              <SizeItem price={checkFoundM.price} salePercent={salePercent} />
            );
          }
        },
      },
      {
        Header: "Size L",
        accessor: (row, i) => {
          const { sizes = [], salePercent = 0 } = row;
          if (!sizes.length) return null;
          const sizeItem = sizes.find((i) => i.size.title === "l");
          if (!sizeItem) return null;
          return <SizeItem price={sizeItem.price} salePercent={salePercent} />;
        },
      },
      {
        Header: "Size XL",
        accessor: (row, i) => {
          const { sizes = [], salePercent = 0 } = row;
          if (!sizes.length) return null;
          const sizeItem = sizes.find((i) => i.size.title === "xl");
          if (!sizeItem) return null;
          return <SizeItem price={sizeItem.price} salePercent={salePercent} />;
        },
      },
      {
        Header: "Hành động",
        accessor: (row, i) => {
          return (
            <div>
              <button
                onClick={() => handleEdit(row, i)}
                type="button"
                className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  dark:hover:text-white  "
              >
                Chỉnh sửa
              </button>

              <button
                onClick={() => handleDelete(row, i)}
                type="button"
                className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              >
                Xoá
              </button>
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <div className="w-full">
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
    </div>
  );
}

const SizeItem = ({ salePercent, price }) => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-2">
        <span
          className={
            !!salePercent ? "price text-gray-400 line-through" : "text-red-500"
          }
        >
          {formatCurrency(price)}
        </span>
        {!!salePercent ? (
          <span className="text-red-500">
            {formatCurrency(calculateSalePrice(price, salePercent))}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
