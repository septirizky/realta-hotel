import React, { useState } from "react";
import SearchItems from "./Search";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DetailPriceItems from "./modal/DetailPriceItems";

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

  const [showModalDetailItemPrice, setShowModalDetailItemPrice] =
    useState(false);

  const [itemPriceId, setItemPriceId] = useState();

  const [itemPriceName, setItemPriceName] = useState("");

  const [itemPricePrit, setItemPricePrit] = useState("");

  const [itemPriceDescription, setItemPriceDescription] = useState("");

  const [itemPriceType, setItemPriceType] = useState("");

  const [itemPriceIcon, setItemPriceIcon] = useState("");

  const getShowDetailItemPrice = (
    itemPriceId,
    itemPriceName,
    itemPricePrit,
    itemPriceDescription,
    itemPriceType,
    itemPriceIcon
  ) => {
    setItemPriceId(itemPriceId);
    setItemPriceName(itemPriceName);
    setItemPricePrit(itemPricePrit);
    setItemPriceDescription(itemPriceDescription);
    setItemPriceType(itemPriceType);
    setItemPriceIcon(itemPriceIcon);
    setShowModalDetailItemPrice(true);
  };

  const closeDetailItemPrice = () => {
    setShowModalDetailItemPrice(false);
  };

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
                        className="rounded-circle"
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
                      <button
                        type="button"
                        className="button-detail-transparan"
                        onClick={() =>
                          getShowDetailItemPrice(
                            iprice.prit_id,
                            iprice.prit_name,
                            iprice.prit_price,
                            iprice.prit_description,
                            iprice.prit_type,
                            iprice.prit_icon_url
                          )
                        }
                      >
                        <MdKeyboardDoubleArrowRight />
                      </button>
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

      <DetailPriceItems
        showModalItemPrice={showModalDetailItemPrice}
        handleCloseDetailItemPrice={closeDetailItemPrice}
        itemPriceId={itemPriceId}
        itemPriceName={itemPriceName}
        itemPricePrit={itemPricePrit}
        itemPriceDescription={itemPriceDescription}
        itemPriceType={itemPriceType}
        itemPriceIcon={itemPriceIcon}
      />
    </>
  );
};

export default GetAllPriceItems;
