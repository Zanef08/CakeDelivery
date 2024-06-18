import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/addCake" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Cake</p>
        </NavLink>
        <NavLink to="/listCakes" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Cakes</p>
        </NavLink>
        <NavLink to="/viewOrders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>View Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
