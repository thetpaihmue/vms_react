import React, { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { updateVDAssignment } from "../../slices/vms";
const EditVehicleDriverAssignment = ({
  modelId,
  modelName,
  currentDriver,
  currentDriverId,
  //updateFailMessage,
}) => {
  const dispatch = useDispatch();
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const { drivers } = useSelector((state) => state.vms);
  console.log("drivers", drivers);
  console.log("modelId", modelId);
  console.log("modelName", modelName);
  console.log("currentDriver", currentDriver);
  console.log("currentDriverId", currentDriverId);
  const initialFormData = {
    vehicleId: modelId,
    vehicleEmployeeId: currentDriverId || "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    AuthService.setAuthHeader();
    const filteredDrivers = Array.isArray(drivers.data)
      ? drivers.data.filter(
          (driver) => driver.vehicleEmployeeStatus === "Available"
        )
      : [1, 2];
    setAvailableDrivers(filteredDrivers);
  }, [formData]);
  console.log("availableDrivers", availableDrivers);

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.setAuthHeader();
    console.log("Form submitted with data:", formData);

    dispatch(updateVDAssignment(formData));
  };

  return (
    <div>
      {/* {updateFailMessage && (
        <div className="alert alert-danger" id="fail-message">
          {updateFailMessage}
        </div>
      )} */}
      <h3 className="text-center text-fmss">Vehicle Assignment Edit</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="vehicleId" value={modelId} />
            <div className="mb-3">
              <label htmlFor="licensePlate" className="form-label">
                License Plate:
              </label>
              <div>{modelName}</div>
            </div>

            <div className="form-group">
              <label
                htmlFor="driver-dropdown"
                className="d-block required-label"
              >
                Driver
              </label>

              <select
                id="driver-dropdown"
                className="dropdown2"
                aria-label="Driver Select"
                name="VehicleEmployeeId"
                style={{ width: "100%" }}
                value={formData.vehicleEmployeeId || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vehicleEmployeeId: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select a driver
                </option>

                {currentDriverId && (
                  <option value={currentDriverId} key={currentDriverId}>
                    {currentDriver}
                  </option>
                )}

                {availableDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {`${driver.name} (EID: ${driver.vehicleEmployeeNumber}) ${driver.role}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-5 d-flex justify-content-end">
              <input
                type="submit"
                value="Update"
                className="btn btn-primary text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleDriverAssignment;
