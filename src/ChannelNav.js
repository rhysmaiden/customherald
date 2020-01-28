import React, { useState, useEffect } from "react";
import "./App.css";
import ChannelSettings from "./ChannelSettings";

const ChannelNav = props => {
  return (
    <React.Fragment>
      <nav>
        <ul className="channelNav">
          <li id="active">Channel 1</li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default ChannelNav;
