import React from 'react';
import { MdDeliveryDining } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
export default function HeaderCart() {
	return (
		<div className="flex justify-between items-center">
			<div className="relative ">
				<AiOutlineShoppingCart className="text-3xl" />
				<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-dark-red rounded-full -top-2 -right-4">
					20
				</div>
			</div>
		</div>
	);
}
