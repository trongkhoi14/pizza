import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
	const { id } = useParams();

	return (
		<div className="2xl:container 2xl:mx-auto bg-gray-100">
			<div className="flex flex-col h-full lg:px-20 md:px-6 p-6">
				<div className="max-w-5xl py-6 w-full mx-auto">
					<div className="text-center space-y-2 pb-4 mb-6 border-b border-b-slate-400">
						<div className="text-xl font-bold text-gray-700">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora pariatur
							numquam modi iure labore magnam autem perferendis quaerat, sapiente, totam
							distinctio ipsum similique voluptatibus vel nesciunt maxime eos corporis
							aliquid.
						</div>
						<div className="text-sm text-gray-500 italic">
							{moment().format("DD/MM/YYYY hh:mm ")}
						</div>
					</div>

					<div className="space-y-4 text-base text-gray-600 text-justify">
						<h3 className="text-lg font-bold">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque porro nisi
							provident quae qui
						</h3>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel illum voluptates,
							ratione aliquam vero omnis provident quo soluta, recusandae ducimus deleniti
							tempore quia ut fugiat tenetur qui animi. Temporibus, numquam. Lorem, ipsum
							dolor sit amet consectetur adipisicing elit. Consequuntur rem in iusto aperiam
							officia earum. Nihil dolores dolorum itaque consectetur corporis obcaecati modi
							necessitatibus dicta sint? Officiis reprehenderit quas cupiditate?
						</p>
						<img
							src="https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/10/6.jpg"
							className="w-full"
						/>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel illum voluptates,
							ratione aliquam vero omnis provident quo soluta, recusandae ducimus deleniti
							tempore quia ut fugiat tenetur qui animi. Temporibus, numquam.
						</p>
						<h3 className="text-lg font-bold">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque porro nisi
							provident quae qui
						</h3>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel illum voluptates,
							ratione aliquam vero omnis provident quo soluta, recusandae ducimus deleniti
							tempore quia ut fugiat tenetur qui animi. Temporibus, numquam.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
