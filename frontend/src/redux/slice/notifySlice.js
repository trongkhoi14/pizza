import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAdmin from "../../api/axiosAdmin";

export const getNotify = createAsyncThunk("notify/getNotify", async () => {
  try {
    const { data } = await axiosAdmin.get("api/v1/notify");
    return data;
  } catch (error) {}
});

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notify: [],
    visible: false,
  },
  reducers: {
    addNotify: (state, { payload }) => {
      const checkNotifyExist = state.notify?.find((n) => n._id === payload._id);
      if (!checkNotifyExist) {
        state.notify.unshift(payload);
        state.visible = true;
      }
    },
    updateNotify: (state, { payload }) => {
      state.notify[payload].status = true;
    },
    deleteNotify: (state, { payload }) => {
      state.notify.splice(payload, 1);
      if (!state.notify.length) {
        state.visible = false;
      }
    },
    updateVisible: (state, action) => {
      if (state.notify.length) {
        state.visible = !state.visible;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotify.fulfilled, (state, { payload }) => {
      state.notify = payload || [];
      state.visible = payload?.length > 0;
    });
  },
});

export default notifySlice;
