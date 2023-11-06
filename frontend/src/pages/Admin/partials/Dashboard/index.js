import React, { useCallback, useEffect, useMemo, useState } from "react";
import axiosAdmin from "../../../../api/axiosAdmin";
import { MdOutlinePendingActions, MdOutlineDoneOutline } from "react-icons/md";
import { ORDER_STATUS } from "../../../../utils/constant";
import { useSelector } from "react-redux";
import Card from "./components/Card";
import LineChart from "../Charts/LineChart";
import { hexToRGB, tailwindConfig } from "../../../../utils/Utils";
import DoughnutChart from "../Charts/DoughnutChart";
import BarChart from "../Charts/BarChart";

const lineChartData = {
	labels: ["January", "February", "March", "April"],
	datasets: [
		{
			label: "Sales",
			data: [65, 59, 80, 81],
			borderColor: tailwindConfig().theme.colors.indigo[400],
			backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
			fill: true,
		},
	],
};

const doughnutChartData = {
	labels: ["Pizza", "Drink", "Salad"],
	datasets: [
		{
			label: "Top Categories",
			data: [30, 30, 40],
			borderWidth: 1,
			backgroundColor: [
				tailwindConfig().theme.colors.orange[400],
				tailwindConfig().theme.colors.sky[400],
				tailwindConfig().theme.colors.green[400],
			],
			hoverBackgroundColor: [
				tailwindConfig().theme.colors.orange[600],
				tailwindConfig().theme.colors.sky[600],
				tailwindConfig().theme.colors.green[600],
			],
			hoverBorderColor: tailwindConfig().theme.colors.white,
		},
	],
};

const barChartData = {
	labels: ["January", "February", "March", "April"],
	datasets: [
		{
			label: "Sales",
			data: [65, 59, 80, 81],
			backgroundColor: "rgba(255, 99, 132, 0.5)",
			barPercentage: 0.5,
			categoryPercentage: 0.5,
		},
		{
			label: "Refund",
			data: [11, 29, 0, 5],
			backgroundColor: "rgba(53, 162, 235, 0.5)",
			barPercentage: 0.5,
			categoryPercentage: 0.5,
		},
	],
};

export default function Dashboard() {
	const { info } = useSelector((state) => state.employee);
	const [orderCounts, setOrderCounts] = useState(
		ORDER_STATUS.reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {}),
	);

	const countOrdersByStatus = useCallback((value) => {
		return axiosAdmin
			.get("api/v1/order/count?status=" + value)
			.then(({ status, data }) => ({ [value]: data }));
	});

	useEffect(() => {
		if (info.role === "staff") return;
		(async () => {
			const countResponses = await Promise.all(ORDER_STATUS.map(countOrdersByStatus));
			const counts = countResponses.reduce((prev, curr) => ({ ...prev, ...curr }), {});
			setOrderCounts(counts);
		})();
	}, [info]);

	return (
		<div className="p-5">
			<div className="flex items-center mb-5">
				<h2 className="text-xl font-bold capitalize">Dashboard</h2>
			</div>
			{info.role !== "staff" && (
				<div className="">
					{/* COUNT ORDER STATUS */}
					<div className="flex -mx-4">
						<Card className="w-1/2 md:w-1/4">
							<div className="flex items-center">
								<div className="bg-green-500 w-12 h-12 p-2 rounded-full text-white flex items-center">
									<MdOutlineDoneOutline size={30} />
								</div>
								<div className="ml-4">
									<div className="uppercase text-xs opacity-80">Đã giao</div>
									<div className="mt-1.5 text-2xl font-bold">
										{orderCounts["delivered"]}
									</div>
								</div>
							</div>
						</Card>
						<Card className="w-1/2 md:w-1/4">
							<div className="flex items-center">
								<div className="bg-orange-500 w-12 h-12 p-2 rounded-full text-white flex items-center">
									<MdOutlinePendingActions size={30} />
								</div>
								<div className="ml-4">
									<div className="uppercase text-xs opacity-80">Đang xử lý</div>
									<div className="mt-1.5 text-2xl font-bold">
										{orderCounts["pending"] +
											orderCounts["preparing"] +
											orderCounts["delivering"]}
									</div>
								</div>
							</div>
						</Card>
					</div>

					{/* CHARTS */}
					<div className="flex flex-wrap -mx-4">
						<Card title={"Line Chart"} className="w-full md:w-2/3 h-96">
							<LineChart data={lineChartData} />
						</Card>
						<Card title={"Doughnut Chart"} className="w-full md:w-1/3">
							<DoughnutChart data={doughnutChartData} />
						</Card>
						<Card title={"Bar Chart"} className="w-full h-96">
							<BarChart data={barChartData} />
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}
