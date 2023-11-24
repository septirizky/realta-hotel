import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarMaster from "./layout/sidebar/sidebarMaster";
import GetAllPriceItems from "./ListPriceItems/GetAllPriceItems";
import { useDispatch, useSelector } from "react-redux";
import { getItemPrice } from "../../actions/masterAction";

const PriceItems = () => {
  const { getIPriceResult, getIPriceLoading, getIPriceError } = useSelector(
    (state) => state.masterReducer
  );

  const [keyItem, setKeyItems] = useState("");
  const [keyType, setKeyType] = useState("");
  // eslint-disable-next-line
  const [cari, setCari] = useState([]);
  const [kueri1, setKueri1] = useState("");
  const [kueri2, setKueri2] = useState("");

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
  }, [dispatch, keyItem, keyType]);

  const searchData = (e) => {
    e.preventDefault();
    setKeyItems(kueri1);
    setKeyType(kueri2);
  };

  return (
    <>
      <div className="border border-black container-fluid pt-3 hp-mini">
        <nav aria-label="breadcrumb">
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
      <div className="content-utama-master">
        <SidebarMaster />
        <div className="content-master">
          <GetAllPriceItems
            getIPriceResult={getIPriceResult}
            getIPriceLoading={getIPriceLoading}
            getIPriceError={getIPriceError}
            kueri1={kueri1}
            setKueri1={setKueri1}
            kueri2={kueri2}
            setKueri2={setKueri2}
            searchData={searchData}
          />
        </div>
      </div>
    </>
  );
};

export default PriceItems;
