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

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const { register, handleSubmit, reset } = useForm();

  const [showModalAddFaci, setShowModalAddFaci] = useState(false);
  const [showModalEditFaci, setShowModalEditFaci] = useState(false);
  const [showModalDeleteFaci, setShowModalDeleteFaci] = useState(false);

  const [facility, setFacility] = useState({
    faciId: "",
    name: "",
    cagro_id: "",
    room_number: "",
    max_vacant: "",
    low_price: "",
    high_price: "",
    discount: "",
    tax: "",
    startdate: "",
    enddate: "",
    description: "",
    rate_price: "",
    hotel_id: "",
  });

  const showAddFaci = () => {
    setShowModalAddFaci(true);
  };
  const closeAddFaci = () => {
    reset();
    setShowModalAddFaci(false);
  };

  const showEditFaci = (
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
  ) => {
    // const hasil =
    setFacility({
      faciId: faci_id,
      name: faci_name,
      cagro_id: faci_cagro_id,
      room_number: faci_room_number,
      max_vacant: faci_measure_unit,
      low_price: faci_low_price,
      high_price: faci_high_price,
      discount: faci_discount,
      tax: faci_tax_rate,
      startdate: faci_startdate,
      enddate: faci_enddate,
      description: faci_description,
      // rate_price: "",
      hotel_id: params_hotel_id,
    });
    setShowModalEditFaci(true);
  };
  const closeEditFaci = () => {
    reset();
    setShowModalEditFaci(false);
  };

  const showDeleteFaci = (faci_id, faci_name) => {
    setFacility({
      faciId: faci_id,
      name: faci_name,
    });
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
                    {faci_startdate}
                    <br />
                    {faci_enddate}
                  </td>
                  <td>
                    {formatRupiah(faci_low_price)} <br />
                    {formatRupiah(faci_high_price)}
                  </td>
                  <td>{faci_discount} %</td>
                  <td>{formatRupiah(faci_rate_price)}</td>
                  <td>{faci_tax_rate} %</td>
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
        handleSubmit={handleSubmit}
        reset={reset}
        params_hotel_id={params_hotel_id}
        getCategoryResult={getCategoryResult}
      />

      <EditFacilities
        showModalFaci={showModalEditFaci}
        handleCloseEditFaci={closeEditFaci}
        handleSubmit={handleSubmit}
        reset={reset}
        facility={facility}
        setFacility={setFacility}
        getCategoryResult={getCategoryResult}
      />

      <DeleteFacilities
        showModalFaci={showModalDeleteFaci}
        handleCloseDeleteFaci={closeDeleteFaci}
        facility={facility}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default GetFacilities;
