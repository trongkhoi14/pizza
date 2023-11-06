import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosAdmin from "../../../../api/axiosAdmin";
import OrderModal from "./components/OrderModal";
import OrderTable from "./components/OrderTable";

export default function DeliveredOrders() {
	const [orderList, setOrderList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState(null);
	const [openDetailsModal, setOpenDetailsModal] = useState(false);
	const { info } = useSelector((state) => state.employee);

	const handleOpenModalDetails = (data) => {
		setOpenDetailsModal(true);
		setOrder(data);
	};

	const handleCloseModalDetails = () => {
		setOpenDetailsModal(false);
		setOrder(null);
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const { data } = await axiosAdmin.get(
					"api/v1/order" + (info.role === "staff" ? "/staff" : "?status=delivered"),
				);
				setOrderList(data);
			} catch (error) {
				toast(error.message);
			} finally {
				setLoading(false);
			}
		})();
	}, [info]);

	return (
		<div className="p-5">
			<div className="flex items-center mb-5">
				<h2 className="text-xl font-semibold capitalize">Delivered orders</h2>
			</div>

			<OrderTable
				readonly={true}
				data={orderList}
				loading={loading}
				role={info.role}
				handleDetailsBtnClick={handleOpenModalDetails}
			/>

			<OrderModal
				visible={openDetailsModal}
				order={order}
				onClose={handleCloseModalDetails}
			/>
		</div>
	);
}
