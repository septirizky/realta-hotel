import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPhoto } from "../../actions/facilitiesAction";
import { FiTrash } from "react-icons/fi";

const Photo = () => {
  const { getPhotoResult, getPhotoLoading, getPhotoError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const params = useParams();

  const [faciId, setFaciId] = useState("");

  useEffect(() => {
    setFaciId(params.faci_id);
    dispatch(getPhoto(params.faci_id));
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <div>
      <h1>Photo</h1>
      <nav className="bread-divider" aria-label="breadcrumb">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <Link to="/hotel">Hotel</Link>
          </li>
          <li class="breadcrumb-item active">Facilities</li>
          <li class="breadcrumb-item active">Photo</li>
        </ol>
      </nav>
      <section className="menu" id="menu">
        <div class="menu row">
          {getPhotoResult ? (
            getPhotoResult.map((photo) => {
              const { faciId, fapho_id, fapho_url } = photo;
              return (
                <div key={fapho_id} className="col-sm-3">
                  <div className="card">
                    <img
                      className="card-img-top p-3"
                      src={fapho_url}
                      style={{ maxWidth: "300px" }}
                    ></img>
                    <div className="card-body center">
                      <input
                        type="radio"
                        name="poli_id"
                        id={`fapho_id${fapho_id}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : getPhotoLoading ? (
            <p>Loading . . .</p>
          ) : (
            <p>{getPhotoError ? getPhotoError : "Data Kosong"}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Photo;
