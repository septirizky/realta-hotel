import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/sidebarmaster.css";

const SidebarMaster = () => {
  return (
    <div className="sidebar-master">
      <div className="sidebar-master">
        <p className="menus">Menus</p>
        <NavLink to="/master/locations">Locations</NavLink>
        <NavLink to="/master/policy">Policy</NavLink>
        <NavLink to="/master/cagro">Category Group</NavLink>
        <NavLink to="/master/priceitems">Price Items</NavLink>
        <NavLink to="/master/seta">Service Task</NavLink>
      </div>
    </div>
  );
};

export default SidebarMaster;
