import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import Search from "../search";
import AddHotel from "./modal/addHotel";
import EditHotel from "./modal/editHotel";
import DeleteHotel from "./modal/deleteHotel";

const GetHotel = (props) => {
  const { getHotelResult, getHotelLoading, getHotelError, getCityResult } =
    props;

  const { register, resetField, handleSubmit } = useForm();

  const [showModalAddHotel, setShowModalAddHotel] = useState(false);
  const [showModalEditHotel, setShowModalEditHotel] = useState(false);
  const [showModalDeleteHotel, setShowModalDeleteHotel] = useState(false);
  // const [showModalEditStatus, setShowModalEditStatus] = useState(false);

  const [addrId, setAddrId] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hotelStatus, setHotelStatus] = useState("");
  const [hotelCity, setHotelCity] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelRatingStar, setHotelRatingStar] = useState("");

  const [search, setSearch] = useState("");

  const showAddHotel = () => {
    setShowModalAddHotel(true);
  };
  const closeAddHotel = () => {
    resetField("hotel_name");
    resetField("hotel_phonenumber");
    resetField("hotel_status");
    resetField("addr_city_id");
    resetField("addr_line_1");
    resetField("hotel_description");
    resetField("hotel_ratingstar");
    setShowModalAddHotel(false);
  };

  const showEditHotel = (
    hotelId,
    hotelName,
    phoneNumber,
    hotelStatus,
    hotelCity,
    hotelAddress,
    hotelDescription,
    addrId
    // hotelRatingStar
  ) => {
    setHotelId(hotelId);
    setHotelName(hotelName);
    setPhoneNumber(phoneNumber);
    setHotelStatus(hotelStatus);
    setHotelCity(hotelCity);
    setHotelAddress(hotelAddress);
    setHotelDescription(hotelDescription);
    setAddrId(addrId);
    // setHotelRatingStar(hotelRatingStar);
    setShowModalEditHotel(true);
  };
  const closeEditHotel = () => {
    resetField("hotel_id");
    resetField("addr_id");
    resetField("hotel_name");
    resetField("hotel_phonenumber");
    resetField("hotel_status");
    resetField("addr_city_id");
    resetField("addr_line_1");
    resetField("hotel_description");
    resetField("hotel_ratingstar");
    setShowModalEditHotel(false);
  };

  const showDeleteHotel = (hotelName, hotelId) => {
    setHotelName(hotelName);
    setHotelId(hotelId);
    setShowModalDeleteHotel(true);
  };
  const closeDeleteHotel = () => {
    setShowModalDeleteHotel(false);
  };

  // const showEditStatus = (hotelId, hotelStatus) => {
  //   setHotelId(hotelId);
  //   setHotelStatus(hotelStatus);
  //   setShowModalEditStatus(true);
  // };
  // const closeEditStatus = () => {
  //   resetField("hotel_id");
  //   resetField("hotel_status");
  //   setShowModalEditStatus(false);
  // };

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
            <th>Modified Data</th>
            <th>Status</th>
            <th className="align-border-right">
              <button
                type="button"
                className="button-transparan"
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
                  <td>{hotel_rating_star}</td>
                  <td>{hotel_phonenumber}</td>
                  <td>{hotel_modified_date}</td>
                  <td>{hotel_status}</td>
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
                                showDeleteHotel(hotel_name, hotel_id)
                              }
                            >
                              Delete
                            </button>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <Link to={"/hotel/facilities/" + hotel_id}>
                              Facilities
                            </Link>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <button
                              type="button"
                              className="button-update-transparan"
                              // onClick={() =>
                              //   showEditStatus(hotel_id, hotel_status)
                              // }
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
        resetField={resetField}
        handleSubmit={handleSubmit}
        getCityResult={getCityResult}
      />

      <EditHotel
        showModalHotel={showModalEditHotel}
        handleCloseEditHotel={closeEditHotel}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        addrId={addrId}
        hotelId={hotelId}
        hotelName={hotelName}
        phoneNumber={phoneNumber}
        hotelStatus={hotelStatus}
        hotelCity={hotelCity}
        hotelAddress={hotelAddress}
        hotelDescription={hotelDescription}
        hotelRatingStar={hotelRatingStar}
        setAddrId={setAddrId}
        setHotelId={setHotelId}
        setHotelName={setHotelName}
        setPhoneNumber={setPhoneNumber}
        setHotelStatus={setHotelStatus}
        setHotelCity={setHotelCity}
        setHotelAddress={setHotelAddress}
        setHotelDescription={setHotelDescription}
        setHotelRatingStar={setHotelRatingStar}
        getCityResult={getCityResult}
      />

      <DeleteHotel
        showModalHotel={showModalDeleteHotel}
        handleCloseDeleteHotel={closeDeleteHotel}
        hotelId={hotelId}
        hotelName={hotelName}
        handleSubmit={handleSubmit}
      />

      {/* <Status
        showModalStatus={showModalEditStatus}
        handleCloseEditStatus={closeEditStatus}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        hotelId={hotelId}
        hotelStatus={hotelStatus}
        setHotelId={setHotelId}
        setHotelStatus={setHotelStatus}
      /> */}
    </div>
  );
};

export default GetHotel;
