import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import Search from "./searchdet";
import { Link } from "react-router-dom";

const GetMenuDetail = (props) => {
  const { getMenuDetailResult, getMenuDetailLoading, getMenuDetailError } = props;

//   const { register, resetField, handleSubmit } = useForm();

//   const [menuId, setMenuId] = useState();
//   const [menuName, setMenuName] = useState("");
//   const [menuPrice, setPrice] = useState("");
//   const [menuType, setType] = useState("");
//   const [menuStatus, setStatus] = useState("");
//   const [menuDescription, setDescription] = useState("");

  const [search, setSearch] = useState("");


  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <section className="menu" id="menu">
        <div class="menu row">
          {getMenuDetailResult ? (
            getMenuDetailResult.map((menu) => {
              const { reme_id, reme_name, reme_price, reme_type, reme_status, reme_description } =
                menu;
              return (
                <div key={reme_id} className="col-sm-3">
                  <div className="box">
                  <img src={menu.resto_menu_photos[0].remp_url} style={{ maxWidth: "200px" }}></img>
                  </div>
                  <h3>{reme_name}</h3>
                  <h5>{reme_description}</h5>
                  <h5>{reme_type}</h5>
                  <h5>{reme_status}</h5>
                  <h4>{reme_price}</h4>
                </div>
              );
            })
          ) : getMenuDetailLoading ? (
            <p>Loading . . .</p>
          ) : (
            <p>{getMenuDetailError ? getMenuDetailError : "Data Kosong"}</p>
          )}
        </div>
      
      </section>
    </div>
  );
};

export default GetMenuDetail;
