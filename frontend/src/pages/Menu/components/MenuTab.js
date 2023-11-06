//import { Swiper, SwiperSlide } from 'swiper/react';
//import { Navigation } from 'swiper';
//import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const tabClassName =
	'flex-1 text-center text-black capitalize text-sm md:text-base cursor-pointer relative font-semibold';
const tabActiveClassName = 'text-red-500 border-b-2 border-b-red-500 bg-dark-red ';

export default function MenuTabs({ categories, categorySelected }) {
	return (
		<div className="bg-gray top-0 z-10 border-b-2 border-b-white ">
			<div className="max-w-xl mx-auto">
				<ul className="flex overflow-auto">
				{categories.map((item) => (
					<li
					key={item._id}
					className={
						`${tabClassName} ` +
						(item.title === categorySelected ? tabActiveClassName : "")
					}
					>
					<Link
						to={`/menu/${item.title}`}
						className="py-3 px-4 inline-block"
					>
						{item.title}
					</Link>
					</li>
				))}
				</ul>
      		</div>
		</div>
	);
}
