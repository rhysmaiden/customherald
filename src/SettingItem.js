import React, { useState, useEffect } from "react";
import "./App.css";

const SettingItem = props => {
  const [inputOpen, setInputOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [refreshState, setRefresh] = useState(false);

  //SEND TO PARENTS METHODS
  const addParameter = e => {
    e.preventDefault();
    setInputText("");
    setInputOpen(false);
    props.addParameter(inputText, props.id);
  };

  const removeParameter = e => {
    e.preventDefault();
    setRefresh(!refreshState);
    props.removeParameter(e.target.getAttribute("value"), props.id);
  };

  //CONTAINED METHODS
  function toggleInput() {
    setInputOpen(!inputOpen);
  }

  const changeInputText = e => {
    setInputText(e.target.value);
  };

  return (
    <div className="setting-item">
      <div className="setting-item-title">
        <p>
          <b>{props.title}</b>
        </p>
      </div>
      <div className="tags">
        {props.tags.map(text => (
          <div className="tag-box" key={props.id}>
            <p>{text}</p>
            <i
              key={props.id}
              id={props.id}
              value={text}
              onClick={removeParameter}
              className="fas fa-times"
            ></i>
          </div>
        ))}

        {inputOpen ? (
          <form id="included" onSubmit={addParameter}>
            <input
              id="included"
              autoFocus
              onBlur={toggleInput}
              value={inputText}
              onChange={changeInputText}
            ></input>
          </form>
        ) : (
          <i onClick={toggleInput} className="fas fa-plus"></i>
        )}
      </div>
    </div>
  );
};

export default SettingItem;
