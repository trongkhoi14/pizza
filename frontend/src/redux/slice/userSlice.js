import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const actionLogin = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("api/v1/user/login", payload);
      return response.data;
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const actionLogout = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("api/v1/user/logout");
      return response.data;
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(actionLogin.fulfilled, (state, action) => {
      state.info = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    })
    .addCase(actionLogout.fulfilled, (state, action) => {
      state.info = {};
      localStorage.removeItem("user");
  })
  },
});

export default userSlice;
