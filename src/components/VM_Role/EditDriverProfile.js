import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { editVehicleManager } from "../slices/vms";
import { useDispatch } from "react-redux";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const EditVMProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation();
  const preFilledData = location.state ? location.state.formData : null;
  console.log("preFilledData", preFilledData);
  console.log("Location:", location);
  const formatDateFromServer = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${year}-${month}-${day}`;
  };
  const initialFormData = preFilledData || {
    id: "",
    vehicleEmployeeNumber: "",
    name: "",
    email: "",
    nrc: "",
    phoneNumber: "",
    role: "",
    dateOfBirth: "",
    photoPath: null,
    gender: "",
    address: "",
    licenseNumber: "",
    licenseColor: "",
    licenseCardExpiredDate: "",
    vehicleEmployeeStatus: "",
  };

  useEffect(() => {
    if (preFilledData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: formatDateFromServer(preFilledData.dateOfBirth),
        licenseCardExpiredDate: formatDateFromServer(
          preFilledData.licenseCardExpiredDate
        ),
      }));
    }
  }, [preFilledData]);

  const formatDateToServer = (dateString) => {
    return `${dateString}T00:00:00`;
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedFormData = {
      ...formData,
      dateOfBirth: formatDateToServer(formData.dateOfBirth),
      licenseCardExpiredDate: formatDateToServer(
        formData.licenseCardExpiredDate
      ),
    };
    const id = formattedFormData.id;
    console.log("Form submitted with data:", formattedFormData);
    AuthService.setAuthHeader();

    dispatch(editVehicleManager({ id, formattedFormData }))
      .unwrap()
      .then((data) => {
        navigate("/vmList");
      });
  };

  return (
    <div className="container">
      <h5 className="mb-5">Edit Vehicle Manager Profile</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nrc" className="form-label">
                NRC:
              </label>
              <input
                type="text"
                className="form-control"
                id="nrc"
                name="nrc"
                value={formData.nrc}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth:
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>
              <select
                className="form-select form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="licenseCardExpiredDate" className="form-label">
                License Card Expired Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="licenseCardExpiredDate"
                name="licenseCardExpiredDate"
                value={formData.licenseCardExpiredDate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="licenseColor" className="form-label">
                License Color:
              </label>
              <input
                type="text"
                className="form-control"
                id="licenseColor"
                name="licenseColor"
                value={formData.licenseColor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVMProfile;
