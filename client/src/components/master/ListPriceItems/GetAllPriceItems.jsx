import React from "react";
import SearchItems from "./Search";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const GetAllPriceItems = (props) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const {
    getIPriceResult,
    getIPriceLoading,
    getIPriceError,
    kueri1,
    setKueri1,
    kueri2,
    setKueri2,
    searchData,
  } = props;

  return (
    <>
      <div className="border border-black container-fluid py-3">
        Price Items
      </div>
      <SearchItems
        kueri1={kueri1}
        setKueri1={setKueri1}
        kueri2={kueri2}
        setKueri2={setKueri2}
        searchData={searchData}
      />
      <table>
        <thead className="color-gray-thead">
          <tr>
            <th></th>
            <th>#</th>
            <th className="text-center">Item Name</th>
            <th className="text-center">Price</th>
            <th className="text-center"></th>
            <th>Type</th>
            <th className="align-border-right">
              <AiOutlinePlus /> Add
            </th>
          </tr>
        </thead>
        {getIPriceResult && getIPriceResult ? (
          getIPriceResult.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={7}>Data Price Items is Not Found!</td>
              </tr>
            </tbody>
          ) : (
            getIPriceResult.map((iprice, index) => {
              return (
                <tbody key={iprice.prit_id}>
                  <tr>
                    <td>
                      <img
                        src={iprice.prit_icon_url}
                        alt={iprice.prit_icon}
                        width={30}
                        height={30}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td className="text-start">{iprice.prit_name}</td>
                    <td className="text-end">
                      {formatRupiah(iprice.prit_price)}
                    </td>
                    <td className="text-end">
                      <MdKeyboardDoubleArrowRight />
                    </td>
                    <td>{iprice.prit_type}</td>
                    <td className="align-border-right">
                      <FaPencilAlt /> Edit <FaTimes /> Delete
                    </td>
                  </tr>
                </tbody>
              );
            })
          )
        ) : getIPriceLoading ? (
          <tbody>
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          </tbody>
        ) : getIPriceError ? (
          <tbody>
            <tr>
              <td colSpan={7}>{getIPriceError}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={7}>Data Item Price is Empty</td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
};

export default GetAllPriceItems;
