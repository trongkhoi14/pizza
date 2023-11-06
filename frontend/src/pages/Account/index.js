import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Account() {
	return (
		<>
			<div className="2xl:container 2xl:mx-auto bg-gray-100">
				<div className="flex flex-col md:flex-row h-full lg:px-20 md:px-6 p-6">
					<Sidebar />
					<div className="w-full md:w-9/12 p-4">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
