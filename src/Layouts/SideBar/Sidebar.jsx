import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/dimah.jpeg";
import { FaCloudscale, FaUserPlus, FaIdCard } from "react-icons/fa";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "bootstrap";

function Sidebar(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="h-100 sidebar  flex-wrap">
      <div className="LogoPosition d-flex justify-content-center align-items-center flex-wrap mt-2">
        {/* <img src={logo} width="60px" className="logo" alt="" /> */}
        <span className="brandName text-light w-100 text-center mt-2">
           مرکز تخصصی دیماه تابان
        </span>
      </div>
      <div className="Menu">
        <ul>
          <NavLink
            className="li"
            exact
            to="/dashboard"
            activeClassName="activeMenu"
          >
            <FaCloudscale className="sidebarMenuIcon" /> داشبورد
          </NavLink>
          <NavLink
            className="li"
            exact
            to="/dashboard/users"
            activeClassName="activeMenu"
          >
            <FaIdCard className="sidebarMenuIcon" /> نمایش اپراتورها
          </NavLink>
          <NavLink
            className="li"
            exact
            to="/confrim"
            activeClassName="activeMenu"
            onClick={handleClickOpen}
          >
            خروج از حساب کاربری
          </NavLink>
        </ul>
      </div>
      <div className="support">
        <p>
          دكترسجادنظري <br></br>جراح ومتخصص پوست ومو <br></br>کاشت ابرو، مو،ریش{" "}
          <br></br>تزریق ژل بوتاکس لیزرموي زائد<br></br> لیزرجوانسازی،<br></br>
          ریموتاتو،زنان
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
