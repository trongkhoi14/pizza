import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import BtnCancel from "../../../../../components/FormFields/BtnCancel";
import BtnSubmit from "../../../../../components/FormFields/BtnSubmit";
import ModalContainer from "../../../../../components/Modal/ModalContainer";

export default function OrderAssignModal({
	visible = false,
	onClose,
	order,
	staffList = [],
	handleAssign = null,
}) {
	const [search, setSearch] = useState("");
	const [staffSelect, setStaffSelect] = useState(null);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const handleStaffSelectChange = (staff) => {
		setStaffSelect(staff);
	};

	const handleSubmit = () => {
		if (!staffSelect) toast.error("Vui lòng chọn một nhân viên");
		else
			handleAssign({
				_id: staffSelect._id,
				name: staffSelect.name,
				mobile: staffSelect.mobile,
			});
	};

	const filterStaff = useMemo(() => {
		return search
			? staffList.filter(
					(staff) =>
						staff.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
						staff.mobile.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
			  )
			: staffList;
	}, [search, staffList]);

	return (
		<ModalContainer ignoreContainer onClose={onClose} visible={visible}>
			<div className="bg-white rounded max-w-xl w-full p-4 mx-8 h-[80vh] relative">
				<div className="flex flex-col h-full">
					<div className="p-2">
						<h3 className="flex text-lg font-semibold leading-6 text-gray-900 mb-2">
							Phân công đơn hàng
							<span className="ml-auto font-bold ">{order?.orderId}</span>
						</h3>
					</div>
					<div className="">
						<input
							type="text"
							className="border-[1px] shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2"
							placeholder="Nhập số điện thoại hoặc họ tên để tìm kiếm"
							value={search}
							onChange={handleSearchChange}
						/>
					</div>
					<div className="flex-1 h-full overflow-y-auto ">
						<div className="divide-y-2 my-6 border-b-2 border-t-2">
							{filterStaff.map((staff, index) => (
								<label className="block" key={index}>
									<input
										type="radio"
										className="hidden peer"
										name="staff"
										onChange={() => handleStaffSelectChange(staff)}
										checked={staffSelect ?  staffSelect._id === staff._id : order?.shippedBy?._id === staff._id }
									/>
									<div className="space-y-2 p-3 space-x-1 hover:bg-slate-200 cursor-pointer peer-checked:bg-slate-200">
										<span>{staff.name}</span> <span>-</span> <span>{staff.mobile}</span>
									</div>
								</label>
							))}
						</div>
					</div>
					<div className="sticky bottom-0 bg-white flex items-center space-x-6 justify-end">
						<BtnCancel onClick={onClose}>Huỷ bỏ</BtnCancel>
						<BtnSubmit onClick={handleSubmit}>Lưu</BtnSubmit>
					</div>
				</div>
			</div>
		</ModalContainer>
	);
}
