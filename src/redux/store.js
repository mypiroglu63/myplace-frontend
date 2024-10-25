import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import menuReducer from "./reducers/menuReducer";
import orderReducer from "./reducers/orderReducer";

// Redux store oluşturun
const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer,
  },
});

// store'u export edin
export default store;
