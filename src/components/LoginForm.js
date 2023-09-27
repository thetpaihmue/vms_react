import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/vms";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../base-http";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    appVersion: "9.9.9",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      AuthService.setAuthHeader();
      navigate("/vmList");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginClick = () => {
    dispatch(login(formData))
      .unwrap()
      .then((data) => {
        console.log("then", data);
        const jwtToken = data[0].token;
        const decodedToken = jwt_decode(data[0].token);
        const { role, exp } = decodedToken;

        if (
          (role === "SuperAdmin" || role === "VehicleManager") &&
          exp > Date.now() / 1000
        ) {
          console.log("in if");
          Cookies.set("role", role);
          Cookies.set("expirationTime", exp);
          Cookies.set("jwtToken", data[0].token);

          AuthService.setAuthHeader();

          if (role === "SuperAdmin") {
            navigate("/vmList");
          } else {
            navigate("/driverList");
          }
          toast.success("Login successful");
        }
      })
      .catch((e) => {
        console.log("catch:", e);
        toast.error(e.message || "Something went wrong!");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Vehicle Management System</h5>
                <div className="form-group">
                  <label htmlFor="userName">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button onClick={loginClick} className="btn btn-success">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
