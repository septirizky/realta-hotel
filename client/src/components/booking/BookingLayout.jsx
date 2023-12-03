import React from "react";
import { Link, Outlet } from "react-router-dom";

const BookingLayout = () => {
  return (
    <div>
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
};

export default BookingLayout;
