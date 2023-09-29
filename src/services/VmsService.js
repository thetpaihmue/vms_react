import http from "../base-http";

const login = (data) => {
  return http
    .post("/VehicleEmployees/Login", data)
    .then((response) => response.data)
    .catch((error) => {
      return error.response.data;
    });
};

// Drivers //
const getAllDrivers = () => {
  return http.get("/VehicleEmployees/GetAllDrivers");
};

const editDriver = (id, data) => {
  return http.put(`/VehicleEmployees/UpdateVehicleEmployee/${id}`, data);
};

const disableDriver = (id) => {
  return http.put(`/VehicleEmployees/DeactivateVehicleEmployee/${id}`);
};

const reactivateDriver = (id) => {
  return http.put(`/VehicleEmployees/ActivateVehicleEmployee/${id}`);
};

const getAllAvailableDrivers = () => {
  return http.get("/VehicleDriverAssignment/GetAllAvailableDrivers");
};

const updateVDAssignment = (data) => {
  return http.put("/Vehicles/VehicleDriverAssignment", data);
};

// Vehicle Managers //
const getAllVehicleManagers = () => {
  return http.get("/VehicleEmployees/GetAllVehicleManagers");
};

const editVehicleManager = (id, data) => {
  return http.put(`/VehicleEmployees/UpdateVehicleEmployee/${id}`, data);
};

const disableVehicleManager = (id) => {
  return http.put(`/VehicleEmployees/DeactivateVehicleEmployee/${id}`);
};

const reactivateVehicleManager = (id) => {
  return http.put(`/VehicleEmployees/ActivateVehicleEmployee/${id}`);
};

const VmsService = {
  login,
  getAllVehicleManagers,
  editVehicleManager,
  disableVehicleManager,
  reactivateVehicleManager,

  getAllDrivers,
  editDriver,
  disableDriver,
  reactivateDriver,
  getAllAvailableDrivers,
  updateVDAssignment,
};

export default VmsService;
