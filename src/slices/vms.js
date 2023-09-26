import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VmsService from "../services/VmsService";

const initialState = {
  vehicleManagers: [],
};

export const login = createAsyncThunk(
  "login/create",
  async ({ userName, password, appVersion }) => {
    const res = await VmsService.login({
      userName,
      password,
      appVersion,
    });
    return res.data;
  }
);

export const getAllVehicleManagers = createAsyncThunk(
  "employees/getAll",
  async () => {
    const res = await VmsService.getAllVehicleManagers();
    return res.data;
  }
);

export const editVehicleManager = createAsyncThunk(
  "employee/edit",
  async ({ id, formattedFormData }) => {
    console.log("in slice");
    console.log("id", id);
    console.log("data", formattedFormData);
    const res = await VmsService.editVehicleManager(id, formattedFormData);
    return res.data;
  }
);

export const disableVehicleManager = createAsyncThunk(
  "employee/disable",
  async (id) => {
    console.log("in slice");
    console.log("id", id);
    const res = await VmsService.disableVehicleManager(id);
    return res.data;
  }
);

export const reactivateVehicleManager = createAsyncThunk(
  "employee/reactivate",
  async (id) => {
    console.log("in slice");
    console.log("id", id);
    const res = await VmsService.reactivateVehicleManager(id);
    return res.data;
  }
);

const vmsSlice = createSlice({
  name: "vms",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {},

    [getAllVehicleManagers.fulfilled]: (state, action) => {
      state.vehicleManagers = action.payload;
    },

    [editVehicleManager.fulfilled]: (state, action) => {
      state.vehicleManagers = action.payload;
    },
  },
});

const { reducer } = vmsSlice;
export default reducer;
