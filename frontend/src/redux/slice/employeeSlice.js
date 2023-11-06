import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAdmin from "../../api/axiosAdmin";


export const actionLogin = createAsyncThunk(
	"employee/login",
	async (payload, { rejectWithValue }) => {
		try {
			const { data } = await axiosAdmin.post("api/v1/employee/login", payload);
			return data;
		} catch (error) {
			throw new Error(error?.message);
		}
	},
);

export const actionLogout = createAsyncThunk(
	"employee/logout",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axiosAdmin.get("api/v1/employee/logout");
			return response.data;
		} catch (error) {
			throw new Error(error?.message);
		}
	},
);

const employeeSlice = createSlice({
	name: "employee",
	initialState: {
		info: JSON.parse(localStorage.getItem("employee")) || {},
	},
	extraReducers(builder) {
		builder
			.addCase(actionLogin.fulfilled, (state, action) => {
				state.info = action.payload;
				localStorage.setItem("employee", JSON.stringify(action.payload));
			})
			.addCase(actionLogout.fulfilled, (state, action) => {
				state.info = {};
				localStorage.removeItem("employee");
			});
	},
});

export default employeeSlice;
