import React, { useContext, useState } from "react";
import "../styles/Header.css";
import Logo from "../images/logo.png";

import { AuthContext } from "../helpers/AuthContext";

function Header() {
  const [menu, setMenu] = useState(true);
  //Auth context
  const { authState, setAuthState } = useContext(AuthContext);

  //Logging out
  const logout = () => {
    //Remove the accesstoken from localstorage
    localStorage.removeItem("accessToken");

    //Set auth context to logout state
    setAuthState({
      email: "",
      id: 0,
      name: "",
      status: false,
    });
  };

  return (
    <div className="blog_header">
      {/* Logo div */}
      <div style={{ width: "100px", marginLeft: "20vw", marginRight: "20vw" }}>
        {/* <a href="/">
          <img className="header_logo" src={Logo} alt="logo" />
        </a> */}
        <a style={{ textDecoration: "none", color: "inherit" }} href="/">
          <p className="header_nav_buttons" style={{ margin: "auto" }}>
            Home
          </p>
        </a>
      </div>

      {/* Navigation div */}
      <div className="nav_main">
        <div
          className="hamburger"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <div className="lines"></div>
          <div className="lines"></div>
          <div className="lines"></div>
        </div>
        {authState.status ? (
          <div>
            {/* Navigation div while logged in */}
            <div
              className="header_nav"
              style={menu === true ? { display: "flex" } : { display: "none" }}
            >
              <div style={{ alignSelf: "center", marginRight: "10px" }}>
                <p>Hello,&nbsp; {authState.name}!</p>
              </div>
              <a
                style={{ textDecoration: "none", color: "inherit" }}
                href="/write"
              >
                <p className="header_nav_buttons">Write</p>
              </a>
              <p className="header_nav_buttons" onClick={logout}>
                Log out
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Navigation div while not logged in */}
            <div
              className="header_nav"
              style={menu === true ? { display: "block" } : { display: "none" }}
            >
              <a
                style={{ textDecoration: "none", color: "inherit" }}
                href="/login"
              >
                <p className="header_nav_buttons">Sign In</p>{" "}
              </a>
              <a
                style={{ textDecoration: "none", color: "inherit" }}
                href="/signup"
              >
                <p className="header_nav_buttons">Sign Up</p>
              </a>
              <a
                style={{ textDecoration: "none", color: "inherit" }}
                href="/write"
              >
                <p className="header_nav_buttons">Write</p>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
