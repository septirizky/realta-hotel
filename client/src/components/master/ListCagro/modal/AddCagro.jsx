import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { postCagro } from "../../../../actions/masterAction";

const AddCagro = (props) => {
  const {
    showModalCagro,
    handleCloseAddCagro,
    image,
    setImage,
    preview,
    setPreview,
    getPolicyResult,
  } = props;

  const { postCagroResult, postCagroError } = useSelector(
    (state) => state.masterReducer
  );

  const [hasil, setHasil] = useState({
    cagro_name: "",
    cagro_type: "",
    cagro_description: "",
    poca_poli_id: "",
  });

  const [isAddCagro, setIsAddCagro] = useState(false);

  const dispatch = useDispatch();

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImage(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const { handleSubmit } = useForm();

  const handleSaveCagro = () => {
    const formData = new FormData();
    formData.append("cagro_name", hasil.cagro_name);
    formData.append("cagro_type", hasil.cagro_type);
    formData.append("cagro_description", hasil.cagro_description);
    formData.append("cagro_icon", image);
    formData.append("poca_poli_id", hasil.poca_poli_id);
    setIsAddCagro(true);
    dispatch(postCagro(formData));
  };

  useEffect(() => {
    if (postCagroResult || postCagroError) {
      if (isAddCagro) {
        postCagroResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postCagroResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              setHasil({
                cagro_name: "",
                cagro_type: "",
                cagro_description: "",
                poca_poli_id: "",
              });
              setImage("");
              setPreview("");
              handleCloseAddCagro(false);
            })
          : Swal.fire("Gagal", postCagroError, "error");
      }
    }
    // eslint-disable-next-line
  }, [postCagroResult, postCagroError]);
  return (
    <Modal show={showModalCagro} onHide={handleCloseAddCagro}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category Group</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveCagro)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formCagroName">
              Category Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                id="formCagroName"
                onChange={(e) =>
                  setHasil({ ...hasil, cagro_name: e.target.value })
                }
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formCagroType">
              Type
            </Form.Label>
            <Col sm="8">
              <Form.Select
                aria-label="Select Type"
                id="formCagroType"
                onChange={(e) =>
                  setHasil({ ...hasil, cagro_type: e.target.value })
                }
              >
                <option value="">Select Your Type</option>
                <option value="Facility">Facility</option>
                <option value="Category">Category</option>
                <option value="Service">Service</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formPolicyRules">
              Policy Rules
            </Form.Label>
            <Col sm="8">
              <Form.Select
                aria-label="Select Policy"
                id="formPolicyRules"
                onChange={(e) =>
                  setHasil({ ...hasil, poca_poli_id: e.target.value })
                }
              >
                <option value="">Select Your Policy Rules</option>
                {getPolicyResult &&
                  getPolicyResult.map((policy) => {
                    return (
                      <option key={policy.poli_id} value={policy.poli_id}>
                        {policy.poli_name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="formCagroItemDesc">Description</Form.Label>
            <Form.Control
              as="textarea"
              id="formCagroItemDesc"
              rows={5}
              onChange={(e) =>
                setHasil({ ...hasil, cagro_description: e.target.value })
              }
              maxLength={255}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="formCagroItemImage">
              Choice your image
            </Form.Label>
            <Form.Control
              type="file"
              id="formCagroItemImage"
              onChange={loadImage}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Row>
              {preview ? (
                <Col xs={6} md={4}>
                  <Image src={preview} width={150} height={150} roundedCircle />
                </Col>
              ) : (
                <Col xs={6} md={4}>
                  <Image
                    src="https://pkmdurenseribu.depok.go.id/assets/images/default.jpg"
                    width={150}
                    height={150}
                    roundedCircle
                  />
                </Col>
              )}
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddCagro}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCagro;
