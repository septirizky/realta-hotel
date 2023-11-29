import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/sidebarmaster.css";
import { FaLocationArrow, FaServicestack } from "react-icons/fa";
import { MdCategory, MdPolicy } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";

const SidebarMaster = () => {
  return (
    <div className="sidebar-master">
      <div className="sidebar-master">
        <p className="menus">Menus</p>
        <NavLink to="/master/locations">
          <FaLocationArrow className="fs-6 me-2" />
          Locations
        </NavLink>
        <NavLink to="/master/policy">
          <MdPolicy className="fs-5 me-2" />
          Policy
        </NavLink>
        <NavLink to="/master/cagro">
          <MdCategory className="fs-5 me-2" />
          Category Group
        </NavLink>
        <NavLink to="/master/priceitems">
          <IoMdPricetag className="fs-5 me-2" />
          Price Items
        </NavLink>
        <NavLink to="/master/seta">
          <FaServicestack className="fs-5 me-2" />
          Service Task
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarMaster;
