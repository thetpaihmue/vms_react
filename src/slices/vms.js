import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VmsService from "../services/VmsService";

const initialState = {
  vehicleManagers: [],
  drivers: [],
};

export const login = createAsyncThunk(
  "login/create",
  async ({ userName, password, appVersion }) => {
    const res = await VmsService.login({
      userName,
      password,
      appVersion,
    });
    console.log("res", res);
    if (res.StatusCode > 400) {
      throw new Error(res.Message);
    }
    return res.data;
  }
);

// Vehicle Managers //
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

// Drivers //

export const getAllDrivers = createAsyncThunk("employees/getAll", async () => {
  const res = await VmsService.getAllDrivers();
  return res.data;
});

export const editDriver = createAsyncThunk(
  "employee/edit",
  async ({ id, formattedFormData }) => {
    console.log("in slice");
    console.log("id", id);
    console.log("data", formattedFormData);
    const res = await VmsService.editDriver(id, formattedFormData);
    return res.data;
  }
);

export const disableDriver = createAsyncThunk(
  "employee/disable",
  async (id) => {
    console.log("in slice");
    console.log("id", id);
    const res = await VmsService.disableDriver(id);
    return res.data;
  }
);

export const reactivateDriver = createAsyncThunk(
  "employee/reactivate",
  async (id) => {
    console.log("in slice");
    console.log("id", id);
    const res = await VmsService.reactivateDriver(id);
    return res.data;
  }
);

export const getAllAvailableDrivers = createAsyncThunk(
  "employees/getAll",
  async () => {
    const res = await VmsService.getAllAvailableDrivers();
    return res.data;
  }
);

export const updateVDAssignment = createAsyncThunk("vd/edit", async (data) => {
  console.log("in slice");
  console.log("data", data);
  const res = await VmsService.updateVDAssignment(data);
  return res.data;
});
// Slice //
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

    [getAllDrivers.fulfilled]: (state, action) => {
      state.drivers = action.payload;
    },

    [editDriver.fulfilled]: (state, action) => {
      state.drivers = action.payload;
    },

    [updateVDAssignment.fulfilled]: (state, action) => {
      const updatedAssignment = action.payload;
      const updatedDrivers = state.drivers.data.map((driver) =>
        driver.id === updatedAssignment.id ? updatedAssignment : driver
      );

      return {
        ...state,
        drivers: {
          ...state.drivers,
          data: updatedDrivers,
        },
      };
    },
  },
});

const { reducer } = vmsSlice;
export default reducer;
