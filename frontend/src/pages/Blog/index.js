import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ARTICLE_LIST } from "../../utils/constant";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import Card from "./components/Card";
const data = [
	{
		_id: 1,
		title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga quas aliquam ducimus, modi exercitationem, fugiat enim magnam dolore quia vitae rem! Nobis repellat quidem quibusdam et illo, quaerat eaque ipsam.",
		description:
			"  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga quas aliquam ducimus, modi exercitationem, fugiat enim magnam dolore quia vitae rem! Nobis repellat quidem quibusdam et illo, quaerat eaque ipsam.",
		image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		slug:'lorem-ipsum-dolor-sit'
	},
	{
		_id: 1,
		title: "Lorem ipsum dolor sit amet consectetur.",
		description:
			"  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga quas aliquam ducimus, modi exercitationem, fugiat enim magnam dolore quia vitae rem! Nobis",
		image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		slug:'lorem-ipsum-dolor-sit'
	},
];

export default function Blog() {
	const { article } = useParams();
	const [loading, setLoading] = useState(false);

	useEffect(() => {}, [article]);

	return (
		<div className="2xl:container 2xl:mx-auto bg-gray-100">
			<div className="flex flex-col h-full lg:px-20 md:px-6 p-6">
				{/* Tabs */}
				<div className="shadow-md border border-slate-200 bg-white">
					<div className="flex overflow-auto text-sm font-gray-600 font-semibold uppercase">
						{ARTICLE_LIST.map((item, index) => (
							<Link
								key={index}
								to={`/articles/${item}`}
								className={
									"inline-block py-3 px-4 flex-1 text-center relative " +
									(item === article
										? "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[10%] after:h-0.5 after:bg-light-blue after:rounded-full "
										: "")
								}
							>
								{item}
							</Link>
						))}
					</div>
				</div>

				{/* List */}
				<div className="flex flex-wrap mt-6 -mx-2.5">
					{loading
						? new Array(9).fill(0).map((_, i) => {
								return;
								{
									/* <div key={i} className="p-1.5 w-1/2 md:w-1/3 lg:w-1/4">
										<CardSkeleton />
									</div>  */
								}
						  })
						: [...data, ...data].map((item) => (
								<div className="p-2.5 w-1/2 md:w-1/3 lg:w-1/4 flex" key={item._id}>
									<Card article={item}/>
								</div>
						  ))}
				</div>

				{/* button load more */}
				<div className="self-center flex justify-center items-center text-lg text-light-blue font-bold mt-4 space-x-2">
					<div>Xem thêm</div>
					<HiOutlineChevronDoubleDown size={24} className={'animate-bounce'}/>
				</div>
			</div>
		</div>
	);
}
