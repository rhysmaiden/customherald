import React, { useState, useEffect } from "react";
import "./App.css";

const NavBar = props => {
  return (
    <div className="NavBar">
      <div className="navContainer">
        <div className="left-nav">
          <b>THE CUSTOM NEWS HERALD</b>
          <p>HOME</p>
          <p>TOP</p>
        </div>
        <div className="right-nav"></div>
      </div>
    </div>
  );
};

export default NavBar;
