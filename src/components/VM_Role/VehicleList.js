import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles, getAllDrivers } from "../../slices/vms";
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
import { BsFillPersonXFill, BsFillPersonCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import EditVDAssignment from "./EditVDAssignment";
import { rentVehicle, returnVehicle, removeAssginment } from "../../slices/vms";
import SideNavigation from "../SideNavigation";
function AssignModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div></div>
      </Modal.Header>
      <Modal.Body>
        <EditVDAssignment
          modelId={props.modelId}
          modelName={props.modelName}
          currentDriver={props.driverName}
          currentDriverId={props.driverId}
        />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
function RemoveAssignModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div></div>
      </Modal.Header>
      <Modal.Body>
        Are you sure to remove {props.driverName} from {props.modelName}?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleRemoveAssignClick}>Yes</Button>
        <Button className="btn btn-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function RentModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div>Notice!</div>
      </Modal.Header>
      <Modal.Body>
        {props.rent === true ? (
          <span>Are you sure to remove this vehicle from the rent list? </span>
        ) : (
          <span>Are you sure to rent this vehicle?</span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleRentClick}>Yes</Button>
        <Button className="btn btn-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const VehicleList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [rentModalShow, setRentModalShow] = useState(false);
  const { drivers } = useSelector((state) => state.vms);
  const { vehicles } = useSelector((state) => state.vms);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [currentDriverId, setCurrentDriverId] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [rentStatus, setRentStatus] = useState(false);
  const [removeAssignModalShow, setRemoveAssignModalShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    AuthService.setAuthHeader();
    dispatch(getAllDrivers());
    dispatch(getAllVehicles())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    setActionSuccess(false);
  }, [actionSuccess]);

  const getStatusBadge = (vehicleStatus) => {
    if (vehicleStatus === "Assigned" || vehicleStatus === "Substituted") {
      return <span className="badge badge-success">{vehicleStatus}</span>;
    } else {
      return <span className="badge badge-danger">{vehicleStatus}</span>;
    }
  };
  // Deactivate,
  // Leave,
  // Assigned,
  // Substituted,
  // NoDriver,
  // Available
  const ExpandedComponent = ({ data }) => {
    const {
      id,
      licensePlate,
      plateExpiredDate,
      photoPath,
      vehicleTypeId,
      vehicleType,
      color,
      startPoint,
      isUsable,
      vehicleEmployeeId,
      vehicleEmployee,
      vehicleStatus,
      createdAt,
      updatedAt,
      updatedBy,
      updatedByName,
    } = data;

    const formatDate = (dateString) => {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const employeeName = (vehicleEmployee && vehicleEmployee.name) || "";
    const employeeId = (vehicleEmployee && vehicleEmployeeId) || "";

    return (
      <div>
        <Card style={{ backgroundColor: "#f0f0f0", fontSize: "13px" }}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Card.Title style={{ fontSize: "13px" }}>
                  {licensePlate} - {vehicleType.model}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: "13px" }}
                  className="mb-2 text-muted"
                >
                  Vehicle Id - {id}
                </Card.Subtitle>
                <Card.Subtitle
                  style={{ fontSize: "13px" }}
                  className="mb-2 text-muted"
                >
                  {employeeName} - {employeeId}
                </Card.Subtitle>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const handleOnClick = (row) => {
    console.log("modal click");
    if (!modalShow) {
      setModalShow(true);
      setCurrentDriver(row.vehicleEmployee ? row.vehicleEmployee.name : "");
      setCurrentDriverId(row.vehicleEmployeeId);
      setModelId(row.id);
      setModelName(row.licensePlate);
      console.log("handleOnClick" + modelId);
    }
  };

  const handleOnClickForRemove = (row) => {
    console.log("modal click");
    if (!modalShow) {
      setRemoveAssignModalShow(true);
      setCurrentDriver(row.vehicleEmployee ? row.vehicleEmployee.name : "");
      setCurrentDriverId(row.vehicleEmployeeId);
      setModelId(row.id);
      setModelName(row.licensePlate);
      console.log("handleOnClick" + modelId);
    }
  };

  const handleOnClickRent = (row) => {
    console.log("modal click");
    if (!rentModalShow) {
      setRentModalShow(true);
      setRentStatus(row.isUsable);
      setCurrentDriver(row.vehicleEmployee ? row.vehicleEmployee.name : "");
      setCurrentDriverId(row.vehicleEmployeeId);
      setModelId(row.id);
      setModelName(row.licensePlate);
      console.log("handleOnClickRent" + row.modelId);
    }
  };

  const handleRentClick = () => {
    if (rentStatus === true) {
      dispatch(returnVehicle(modelId)).then(() => {
        setActionSuccess(true);
        toast.success("Returned Successfully");
      });
    } else {
      dispatch(rentVehicle(modelId)).then(() => {
        setActionSuccess(true);
        toast.success("Rented Successfully");
      });
    }
  };
  const handleRemoveAssignClick = () => {
    dispatch(
      removeAssginment({ vehicleId: modelId, employeeId: currentDriverId })
    ).then(() => {
      setActionSuccess(true);
      toast.success("Removed Successfully");
    });
  };
  const handleDeleteClick = (id) => {
    // dispatch(disableDriver(id)).then(() => {
    //   setActionSuccess(true);
    //   toast.success("Disabled Successfully");
    // });
  };
  const handleReactivateClick = (id) => {
    // dispatch(reactivateDriver(id)).then(() => {
    //   setActionSuccess(true);
    //   toast.success("Reactivated Successfully");
    // });
  };
  const handleLogOutClick = () => {
    AuthService.deleteToken();
    navigate("/");
  };
  const columns = [
    {
      name: "Plate",
      selector: (row) => row.licensePlate,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.vehicleType.model,
      sortable: true,
    },
    {
      name: "Rent",
      selector: (row) => row.isUsable,
      cell: (row) =>
        row.isUsable ? (
          <>
            <span className="badge badge-success mr-2">Yes </span>
            <a onClick={() => handleOnClickRent(row)}>
              <FaEdit style={{ color: "#007bff" }} />
            </a>
          </>
        ) : (
          <>
            <span className="badge badge-danger mr-2">No</span>
            <a onClick={() => handleOnClickRent(row)}>
              <FaEdit style={{ color: "#007bff" }} />
            </a>
          </>
        ),
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.vehicleStatus,
      cell: (row) => <div>{getStatusBadge(row.vehicleStatus)}</div>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.vehicleStatus === "Available" ? (
            <a onClick={() => handleOnClickForRemove(row)}>
              <BsFillPersonXFill style={{ color: "#ec79cd" }} />
            </a>
          ) : (
            <a onClick={() => handleOnClick(row)}>
              <BsFillPersonCheckFill style={{ color: "#ec79cd" }} />
            </a>
          )}

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
          <h5 className="d-inline">Vehicles</h5>
          <a className="ml-3">
            <FaPlus className="mb-1" />
          </a>
        </div>
        <RentModal
          show={rentModalShow}
          onHide={() => setRentModalShow(false)}
          rent={rentStatus}
          modelId={modelId}
          handleRentClick={handleRentClick}
        />
        <div>
          <AssignModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            driverName={currentDriver}
            driverId={currentDriverId}
            modelId={modelId}
            modelName={modelName}
          />
          <RemoveAssignModal
            show={removeAssignModalShow}
            onHide={() => setRemoveAssignModalShow(false)}
            driverName={currentDriver}
            driverId={currentDriverId}
            modelId={modelId}
            modelName={modelName}
            handleRemoveAssignClick={handleRemoveAssignClick}
          />
          <a className="ml-3" onClick={handleLogOutClick}>
            <FaPowerOff style={{ color: "#dc3545" }} />
          </a>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={vehicles.data}
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

export default VehicleList;
