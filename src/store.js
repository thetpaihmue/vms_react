import { configureStore } from "@reduxjs/toolkit";
import vmsReducer from "./slices/vms";

const reducer = {
  vms: vmsReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
