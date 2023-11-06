import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TbCategory, TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineStorefront } from "react-icons/md";
import { RxRulerSquare } from "react-icons/rx";
import { FaPizzaSlice, FaClipboardList } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { MdOutlineSupportAgent, MdOutlineTask } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

const NAV_LINKS = [
	{
		title: "Dashboard",
		icon: <AiFillDashboard size={20} />,
		path: "/admin",
	},
	{
		title: "Product Management",
		icon: <FaPizzaSlice size={20} />,
		path: "/admin/product",
		roles: ["manager", "admin"],
	},
	{
		title: "Category Management",
		icon: <TbCategory size={20} />,
		path: "/admin/category",
		roles: ["manager", "admin"],
	},
	{
		title: "Size Management",
		icon: <RxRulerSquare size={20} />,
		path: "/admin/size",
		roles: ["manager", "admin"],
	},
	{
		title: "Order Management",
		icon: <FaClipboardList size={20} />,
		path: "/admin/order",
	},
	{
		title: "Delivered Orders",
		icon: <MdOutlineTask size={20} />,
		path: "/admin/delivered_orders",
		roles: ["manager", "admin"],
	},
	{
		title: "Staff Management",
		icon: <MdOutlineSupportAgent size={20} />,
		path: "/admin/employee/staff",
		roles: ["manager", "admin"],
	},
	{
		title: "Manager Management",
		icon: <GrUserManager size={20} className="manager-icon" stroke="" />,
		path: "/admin/employee/manager",
		roles: ["admin"],
	},
	{
		title: "Store Management",
		icon: <MdOutlineStorefront size={20} />,
		path: "/admin/store",
		roles: ["admin"],
	},
];

function Sidebar({ sidebarOpen, setSidebarOpen, role }) {
	const location = useLocation();

	const trigger = useRef(null);
	const sidebar = useRef(null);

	const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
				return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	useEffect(() => {
		localStorage.setItem("sidebar-expanded", sidebarExpanded);
		if (sidebarExpanded) {
			document.querySelector("body").classList.add("sidebar-expanded");
		} else {
			document.querySelector("body").classList.remove("sidebar-expanded");
		}
	}, [sidebarExpanded]);

	return (
		<div>
			{/* Sidebar backdrop (mobile only) */}
			<div
				className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				aria-hidden="true"
			></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
					sidebarOpen ? "translate-x-0" : "-translate-x-64"
				}`}
			>
				{/* Sidebar header */}
				<div className="flex justify-between mb-10 pr-3 sm:px-2">
					{/* Close button */}
					<button
						ref={trigger}
						className="lg:hidden text-slate-500 hover:text-slate-400"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						aria-expanded={sidebarOpen}
					>
						<span className="sr-only">Close sidebar</span>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<NavLink end to="/admin" className="block">
						<h1 className="text-white font-bold text-3xl">Kin Pizza</h1>
					</NavLink>
				</div>

				{/* Links */}
				<div className="space-y-8">
					{/* Pages group */}
					<div>
						<h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
							<span
								className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
								aria-hidden="true"
							>
								•••
							</span>
							<span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
						</h3>
						<ul className="mt-3">
							{NAV_LINKS.map((item, index) =>
								!item.roles || item.roles.includes(role) ? (
									<li key={index} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 `}>
										<NavLink
											end
											to={item.path}
											className={`block text-slate-200 truncate transition duration-150`}
										>
											<div className="flex items-center justify-between">
												<div className="grow flex items-center">
													{item.icon}
													<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
														{item.title}
													</span>
												</div>
											</div>
										</NavLink>
									</li>
								) : null,
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
