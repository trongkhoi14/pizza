import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosAdmin from "../../../../api/axiosAdmin";
import OrderAssignModal from "./components/OrderAssignModal";
import OrderModal from "./components/OrderModal";
import OrderTable from "./components/OrderTable";

export default function AdminOrder() {
	const [orderList, setOrderList] = useState([]);
	const [staffList, setStaffList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState(null);
	const [openDetailsModal, setOpenDetailsModal] = useState(false);
	const [openAssignModal, setOpenAssignModal] = useState(false);
	const { info } = useSelector((state) => state.employee);

	const handleOpenModal = (callback) => (data) => {
		callback(true);
		setOrder(data);
	};

	const handleCloseModal = (callback) => () => {
		callback(false);
		setOrder(null);
	};

	const handleAssignToStaff = async (staff) => {
		try {
			const { data } = await axiosAdmin.put("api/v1/order/assign/" + order._id, {
				eid: staff._id,
			});
			toast.success(data);
			const newOrderList = orderList.map((o) => {
				if (o._id === order._id) return { ...o, shippedBy: staff };
				return o;
			});
			setOrderList(newOrderList);
		} catch (error) {
			toast.error(error.msg);
		}
	};

	const handleUpdateOrderStatus = async (status, orderId) => {
		try {
			const apiURL = (info.role === "staff" ? "api/v1/order/staff/" : "api/v1/order/") + orderId;
			const res = await axiosAdmin.put(apiURL, { status });
			if(res.status){
				toast.success(res.data);
				let newOrderList = orderList;
				// if (info.role === "staff" && status === "delivered") {
				// 	newOrderList = newOrderList.filter((o) => o._id !== orderId);
				// } else {
					newOrderList = newOrderList.map((o) => {
						if (o._id === orderId) return { ...o, status };
						return o;
					});
				// }
				setOrderList(newOrderList);
			}else{
				toast.error(res.data);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const requestOrder = axiosAdmin.get(
					"api/v1/order" + (info.role === "staff" ? "/staff" : ""),
				);
				const requestStaff =
					info.role === "staff" ? null : axiosAdmin.get(`api/v1/employee/staff`);
				const res = await Promise.all([requestOrder, requestStaff]);
				setOrderList(res[0].data);
				res[1] && setStaffList(res[1].data);
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
				<h2 className="text-xl font-semibold capitalize">orders</h2>
			</div>
			<OrderTable
				data={orderList}
				loading={loading}
				role={info.role}
				handleDetailsBtnClick={handleOpenModal(setOpenDetailsModal)}
				handleAssignBtnClick={handleOpenModal(setOpenAssignModal)}
				handleOrderStatusChange={handleUpdateOrderStatus}
			/>

			<OrderModal
				visible={openDetailsModal}
				order={order}
				onClose={handleCloseModal(setOpenDetailsModal)}
				updateOrderStatus={handleUpdateOrderStatus}
			/>

			<OrderAssignModal
				handleAssign={handleAssignToStaff}
				staffList={staffList}
				visible={openAssignModal}
				order={order}
				onClose={handleCloseModal(setOpenAssignModal)}
			/>
		</div>
	);
}
