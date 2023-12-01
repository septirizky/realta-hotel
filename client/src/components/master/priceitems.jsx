import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import GetAllPriceItems from "./ListPriceItems/GetAllPriceItems";
import { useDispatch, useSelector } from "react-redux";
import { getItemPrice } from "../../actions/masterAction";

const PriceItems = () => {
  const {
    getIPriceResult,
    getIPriceLoading,
    getIPriceError,
    postIPriceResult,
    updateIPriceResult,
    deleteIPriceResult,
  } = useSelector((state) => state.masterReducer);

  const [keyItem, setKeyItems] = useState("");
  const [keyType, setKeyType] = useState("");
  // eslint-disable-next-line
  const [cari, setCari] = useState([]);
  const [kueri1, setKueri1] = useState("");

  const searchItemsPrice = () => {
    const res = dispatch(
      getItemPrice({ prit_name: keyItem, prit_type: keyType })
    );
    setCari(res);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    searchItemsPrice();
    // eslint-disable-next-line
  }, [
    dispatch,
    keyItem,
    keyType,
    postIPriceResult,
    updateIPriceResult,
    deleteIPriceResult,
  ]);

  const searchData = (e) => {
    e.preventDefault();
    setKeyItems(kueri1);
  };

  return (
    <>
      <div className="border border-black container-fluid pt-3 mb-3">
        <nav className="bread-separator" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FaHome className="me-2" />
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/master">Master</Link>
            </li>
            <li className="breadcrumb-item active">Price Items</li>
          </ol>
        </nav>
      </div>
      <GetAllPriceItems
        getIPriceResult={getIPriceResult}
        getIPriceLoading={getIPriceLoading}
        getIPriceError={getIPriceError}
        kueri1={kueri1}
        setKueri1={setKueri1}
        kueri2={keyType}
        setKueri2={setKeyType}
        searchData={searchData}
      />
    </>
  );
};

export default PriceItems;
