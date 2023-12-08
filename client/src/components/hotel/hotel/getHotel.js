import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import AddHotel from "./modal/addHotel";
import EditHotel from "./modal/editHotel";
import DeleteHotel from "./modal/deleteHotel";
import SwitchStatus from "./modal/switchStatus";
import { format } from "date-fns";
import GetStarRating from "../rating";

const GetHotel = (props) => {
  const {
    getHotelResult,
    getHotelLoading,
    getHotelError,
    getCityResult,
    search,
    setSearch,
  } = props;

  const { register, handleSubmit, reset } = useForm();

  const [showModalAddHotel, setShowModalAddHotel] = useState(false);
  const [showModalEditHotel, setShowModalEditHotel] = useState(false);
  const [showModalDeleteHotel, setShowModalDeleteHotel] = useState(false);
  const [showModalSwitchStatus, setShowModalSwitchStatus] = useState(false);

  const [hotel, setHotel] = useState({
    hotelId: "",
    name: "",
    phonenumber: "",
    status: "",
    city: "",
    address: "",
    description: "",
    addr_id: "",
    ratingstar: "",
  });

  const showAddHotel = () => {
    setShowModalAddHotel(true);
  };
  const closeAddHotel = () => {
    reset();
    setShowModalAddHotel(false);
  };

  const showEditHotel = (
    hotel_id,
    hotel_name,
    hotel_phonenumber,
    hotel_status,
    city,
    address,
    hotel_description,
    hotel_addr_id
  ) => {
    setHotel({
      hotelId: hotel_id,
      name: hotel_name,
      phonenumber: hotel_phonenumber,
      status: hotel_status,
      city: city,
      address: address,
      description: hotel_description,
      addr_id: hotel_addr_id,
    });
    setShowModalEditHotel(true);
  };
  const closeEditHotel = () => {
    reset();
    setShowModalEditHotel(false);
  };

  const showDeleteHotel = (hotel_id, hotel_name) => {
    setHotel({
      hotelId: hotel_id,
      name: hotel_name,
    });
    setShowModalDeleteHotel(true);
  };
  const closeDeleteHotel = () => {
    setShowModalDeleteHotel(false);
  };

  const showSwitchStatus = (hotel_id, hotel_status) => {
    setHotel({
      hotelId: hotel_id,
      status: hotel_status,
    });
    setShowModalSwitchStatus(true);
  };
  const closeSwitchStatus = () => {
    reset();
    setShowModalSwitchStatus(false);
  };
  return (
    <div>
      <div className="row mb-4 justify-content-between">
        <div className="col-sm-3 align-content-center mt-2">
          <button
            type="button"
            className="btn custom-btn-yellow"
            onClick={showAddHotel}
          >
            <BiPlus size="26" />
            Add Hotel
          </button>
        </div>
        <div className="col-sm-3">
          <div className="form-floating">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="form-control text-dark form-control-sm"
              id="searchDept"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="searchDept">Search Hotel</label>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover align-middle left-justify">
        <thead>
          <tr>
            <th>Id</th>
            <th>Hotel Name</th>
            <th>Rating Star</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Modified Data</th>
            <th className="text-end"></th>
          </tr>
        </thead>
        <tbody>
          {getHotelResult ? (
            getHotelResult.map((hotel) => {
              const {
                hotel_id,
                hotel_name,
                hotel_phonenumber,
                hotel_description,
                hotel_rating_star,
                hotel_modified_date,
                hotel_status,
                hotel_addr,
                hotel_addr_id,
              } = hotel;
              return (
                <tr key={hotel_id}>
                  <td>{hotel_id}</td>
                  <td>
                    <Link
                      to={
                        "/hotel/facilities/" +
                        hotel_id +
                        "/" +
                        hotel_name +
                        "/" +
                        hotel_phonenumber
                      }
                    >
                      {hotel_name}
                    </Link>
                  </td>
                  <td>{GetStarRating(hotel_rating_star)}</td>
                  <td>{hotel_phonenumber}</td>
                  <td>{hotel_status}</td>
                  <td>{format(new Date(hotel_modified_date), "ii LLL YYY")}</td>
                  <td>
                    <div className="dropdown">
                      <BsThreeDotsVertical
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu">
                        <li
                          onClick={() =>
                            showEditHotel(
                              hotel_id,
                              hotel_name,
                              hotel_phonenumber,
                              hotel_status,
                              hotel_addr.addr_city_id,
                              hotel_addr.addr_line_1,
                              hotel_description,
                              hotel_addr_id
                            )
                          }
                        >
                          <a
                            className="dropdown-item custom-hover-yellow"
                            href="#"
                          >
                            <FiEdit size="16" /> Edit
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item custom-hover-yellow text-danger"
                            href="#"
                          >
                            <FiTrash size="16" />
                            <button
                              type="button"
                              className="button-delete-transparan"
                              onClick={() =>
                                showDeleteHotel(hotel_id, hotel_name)
                              }
                            >
                              Delete
                            </button>
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item custom-hover-yellow"
                            href="#"
                          >
                            <HiOutlineSwitchHorizontal />
                            <button
                              type="button"
                              className="button-update-transparan text-black"
                              onClick={() =>
                                showSwitchStatus(hotel_id, hotel_status)
                              }
                            >
                              Switch Status
                            </button>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : getHotelLoading ? (
            <p>Loading . . .</p>
          ) : (
            <p>{getHotelError ? getHotelError : "Data Kosong"}</p>
          )}
        </tbody>
      </table>
      <AddHotel
        showModalHotel={showModalAddHotel}
        handleCloseAddHotel={closeAddHotel}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
        getCityResult={getCityResult}
      />

      <EditHotel
        showModalHotel={showModalEditHotel}
        handleCloseEditHotel={closeEditHotel}
        handleSubmit={handleSubmit}
        reset={reset}
        hotel={hotel}
        setHotel={setHotel}
        getCityResult={getCityResult}
      />

      <DeleteHotel
        showModalHotel={showModalDeleteHotel}
        handleCloseDeleteHotel={closeDeleteHotel}
        hotel={hotel}
        handleSubmit={handleSubmit}
      />

      <SwitchStatus
        showModalHotel={showModalSwitchStatus}
        handleCloseSwitchStatus={closeSwitchStatus}
        handleSubmit={handleSubmit}
        reset={reset}
        hotel={hotel}
        setHotel={setHotel}
      />
    </div>
  );
};

export default GetHotel;
