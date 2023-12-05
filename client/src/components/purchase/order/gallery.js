import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GetGallery, addCart } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PurchaseLayout } from "../../../components/purchase/layout/sidebar";

const Products = () => {
  const { getGalleryResult, getGalleryLoading, getGalleryError } = useSelector(
    (state) => state.PurchaseReducer
  );
  const [listuser, setItems] = useState([]);
  console.log(listuser, "456");
  const getItems = () => {
    axios({
      method: "GET",
      url: `http://localhost:4000/listgalleryphoto`,
    })
      .then((result) => {
        setItems(result.data.data);
        console.log(result.data.data, "123");
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGallery());

    getItems();
  }, [dispatch]);

  const addProduct = (listuser) => {
    dispatch(addCart(listuser));
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        {listuser ? (
          listuser.map((listuser) => (
            <div
              id={listuser.stock_id}
              key={listuser.stock_id}
              className="col-md-3 col-sm-1 col-xs-1 col-1 mb-4"
            >
              <div className="card text-center h-60" key={listuser.stock_id}>
                <img
                  className="card-img-top p-3"
                  src={`http://localhost:4000/pictstockphoto/${listuser.spho_photo_filename}`}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">{listuser.stock_name}...</h5>
                  <p className="card-text">{listuser.stock_description}...</p>
                  <p className="card-text">
                    Stocked : {listuser.stock_quantity}
                  </p>
                  <p className="card-text">
                    Re-Order : {listuser.stock_reorder_point}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">
                    {listuser.vepro_price}
                  </li>
                </ul>
                <div className="card-body">
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(listuser)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : getGalleryLoading ? (
          <p> Loading . . .</p>
        ) : (
          <p> {getGalleryError ? getGalleryError : "Data Kosong"}</p>
        )}
      </>
    );
  };
  return (
    <>
      <div className="container my-1 py-1">
        <div className="row">
          <div className="col-12"></div>
        </div>
        <div className="row justify-content-center">
          <ShowProducts />
        </div>
      </div>
    </>
  );
};

export default Products;
