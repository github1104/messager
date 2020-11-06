import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions";
import SearchIcon from "@material-ui/icons/Search";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div style={{ display: "flex" }}>
        <div className="logo">
          <NavLink to={"/"}>Web Messenger</NavLink>
        </div>
        {/* <div className="search">
                    <div className="searchIcon">
                        <SearchIcon />
                    </div>
                   
                </div> */}
        {!auth.authenticated ? (
          <ul className="leftMenu">
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/signup"}>Sign up</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
      <div style={{ margin: "20px 0", color: "#fff", fontWeight: "bold" }}>
        {auth.authenticated ? `Hi ${auth.nameUser}` : null}
      </div>
      {auth.authenticated ? (
        <ul className="menu">
          <li>
            <Link to={"/Info"} onClick={() => {}}>
              Info
            </Link>
          </li>
          <li style={{ marginLeft: 20 }}>
            <Link
              to={"#"}
              onClick={() => {
                dispatch(logout(auth.uid));
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  );
};

export default Header;
