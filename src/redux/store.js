import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import menuReducer from "./reducers/menuReducer";
import orderReducer from "./reducers/orderReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer,
  },
});
