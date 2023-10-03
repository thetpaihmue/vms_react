import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VmsService from "../services/VmsService";

const initialState = {
  vehicleManagers: [],
  drivers: [],
  vehicles: [],
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
// Vehicles //
export const getAllVehicles = createAsyncThunk("vehicles/getAll", async () => {
  const res = await VmsService.getAllVehicles();
  return res.data;
});

export const rentVehicle = createAsyncThunk("vehicle/rent", async (id) => {
  console.log("in slice");
  console.log("id", id);
  const res = await VmsService.rentVehicle(id);
  return res.data;
});

export const returnVehicle = createAsyncThunk("vehicle/return", async (id) => {
  console.log("in slice");
  console.log("id", id);
  const res = await VmsService.returnVehicle(id);
  return res.data;
});
// Vehicle Managers //
export const getAllVehicleManagers = createAsyncThunk(
  "vehicleManagers/getAll",
  async () => {
    const res = await VmsService.getAllVehicleManagers();
    return res.data;
  }
);

export const editVehicleManager = createAsyncThunk(
  "vehicleManager/edit",
  async ({ id, formattedFormData }) => {
    console.log("in slice");
    console.log("id", id);
    console.log("data", formattedFormData);
    const res = await VmsService.editVehicleManager(id, formattedFormData);
    return res.data;
  }
);

export const disableVehicleManager = createAsyncThunk(
  "vehicleManagers/disable",
  async (id) => {
    console.log("in slice");
    console.log("id", id);
    const res = await VmsService.disableVehicleManager(id);
    return res.data;
  }
);

export const reactivateVehicleManager = createAsyncThunk(
  "vehicleManagers/reactivate",
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
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {})
      .addCase(rentVehicle.fulfilled, (state, action) => {
        state.vehicles = action.payload;
      })
      .addCase(returnVehicle.fulfilled, (state, action) => {
        state.vehicles = action.payload;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload;
      })
      .addCase(getAllVehicleManagers.fulfilled, (state, action) => {
        state.vehicleManagers = action.payload;
      })
      .addCase(editVehicleManager.fulfilled, (state, action) => {
        state.vehicleManagers = action.payload;
      })
      .addCase(getAllDrivers.fulfilled, (state, action) => {
        state.drivers = action.payload;
      })
      .addCase(editDriver.fulfilled, (state, action) => {
        state.drivers = action.payload;
      })
      .addCase(updateVDAssignment.fulfilled, (state, action) => {
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
      });
  },
});

const { reducer } = vmsSlice;
export default reducer;
