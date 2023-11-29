import React, { useEffect, useState } from "react";
import { GetStock } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";
import axios from "axios";
import { Avatar } from "@mui/material";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, generatePath } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

const Stock = () => {
  const [stock_name, setStock] = useState("");
  const [id, setId] = useState("");
  const [desc, setDesc] = useState("");
  const [point, setPoint] = useState("");
  const [qty, setQty] = useState("");
  const [used, setUsed] = useState("");
  const [scrap, setScrap] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState();
  const [imagephoto, setFileStock] = useState();
  const [stock_id, setStockId] = useState();
  const { getStockResult, getStockLoading, getStockError } = useSelector(
    (state) => state.PurchaseReducer
  );
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileStock(e.target.files[0]);
  };
  const uploadphoto = (event) => {
    event.preventDefault();
    const spho_primary = 1;
    const spho_url = "www.dd.com";
    console.log(imagephoto, spho_primary, stock_id);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `http://localhost:4001/uploadstockphoto`,
          timeout: 12000,
          data: {
            spho_primary,
            spho_url,
            spho_stock_id: stock_id,
            imagephoto,
          },
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then((response) => {
          // console.log("3. berhasil  data :", response.data);
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
            });
            dispatch(GetStock());
            setPhoto(false);
            setFile("");
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
        });
      }
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("1. use effect home");
    dispatch(GetStock());
  }, [dispatch]);

  //modal Add
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const insertstock = (event) => {
    event.preventDefault();
    console.log(stock_name, desc, point, qty, used, scrap, color, size);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `http://localhost:4001/insertstocks`,
          timeout: 12000,
          data: {
            stock_name: stock_name,
            stock_description: desc,
            stock_quantity: qty,
            stock_reorder_point: point,
            stock_used: used,
            stock_scrap: scrap,
            stock_size: size,
            stock_color: color,
          },
        }).then((response) => {
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
            });
            dispatch(GetStock());
            setStock("");
            setDesc("");
            setPoint("");
            setQty("");
            setUsed("");
            setScrap("");
            setSize("");
            setColor("");
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
          setShow(false);
        });
      }
    });
  };

  //modal upload
  const [photo, setPhoto] = useState(false);
  const handlePhoto = () => setPhoto(false);
  const handleUpload = async (id) => {
    try {
      setPhoto(true);
      setStockId(id);
    } catch (error) {}
  };

  //modal edit
  const [edit, setEdit] = useState(false);
  const handleEditC = () => setEdit(false);
  const editStock = async (id) => {
    try {
      setEdit(true);
      const response = await axios.get(`http://localhost:4001/stockbyId/${id}`);
      const data = await response.data.data;
      console.log(data, "123");
      setStock(data.stock_name);
      setId(data.stock_id);
      setDesc(data.stock_description);
      setPoint(data.stock_reorder_point);
      setQty(data.stock_quantity);
      setUsed(data.stock_used);
      setScrap(data.stock_scrap);
      setSize(data.stock_size);
      setColor(data.stock_color);
    } catch (error) {
      console.log(error.message);
    }
  };

  //editVendor
  const editVendor = (event) => {
    event.preventDefault();
    console.log(stock_name, desc, point, qty, used, scrap, color, size, id);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `http://localhost:4001/updatestocks/${id}`,
          timeout: 12000,
          data: {
            stock_name: stock_name,
            stock_description: desc,
            stock_quantity: qty,
            stock_reorder_point: point,
            stock_used: used,
            stock_scrap: scrap,
            stock_size: size,
            stock_color: color,
          },
        }).then((response) => {
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
            });
            setEdit(false);
            dispatch(GetStock());
            setStock("");
            setDesc("");
            setPoint("");
            setQty("");
            setUsed("");
            setScrap("");
            setSize("");
            setColor("");
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
          setShow(false);
        });
      }
    });
  };
  const deleteHandler = async (id) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:4001/deletestocks/${id}`,
          });
          dispatch(GetStock());
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const detailstock = async (id) => {
    navigate(generatePath("/stock/:id", { id: id }));
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Stock</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
          <div className="w-100">
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Re-Order Point</th>
                    <th>Qty</th>
                    <th>Used</th>
                    <th>Scrap</th>
                    <th>Size Color</th>
                    <th>
                      {" "}
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={handleShow}
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getStockResult ? (
                    getStockResult.map((vendor, index) => (
                      <tr key={index}>
                        <td>{vendor.stock_name}</td>
                        <td>{vendor.stock_reorder_point}</td>
                        <td>{vendor.stock_quantity}</td>
                        <td>{vendor.stock_used}</td>
                        <td>{vendor.stock_scrap}</td>
                        <td>{vendor.stock_size + "-" + vendor.stock_color}</td>
                        <td>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title=""
                            split
                            variant="Secondary"
                          >
                            <Dropdown.Item
                              onClick={() => editStock(vendor.stock_id)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleUpload(vendor.stock_id)}
                            >
                              Upload Photo
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => deleteHandler(vendor.stock_id)}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => detailstock(vendor.stock_id)}
                            >
                              Detail Info Stock
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  ) : getStockLoading ? (
                    <p> Loading . . .</p>
                  ) : (
                    <p> {getStockError ? getStockError : "Data Kosong"}</p>
                  )}
                </tbody>
              </table>
            </>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add/Edit Vendor Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id="create-course-form">
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="email"
                      value={stock_name}
                      onChange={(e) => setStock(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Stock Description</Form.Label>
                    <Form.Control
                      type="email"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Re-order-point</Form.Label>
                    <Form.Control
                      value={point}
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        setPoint(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      value={qty}
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        setQty(e.target.value);
                      }}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="duedate">
                    <Form.Label>Used</Form.Label>
                    <Form.Control
                      value={used}
                      onChange={(e) => setUsed(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Scrap</Form.Label>
                    <Form.Control
                      value={scrap}
                      onChange={(e) => setScrap(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={insertstock}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={edit} onHide={handleEditC}>
              <Modal.Header closeButton>
                <Modal.Title>Add/Edit Vendor Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id="create-course-form">
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="email"
                      value={stock_name}
                      onChange={(e) => setStock(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Stock Description</Form.Label>
                    <Form.Control
                      type="email"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Re-order-point</Form.Label>
                    <Form.Control
                      value={point}
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        setPoint(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      value={qty}
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        setQty(e.target.value);
                      }}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="duedate">
                    <Form.Label>Used</Form.Label>
                    <Form.Control
                      value={used}
                      onChange={(e) => setUsed(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="duedate" style={{ display: "none" }}>
                    <Form.Label>Used</Form.Label>
                    <Form.Control
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Scrap</Form.Label>
                    <Form.Control
                      value={scrap}
                      onChange={(e) => setScrap(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleEditC}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={editVendor}>
                  Simpan
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={photo} onHide={handlePhoto}>
              <Modal.Header closeButton>
                <Modal.Title>Upload Photo Stock</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-1 ">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-3">
                    <label className=" p-3">
                      <Avatar
                        src={file}
                        sx={{
                          width: 150,
                          height: 150,
                          left: 150,
                          right: 300,
                        }}
                      />
                    </label>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlePhoto}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={uploadphoto}>
                  Simpan
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </MDBBreadcrumb>
      </MDBContainer>
    </section>
  );
};

export default Stock;
