import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import {
	Chart as ChartJS,
	BarController,
	BarElement,
	LinearScale,
	TimeScale,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Bar Chart",
		},
	},
	maintainAspectRatio: false,
};

export default function BarChart({ data }) {

	return <Bar data={data} options={options}/>;
}

