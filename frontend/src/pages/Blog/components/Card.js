import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function Card({ article }) {
	return (
		<div className="shadow-md rounded-xl  bg-white w-full flex flex-col">
			<div className="rounded-t-xl overflow-hidden group sm:h-52 h-36 w-full">
				<img
					src={article.image}
					alt={article.title}
					className="rounded-t-md group-hover:scale-125 duration-500 object-cover object-center sm:object-cover w-full h-full"
				/>
			</div>
			<div className="flex flex-col grow p-4 rounded-b-xl overflow-hidden">
				<div className="mb-auto">
					<h3 className="leading-snug font-bold capitalize line-clamp-3">
						{article.title}
					</h3>
					<div className="mt-1.5 text-sm text-gray-500 italic">
						{moment().format("DD/MM/YYYY hh:mm ")}
					</div>
					{article.description ? (
						<div className="mt-2 text-sm text-gray-500 line-clamp-2 mb-3">
							<p>{article.description}</p>
						</div>
					) : null}
				</div>
				<div className="mt-2 ">
					<Link to={article.slug} className="mt-auto">
						<div className="inline-block py-2 px-6 rounded-full bg-light-blue hover:bg-light-blue/70 text-base text-white font-bold">
							Chi tiết
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
