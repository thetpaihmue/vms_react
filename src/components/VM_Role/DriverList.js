import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDrivers,
  disableDriver,
  reactivateDriver,
} from "../../slices/vms";
import AuthService from "../../services/AuthService";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaBus,
  FaPowerOff,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../SideNavigation";

const DriverList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const { drivers } = useSelector((state) => state.vms);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [currentDriverId, setCurrentDriverId] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [modelId, setModelId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    AuthService.setAuthHeader();
    dispatch(getAllDrivers())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    setActionSuccess(false);
  }, [actionSuccess]);

  const getStatusBadge = (vehicleEmployeeStatus) => {
    if (
      vehicleEmployeeStatus === "Assigned" ||
      vehicleEmployeeStatus === "Substituted"
    ) {
      return (
        <span className="badge badge-success">{vehicleEmployeeStatus}</span>
      );
    } else {
      return (
        <span className="badge badge-danger">{vehicleEmployeeStatus}</span>
      );
    }
  };
  // Deactivate,
  // Leave,
  // Assigned,
  // Available,
  // Substituted
  const ExpandedComponent = ({ data }) => {
    const {
      id,
      address,
      dateOfBirth,
      email,
      nrc,
      phoneNumber,
      role,
      gender,
      name,
      updatedAt,
      vehicleEmployeeNumber,
      licenseNumber,
      licenseColor,
      licenseCardExpiredDate,
      vehicleEmployeeStatus,
      assignedVehicleId,
      assignedVehicleLicensePlate,
    } = data;

    const formatDate = (dateString) => {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
      <div>
        <Card style={{ backgroundColor: "#f0f0f0", fontSize: "13px" }}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Card.Title style={{ fontSize: "13px" }}>
                  {name} - {vehicleEmployeeNumber}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: "13px" }}
                  className="mb-2 text-muted"
                >
                  {role} - {vehicleEmployeeStatus}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Id:</strong> {id}
                </Card.Text>
              </Col>
              <Col md={6}>
                <Card.Text>
                  <strong>Email:</strong> {email}
                </Card.Text>
                <Card.Text>
                  <strong>Phone Number:</strong> {phoneNumber}
                </Card.Text>
                <Card.Text>
                  <strong>Address:</strong> {address}
                </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <Card.Text>
                  <strong>Vehicle Id:</strong> {assignedVehicleId}
                </Card.Text>
                <Card.Text>
                  <strong>Date of Birth:</strong> {formatDate(dateOfBirth)}
                </Card.Text>
                <Card.Text>
                  <strong>NRC:</strong> {nrc}
                </Card.Text>
                <Card.Text>
                  <strong>Gender:</strong> {gender}
                </Card.Text>
              </Col>
              <Col md={6}>
                <Card.Text>
                  <strong>License Number:</strong> {licenseNumber}
                </Card.Text>
                <Card.Text>
                  <strong>License Card Expired Date:</strong>{" "}
                  {formatDate(licenseCardExpiredDate)}
                </Card.Text>
                <Card.Text>
                  <strong>Last Updated:</strong> {formatDate(updatedAt)}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const handleDeleteClick = (id) => {
    dispatch(disableDriver(id)).then(() => {
      setActionSuccess(true);
      toast.success("Disabled Successfully");
    });
  };
  const handleReactivateClick = (id) => {
    dispatch(reactivateDriver(id)).then(() => {
      setActionSuccess(true);
      toast.success("Reactivated Successfully");
    });
  };
  const handleLogOutClick = () => {
    AuthService.deleteToken();
    navigate("/");
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Vehicle",
      selector: (row) => row.assignedVehicleLicensePlate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.vehicleEmployeeStatus,
      cell: (row) => <div>{getStatusBadge(row.vehicleEmployeeStatus)}</div>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link
            to={{
              pathname: `/editDriver/${row.id}`,
            }}
            state={{ formData: row }}
            className="ml-3"
          >
            <FaEdit />
          </Link>

          <a className="ml-3" onClick={() => handleDeleteClick(row.id)}>
            <FaTrash style={{ color: "#dc3545" }} />
          </a>

          <a className="ml-3" onClick={() => handleReactivateClick(row.id)}>
            <FaCheck style={{ color: "#dc3545" }} />
          </a>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ToastContainer />
      <SideNavigation />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="d-inline">Drivers</h5>
          <a className="ml-3">
            <FaPlus className="mb-1" />
          </a>
        </div>
        <div>
          <a className="ml-3" onClick={handleLogOutClick}>
            <FaPowerOff style={{ color: "#dc3545" }} />
          </a>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={drivers.data}
        pagination
        paginationPerPage={8}
        paginationRowsPerPageOptions={[8, 10, 15, 20, 25]}
        //selectableRows
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </>
  );
};

export default DriverList;
