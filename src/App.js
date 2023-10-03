import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/LoginForm";
import VMList from "./components/SA_Role/VMList";
import EditVMProfile from "./components/SA_Role/EditVMProfile";
import { ToastContainer } from "react-bootstrap";
import DriverList from "./components/VM_Role/DriverList";
import EditDriverProfile from "./components/VM_Role/EditDriverProfile";
import VehicleList from "./components/VM_Role/VehicleList";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="container mt-3">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/editVM/:id" element={<EditVMProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vmList" element={<VMList />} />
            <Route path="/driverList" element={<DriverList />} />
            <Route path="/editDriver/:id" element={<EditDriverProfile />} />
            <Route path="/vList" element={<VehicleList />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
