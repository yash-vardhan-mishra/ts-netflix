import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NAV_AVATAR, NAV_LOGO } from "../../utils/constants";
import "./styles.css";
const Nav = () => {
  const [show, handleShow] = useState(false);
  const history = useHistory();
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);
  // need to make the navbar transition smooth
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src={NAV_LOGO}
          alt=""
        />
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src={NAV_AVATAR}
          alt="netflix avatar"
        />
      </div>
    </div>
  );
};

export default Nav;
