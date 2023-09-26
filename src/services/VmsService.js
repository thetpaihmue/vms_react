import http from "../base-http";

const login = (data) => {
  return http.post("/VehicleEmployees/Login", data);
};

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
};

export default VmsService;
