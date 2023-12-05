import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import Search from "./search.js";
import { Link } from "react-router-dom";
import AddMenu from "./modal/addMenu";
import EditMenu from "./modal/editMenu";
import DeleteMenu from "./modal/deleteMenu";
import Upload from "./modal/uploadPhoto.js";

const GetResto = (props) => {
  const { getMenuResult, getMenuLoading, getMenuError } = props;

  const { register, resetField, handleSubmit, reset, setValue } = useForm();

  const [showModalAddMenu, setShowModalAddMenu] = useState(false);
  const [showModalEditMenu, setShowModalEditMenu] = useState(false);
  const [showModalDeleteMenu, setShowModalDeleteMenu] = useState(false);
  const [showModalAddPhoto, setShowModalAddPhoto] = useState (false)

  const [menuId, setMenuId] = useState();
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setPrice] = useState("");
  const [menuType, setType] = useState("");
  const [menuStatus, setStatus] = useState("");
  const [menuDescription, setDescription] = useState("");
  // const [menuPhotoName, setPhotoName] = useState("");

  const [search, setSearch] = useState("");

  const showAddMenu = () => {
    setShowModalAddMenu(true);
  };
  const closeAddMenu = () => {
    resetField("reme_name");
    resetField("reme_price");
    resetField("reme_type");
    resetField("reme_status");
    resetField("reme_description");
    setShowModalAddMenu(false);
  };

  const showAddPhoto = () => {
    setShowModalAddPhoto(true);
  };
  const closeAddPhoto = () => {
    reset()
    setShowModalAddPhoto(false);
  };

  const showEditMenu = (menuId, menuName, menuPrice, menuType, menuStatus, menuDescription) => {
    setMenuId(menuId);
    setMenuName(menuName);
    setPrice(menuPrice);
    setType(menuType);
    setStatus(menuStatus);
    setDescription(menuDescription);
    setShowModalEditMenu(true);
  };
  const closeEditMenu = () => {
    resetField("reme_id");
    resetField("reme_name");
    resetField("reme_price");
    resetField("reme_type");
    resetField("reme_status");
    resetField("reme_description");
    setShowModalEditMenu(false);
  };

  const showDeleteMenu = (menuName, menuId) => {
    setMenuName(menuName);
    setMenuId(menuId);
    setShowModalDeleteMenu(true);
  };
  const closeDeleteMenu = () => {
    setShowModalDeleteMenu(false);
  };

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <table className="table table-striped table-hover align-middle text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Menu Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Status</th>
            <th className="align-border-right">
              <button
                type="button"
                className="button-transparan"
                onClick={showAddMenu}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {getMenuResult ? (
            getMenuResult.map((menu) => {
              const { reme_id, reme_name, reme_price, reme_type, reme_status, reme_description } =
                menu;
              return (
                <tr key={reme_id}>
                  <td>{reme_id}</td>
                  <td>{reme_name}</td>
                  <td>{reme_price}</td>
                  <td>{reme_type}</td>
                  <td>{reme_status}</td>
                  
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
                                showEditMenu(
                                  reme_id,
                                  reme_name,
                                  reme_price,
                                  reme_type,
                                  reme_status,
                                  reme_description
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
                              className="button-update-transparan"
                              onClick={() =>{
                                setMenuId(reme_id);
                                showAddPhoto()
                                }
                              }
                            >
                              Upload Photo
                            </button>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <button
                              type="button"
                              className="button-delete-transparan"
                              onClick={() => showDeleteMenu(reme_name, reme_id)}
                            >
                              Delete
                            </button>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : getMenuLoading ? (
            <p>Loading . . .</p>
          ) : (
            <p>{getMenuError ? getMenuError : "Data Kosong"}</p>
          )}
        </tbody>
      </table>
      <AddMenu
        showModalMenu={showModalAddMenu}
        handleCloseAddMenu={closeAddMenu}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
      />

      <EditMenu
        showModalMenu={showModalEditMenu}
        handleCloseEditMenu={closeEditMenu}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        menuId={menuId}
        menuName={menuName}
        menuPrice={menuPrice}
        menuType={menuType}
        menuStatus={menuStatus}
        menuDescription={menuDescription}
        setMenuId={setMenuId}
        setMenuName={setMenuName}
        setPrice={setPrice}
        setType={setType}
        setStatus={setStatus}
        setDescription={setDescription}
      />

      <DeleteMenu
        showModalMenu={showModalDeleteMenu}
        handleCloseDeleteMenu={closeDeleteMenu}
        menuId={menuId}
        menuName={menuName}
        handleSubmit={handleSubmit}
      />

<Upload
        showModalPhoto={showModalAddPhoto}
        handleCloseAddPhoto={closeAddPhoto}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
        params_reme_id={menuId}
        setValue={setValue}
      />
    </div>
  );
};

export default GetResto;
