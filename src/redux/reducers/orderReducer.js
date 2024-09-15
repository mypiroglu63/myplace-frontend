import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { addOrder, setOrders } = orderSlice.actions;

export default orderSlice.reducer;
