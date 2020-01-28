import React, { useEffect, useState } from "react";
import "./App.css";
import { isUserWhitespacable } from "@babel/types";

const Search = props => {
  const [searchText, setSearchText] = useState("");
  const sendSearch = e => {
    console.log("Trigger");
    e.preventDefault();
    props.setQuery(searchText);
    setSearchText("");
  };

  const setText = e => {
    setSearchText(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="search">
        <form onSubmit={sendSearch}>
          <input
            className="search-box"
            value={searchText}
            onChange={setText}
          ></input>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Search;
