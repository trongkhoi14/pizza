import React, { useEffect, useMemo, useState } from "react";
import Table from "../../Table";

export default function EmployeeTable({ data = [], loading = false }) {
	const columns = useMemo(
		() => [
			{
				Header: "#",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Họ tên",
				accessor: "name",
			},
			{
				Header: "Số điện thoại",
				accessor: "mobile",
			},
			{
				Header: "Email",
				accessor: (row, i) => {
					return <div className="!normal-case">{row.email}</div>;
				},
			},
			{
				Header: "Người thêm",
				accessor: (row, i) => {
					return <div className="text-red-500">{row.createdBy?.name}</div>;
				},
			},
			{
				Header: "Hành động",
				accessor: (row, i) => {
					return (
						<div>
							<button
								// onClick={() => handleEdit(row)}
								type="button"
								className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  dark:hover:text-white  "
							>
								Chỉnh sửa
							</button>

							<button
								// onClick={() => handleDelete(row)}
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
		[],
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
