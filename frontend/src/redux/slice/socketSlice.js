import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    connection: null,
  },
  reducers: {
    setInitSocket: (state, { payload }) => {
        state.connection = payload;
    },
  },
});

export default socketSlice;
