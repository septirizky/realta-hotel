import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCagro } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const EditCagro = (props) => {
    const {showModalCagro, handleCloseEditCagro, cagroId, setCagroId, cagroName, setCagroName, cagroType, setCagroType, policyId, setPolicyId, cagroDesc, setCagroDesc, cagroIcon, image, setImage, getPolicyResult} = props;

    const {handleSubmit} = useForm(); 

    const {updateCagroResult, updateCagroError} = useSelector((state) => state.masterReducer);

    const [preview, setPreview] = useState("");

    const [isUpdateCagro, setIsUpdateCagro] = useState(false);

    const dispatch = useDispatch();

    const [isUpdateImage, setIsUpdateImage] = useState(false);

    const loadImage = (e) => {
        const image = e.target.files[0];
        if(image){
            setIsUpdateImage(true);
            setImage(image);
            setPreview(URL.createObjectURL(image));
        }
    }

    const handleUpdateCagro = () => {
        const formData = new FormData();
        formData.append("cagro_name", cagroName);
        formData.append("cagro_type", cagroType);
        formData.append("cagro_description", cagroDesc);
        formData.append("cagro_icon", image);
        formData.append("poca_poli_id", policyId);
        setIsUpdateCagro(true);
        dispatch(updateCagro(cagroId, formData));
    };

    useEffect(() => {
        if(updateCagroResult || updateCagroError){
            if(isUpdateCagro){
                updateCagroResult ? Swal.fire({
                    title: "Sukses",
                    icon: "success",
                    text: updateCagroResult.message,
                    confirmButtonText: "OK",
                }).then(() => {
                    setCagroId("");
                    setCagroName("");
                    setCagroType("");
                    setPolicyId("");
                    setCagroDesc("");
                    setImage("");
                    setPreview("");
                    setIsUpdateCagro(false);
                    handleCloseEditCagro(false);
                }) : Swal.fire("Gagal", updateCagroError, "error");
            }
        }
        // eslint-disable-next-line
    }, [updateCagroResult, updateCagroError])
  return <Modal show={showModalCagro} onHide={handleCloseEditCagro}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Category Group</Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleSubmit(handleUpdateCagro)} className="px-2">
    <Modal.Body>
      <Form.Group as={Row} className="mb-3">
      <Form.Control type="hidden" value={cagroId}></Form.Control>
        <Form.Label column sm="4" htmlFor={`formCagroName${cagroId}`}>
          Category Name
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            id={`formCagroName${cagroId}`}
            value={cagroName}
            onChange={(e) =>
              setCagroName(e.target.value)
            }
          ></Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4" htmlFor={`formCagroType${cagroId}`}>
          Type
        </Form.Label>
        <Col sm="8">
          <Form.Select
            aria-label="Select Type"
            id={`formCagroType${cagroId}`}
            value={cagroType}
            onChange={(e) =>
              setCagroType(e.target.value)
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
        <Form.Label column sm="4" htmlFor={`formPolicyRules${cagroId}`}>
          Policy Rules
        </Form.Label>
        <Col sm="8">
          <Form.Select
            aria-label="Select Policy"
            id={`formPolicyRules${cagroId}`}
            value={policyId}
            onChange={(e) =>
              setPolicyId(e.target.value)
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
        <Form.Label htmlFor={`formCagroDesc${cagroId}`}>Description</Form.Label>
        <Form.Control
          as="textarea"
          id={`formCagroDesc${cagroId}`}
          rows={5}
          value={cagroDesc}
          onChange={(e) =>
            setCagroDesc(e.target.value)
          }
          maxLength={255}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={`formCagroItemImage${cagroId}`}>
          Choice your image
        </Form.Label>
        <Form.Control
          type="file"
          id={`formCagroItemImage${cagroId}`}
          onChange={loadImage}
        />
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Row>
          {isUpdateImage ? (
            <Col xs={6} md={4}>
              <Image src={preview} width={150} height={150} roundedCircle />
            </Col>
          ) : (
            <Col xs={6} md={4}>
              <Image
                src={cagroIcon}
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
      <Button variant="secondary" onClick={handleCloseEditCagro}>
        Close
      </Button>
      <Button variant="success" type="submit">
        Save
      </Button>
    </Modal.Footer>
  </Form>
</Modal>;
};

export default EditCagro;
