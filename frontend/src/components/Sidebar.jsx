import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { logout } from '../features/AuthSlice.js';
import { NavLink , useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome } from "react-icons/io5";


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); 
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/patients"}>
              <IoPricetag /> Patients
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <hr />
        <button
          className="button is-danger is-light ml-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;