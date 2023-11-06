import React from "react";
import {
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
   TimeScale
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
   TimeScale
);

const options = {
	responsive: true,
	maintainAspectRatio: false,
	title: {
		display: false,
		text: "Line Chart",
		fontColor: "white",
	},
	scales: {
		y: {
			// display: false,
			// beginAtZero: true,
		},
		x: {
			// type: "time",
			// time: {
			// 	parser: "MM-DD-YYYY",
			// 	unit: "month",
			// },
			// display: false,
		},
	},
	plugins: {
		legend: {
			display: false,
		},
	},
};

export default function LineChart({ data, height }) {
	return <Line data={data} options={options} height={height} />;
}
