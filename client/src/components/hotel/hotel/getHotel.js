import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import Search from "../search";
import AddHotel from "./modal/addHotel";
import EditHotel from "./modal/editHotel";
import DeleteHotel from "./modal/deleteHotel";
import SwitchStatus from "./modal/switchStatus";
import { format } from "date-fns";
import GetStarRating from "../rating";

const GetHotel = (props) => {
  const { getHotelResult, getHotelLoading, getHotelError, getCityResult } =
    props;

  const { register, handleSubmit, reset } = useForm();

  const [showModalAddHotel, setShowModalAddHotel] = useState(false);
  const [showModalEditHotel, setShowModalEditHotel] = useState(false);
  const [showModalDeleteHotel, setShowModalDeleteHotel] = useState(false);
  const [showModalSwitchStatus, setShowModalSwitchStatus] = useState(false);

  const [search, setSearch] = useState("");

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
      <Search search={search} setSearch={setSearch} />
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Hotel Name</th>
            <th>Rating Star</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Modified Data</th>
            <th className="align-border-right">
              <button
                type="button"
                className="btn btn-warning text-white"
                onClick={showAddHotel}
              >
                Add
              </button>
            </th>
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
                    <Link to={"/hotel/facilities/" + hotel_id}>
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
                        <li>
                          <a className="dropdown-item" href="#">
                            <button
                              type="button"
                              className="button-update-transparan"
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
                              Edit
                            </button>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
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
                          <a className="dropdown-item" href="#">
                            <button
                              type="button"
                              className="button-update-transparan"
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
