import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVehicleManagers,
  disableVehicleManager,
  reactivateVehicleManager,
} from "../slices/vms";
import AuthService from "../services/AuthService";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VMList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { vehicleManagers } = useSelector((state) => state.vms);
  const [actionSuccess, setActionSuccess] = useState(false);

  useEffect(() => {
    AuthService.setAuthHeader();
    dispatch(getAllVehicleManagers())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    setActionSuccess(false);
  }, [actionSuccess]);

  const getStatusBadge = (vehicleEmployeeStatus) => {
    if (vehicleEmployeeStatus === "Available") {
      return <span className="badge badge-success">Active</span>;
    } else {
      return <span className="badge badge-danger">Inactive</span>;
    }
  };
  const ExpandedComponent = ({ data }) => {
    const {
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
    dispatch(disableVehicleManager(id)).then(() => {
      setActionSuccess(true);
      toast.success("Disabled Successfully");
    });
  };
  const handleReactivateClick = (id) => {
    dispatch(reactivateVehicleManager(id)).then(() => {
      setActionSuccess(true);
      toast.success("Reactivated Successfully");
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => <div>{getStatusBadge(row.vehicleEmployeeStatus)}</div>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link
            to={{
              pathname: `/editVM/${row.id}`,
            }}
            state={{ formData: row }}
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Vehicle Managers</h5>
        <div>
          <Button variant="success">Create + </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={vehicleManagers.data}
        //selectableRows
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </>
  );
};

export default VMList;
