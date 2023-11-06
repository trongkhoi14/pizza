import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
	const { t } = useTranslation();
	return (
		<section className="flex items-center min-h-screen p-16 bg-gray-100 text-gray-100">
			<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
				<div className="max-w-md text-center">
					<h2 className="mb-8 font-extrabold text-9xl first-line text-red-700">
						<span className="sr-only">Error</span>404
					</h2>
					<p className="text-2xl font-semibold text-black mb-8">{t("content.not-found")}</p>
					<Link to="/" className="px-6 py-3 font-semibold rounded bg-red-800 text-white ">
						{t("content.home")}
					</Link>
				</div>
			</div>
		</section>
	);
}
