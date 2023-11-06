import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
	responsive: true,
	cutoutPercentage: 90,
	maintainAspectRatio: false,
	layout: {
		padding: {
			bottom:20
		}
	},
	plugins: {
		legend: {
			position: "bottom",
			labels: {
				usePointStyle: true,
			},
		},
	},
};
export default function DoughnutChart({ data, height }) {
	return <Doughnut data={data} options={options} height={height} />;
}
