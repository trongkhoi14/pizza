import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	const { t } = useTranslation();

	const navLinks = useMemo(
		() => [
			{
				title: t("content.profile"),
				path: "/account/profile",
			},
			{
				title: t("content.order-history"),
				path: "/account/order_history",
			},
			{
				title: t("content.change-password"),
				path: "/account/change-password",
			},
		],
		[t],
	);

	return (
		<div className="w-full md:w-3/12 p-4 h-full">
			{navLinks.map((item, index) => (
				<NavLink
					key={index}
					to={item.path}
					className={({ isActive }) =>
						"block text-dark-brown py-2 px-3 hover:bg-gray-200 rounded-md after:content-[''] after:absolute after:top-0 after:left-0 after:w-1 after:h-full after:bg-light-blue after:rounded-full " +
						(isActive ? "relative bg-gray-200" : "")
					}
				>
					{item.title}
				</NavLink>
			))}
		</div>
	);
}
