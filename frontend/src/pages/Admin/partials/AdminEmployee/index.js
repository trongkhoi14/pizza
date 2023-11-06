import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosAdmin from "../../../../api/axiosAdmin";
import EmployeeModal from "./components/EmployeeModal";
import EmployeeTable from "./components/EmployeeTable";

export default function AdminEmployee({ employeeType = "manager", rolesRequired = [] }) {
	const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
	const [employee, setEmployee] = useState(null);
	const [employeeList, setEmployeeList] = useState([]);
	const [loading, setLoading] = useState(false);
	const { info } = useSelector((state) => state.employee);

	const handleCloseEmployeeModal = () => {
		setOpenEmployeeModal(false);
		setEmployee(null);
	};

	const handleOpenEmployeeModal = () => {
		setOpenEmployeeModal(true);
	};

	const addOrUpdateEmployee = async (data) => {
		try {
			setLoading(true);
			if (employee) {
				// update employee
			} else {
				// add new employee
				const res = await axiosAdmin.post(
					`api/v1/employee/` + employeeType,
					data,
				);
				toast.success(`Thêm ${employeeType} thành công`);
				setEmployeeList([...employeeList, {...data, createdBy: info }]);
			}
			handleCloseEmployeeModal();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await axiosAdmin.get("api/v1/employee/" + employeeType);
				setEmployeeList(data);
			} catch (err) {
				toast.error(err.message);
				setEmployeeList([]);
			} finally {
				setLoading(false);
			}
		})();
	}, [employeeType]);

	return (
		<>
			<div className="p-5">
				<div className="flex items-center mb-5">
					<h2 className="text-xl font-semibold capitalize">{employeeType}s</h2>
					<button
						onClick={handleOpenEmployeeModal}
						type="button"
						className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Thêm
					</button>
				</div>
				<EmployeeTable data={employeeList} loading={loading} />
			</div>

			<EmployeeModal
				visible={openEmployeeModal}
				onClose={handleCloseEmployeeModal}
				onSubmit={addOrUpdateEmployee}
				employeeType={employeeType}
			/>
		</>
	);
}
