import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddFacilities from "./modal/addFacilities";
import EditFacilities from "./modal/editFacilities";
import DeleteFacilities from "./modal/deleteFacilities";

const GetFacilities = (props) => {
  const {
    getFaciResult,
    getFaciLoading,
    getFaciError,
    getCategoryResult,
    params_hotel_id,
  } = props;

  const { register, resetField, handleSubmit } = useForm();

  const [showModalAddFaci, setShowModalAddFaci] = useState(false);
  const [showModalEditFaci, setShowModalEditFaci] = useState(false);
  const [showModalDeleteFaci, setShowModalDeleteFaci] = useState(false);

  const [faciId, setFaciId] = useState();
  const [faciName, setFaciName] = useState("");
  const [cagroId, setCagroId] = useState("");
  const [faciRoom, setFaciRoom] = useState("");
  const [faciMax, setFaciMax] = useState("");
  const [faciLowPrice, setFaciLowPrice] = useState("");
  const [faciHighPrice, setFaciHighPrice] = useState("");
  const [faciDiscount, setFaciDiscount] = useState("");
  const [faciTax, setFaciTax] = useState("");
  const [faciStartDate, setFaciStartDate] = useState("");
  const [faciEndDate, setFaciEndDate] = useState("");
  const [faciDesc, setFaciDesc] = useState("");

  const showAddFaci = () => {
    setShowModalAddFaci(true);
  };
  const closeAddFaci = () => {
    resetField("faci_name");
    resetField("faci_room_number");
    resetField("faci_measure_unit");
    resetField("faci_low_price");
    resetField("faci_high_price");
    resetField("faci_discount");
    resetField("faci_tax_rate");
    resetField("faci_startdate");
    resetField("faci_enddate");
    resetField("faci_description");
    resetField("faci_hotel");
    setShowModalAddFaci(false);
  };

  const showEditFaci = (
    faciId,
    faciName,
    cagroId,
    faciRoom,
    faciMaxVacant,
    faciLowPrice,
    faciHighPrice,
    faciDiscount,
    faciTax,
    faciStartDate,
    faciEndDate,
    faciDesc
  ) => {
    setFaciId(faciId);
    setFaciName(faciName);
    setCagroId(cagroId);
    setFaciRoom(faciRoom);
    setFaciMax(faciMaxVacant);
    setFaciLowPrice(faciLowPrice);
    setFaciHighPrice(faciHighPrice);
    setFaciDiscount(faciDiscount);
    setFaciTax(faciTax);
    setFaciStartDate(faciStartDate);
    setFaciEndDate(faciEndDate);
    setFaciDesc(faciDesc);
    setShowModalEditFaci(true);
  };
  const closeEditFaci = () => {
    resetField("faci_id");
    resetField("faci_name");
    resetField("cagro_name");
    resetField("faci_room_number");
    resetField("faci_measure_unit");
    resetField("faci_low_price");
    resetField("faci_high_price");
    resetField("faci_discount");
    resetField("faci_tax");
    resetField("faci_startdate");
    resetField("faci_enddate");
    resetField("faci_description");
    resetField("faci_hotel_id");
    setShowModalEditFaci(false);
  };

  const showDeleteFaci = (faciId, faciName) => {
    setFaciId(faciId);
    setFaciName(faciName);
    setShowModalDeleteFaci(true);
  };

  const closeDeleteFaci = () => {
    setShowModalDeleteFaci(false);
  };
  return (
    <div>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Facilities Name</th>
            <th>Room Number</th>
            <th>Max Vacant</th>
            <th>Start End Date</th>
            <th>Range Price</th>
            <th>Discount</th>
            <th>Rate Price</th>
            <th>Tax</th>
            <th className="align-border-right">
              <button
                type="button"
                className="button-transparan"
                onClick={showAddFaci}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {getFaciResult ? (
            getFaciResult.map((facilities) => {
              const {
                faci_id,
                faci_name,
                faci_room_number,
                faci_measure_unit,
                faci_startdate,
                faci_enddate,
                faci_low_price,
                faci_high_price,
                faci_discount,
                faci_rate_price,
                faci_tax_rate,
                faci_description,
                faci_cagro_id,
              } = facilities;
              return (
                <tr key={faci_id}>
                  <td>{faci_id}</td>
                  <td>{faci_name}</td>
                  <td>{faci_room_number}</td>
                  <td>{faci_measure_unit}</td>
                  <td>
                    {faci_startdate} <br></br> {faci_enddate}
                  </td>
                  <td>
                    {faci_low_price} <br></br> {faci_high_price}
                  </td>
                  <td>{faci_discount}</td>
                  <td>{faci_rate_price}</td>
                  <td>{faci_tax_rate}</td>
                  <td>
                    <div className="dropdown">
                      <BsThreeDotsVertical
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <button
                              type="button"
                              className="button-update-transparan"
                              onClick={() =>
                                showEditFaci(
                                  faci_id,
                                  faci_name,
                                  faci_cagro_id,
                                  faci_room_number,
                                  faci_measure_unit,
                                  faci_low_price,
                                  faci_high_price,
                                  faci_discount,
                                  faci_tax_rate,
                                  faci_startdate,
                                  faci_enddate,
                                  faci_description
                                )
                              }
                            >
                              Edit
                            </button>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <button
                              type="button"
                              className="button-delete-transparan"
                              onClick={() => showDeleteFaci(faci_id, faci_name)}
                            >
                              Delete
                            </button>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Price History
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : getFaciLoading ? (
            <p>Loading . . .</p>
          ) : (
            <p>{getFaciError ? getFaciError : "Data Kosong"}</p>
          )}
        </tbody>
      </table>
      <AddFacilities
        showModalFaci={showModalAddFaci}
        handleCloseAddFaci={closeAddFaci}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        params_hotel_id={params_hotel_id}
        getCategoryResult={getCategoryResult}
      />

      <EditFacilities
        showModalFaci={showModalEditFaci}
        handleCloseEditFaci={closeEditFaci}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        faciId={faciId}
        faciName={faciName}
        cagroId={cagroId}
        faciRoom={faciRoom}
        faciMax={faciMax}
        faciLowPrice={faciLowPrice}
        faciHighPrice={faciHighPrice}
        faciDiscount={faciDiscount}
        faciTax={faciTax}
        faciStartDate={faciStartDate}
        faciEndDate={faciEndDate}
        faciDesc={faciDesc}
        setFaciId={setFaciId}
        setFaciName={setFaciName}
        setCagroId={setCagroId}
        setFaciRoom={setFaciRoom}
        setFaciMax={setFaciMax}
        setFaciLowPrice={setFaciLowPrice}
        setFaciHighPrice={setFaciHighPrice}
        setFaciDiscount={setFaciDiscount}
        setFaciTax={setFaciTax}
        setFaciStartDate={setFaciStartDate}
        setFaciEndDate={setFaciEndDate}
        setFaciDesc={setFaciDesc}
        params_hotel_id={params_hotel_id}
        getCategoryResult={getCategoryResult}
      />

      <DeleteFacilities
        showModalFaci={showModalDeleteFaci}
        handleCloseDeleteFaci={closeDeleteFaci}
        faciId={faciId}
        faciName={faciName}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default GetFacilities;
