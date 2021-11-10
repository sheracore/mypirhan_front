import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mypirhan
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/admin-dashboard">
              داشبورد مدیریت
            </NavLink>
            {/* <NavLink className="nav-link" aria-current="page" to="/movies">فیلم ها</NavLink> */}
            <NavLink className="nav-link" to="/home">
              خانه
            </NavLink>
            <NavLink className="nav-link" to="/rental">
              سبد خرید
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/login">
                  وررد
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  ثبت نام
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/me">
                  {user.username}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  خروج
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
