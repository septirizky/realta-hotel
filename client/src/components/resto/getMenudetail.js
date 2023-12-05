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
                  <img
                  className="card-img-top p-3" 
                  src={menu.resto_menu_photos[0].remp_url} 
                  style={{ maxWidth: "200px" }}></img>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{reme_name}</h5>
                    <p className="card-text text-break">{reme_description}</p>
                    <p className="card-text">{reme_status}</p>
                    <p className="card-text">{reme_type}</p>
                    <p className="card-text">{reme_price}</p>
                    <a href="#" className="btn">
                add to cart
              </a>
                  </div>
                  {/* <h3>{reme_name}</h3>
                  <h5>{reme_description}</h5>
                  <h5>{reme_type}</h5>
                  <h5>{reme_status}</h5>
                  <h4>{reme_price}</h4>
                  <a href="#" className="btn">
                add to cart
              </a> */}
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

// {/* <>
//         {getMenuDetailResult ? (
//           getMenuDetailResult.map((menu) => (
//             <div
//               id={menu.reme_id}
//               key={menu.reme_id}
//               className="col-md-3 col-sm-3 col-xs-3 col-3 mb-4"
//             >
//               <div className="card text-center h-60" key={menu.stock_id}>
//                 <img
//                   className="card-img-top p-3"
//                   src={`menu.resto_menu_photos[0].remp_url`}
//                   alt="Card"
//                   height={300}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{menu.reme_name}...</h5>
//                   <p className="card-text">{menu.reme_description}...</p>
//                   <p className="card-text">
//                     Status : {menu.reme_status}
//                   </p>
//                   <p className="card-text">
//                     Type : {menu.reme_type}
//                   </p>
//                 </div>
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item lead">
//                     {menu.reme_price}
//                   </li>
//                 </ul>
//                 <div className="card-body">
//                 <a href="#" className="btn">
//                  add to cart
//                </a>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : getMenuDetailLoading ? (
//           <p> Loading . . .</p>
//         ) : (
//           <p> {getMenuDetailError ? getMenuDetailError : "Data Kosong"}</p>
//         )}
//       </> */}
    );
  };

export default GetMenuDetail;
