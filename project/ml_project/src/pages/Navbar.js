import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../styles/navbar.scss";
import logo from "../components/assets/logo.png";
import push from "../components/assets/pushprotocol1.png"
// import ConnectCustomButton from "../components/ConnectCustomButton";


function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [address, setAddress] = useState("");

  function handleClick() {
    setIsExpanded(!isExpanded);
  }
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <span className="logo">
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: "350px" }} />
            </Link>
          </span>
          <img src={push}  style={{width:"50px"}}></img>
          <ConnectButton className="connect-btn" style={{backgroundColor:"white"}}/>
          <button
            onClick={handleClick}
            className={isExpanded === false ? "hamburger" : "hamburger active"}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
