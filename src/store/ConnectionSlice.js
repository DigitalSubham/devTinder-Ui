import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
  },
});

export default ConnectionSlice.reducer;
export const { addConnection } = ConnectionSlice.actions;
