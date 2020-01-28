import React, { useState, useEffect } from "react";
import "./App.css";
import SettingItem from "./SettingItem.js";

const ChannelSettings = props => {
  const [termsInput, setTermsInput] = useState(false);
  const [includedInput, setIncludedInput] = useState(false);
  const [excludedInput, setExcludedInput] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    console.log("Hello");
  }, [props.parameters]);

  const openInput = e => {
    if (e.target.id == "terms") {
      setTermsInput(true);
    } else if (e.target.id == "included") {
      setIncludedInput(true);
    } else if (e.target.id == "excluded") {
      setExcludedInput(true);
    }
  };

  const closeInput = e => {
    if (e.target.id == "terms") {
      setTermsInput(false);
    } else if (e.target.id == "included") {
      setIncludedInput(false);
    } else if (e.target.id == "excluded") {
      setExcludedInput(false);
    }
  };

  const changeInputText = e => {
    setInputText(e.target.value);
  };

  const addParameter = (text, id) => {
    props.changeParameter("add", text, id);
  };

  const removeParameter = (text, id) => {
    props.changeParameter("remove", text, id);
  };

  return (
    <div>
      <div className="channel-settings">
        {props.parameters.map(parameter => (
          <SettingItem
            key={parameter.title}
            title={parameter.title}
            tags={parameter.tags}
            id={parameter.id}
            addParameter={addParameter}
            removeParameter={removeParameter}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelSettings;
