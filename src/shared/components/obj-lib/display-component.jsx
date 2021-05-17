import React, { useState, useEffect, useRef } from "react";
import TextComponent from "./form-component/text-component.jsx";
import SelectComponent from "./form-component/select-component.jsx";
import TextAreaComponent from "./form-component/textarea-component.jsx";
import RadioButtonComponent from "./form-component/radiobutton-component.jsx";

const DisplayComponent = props => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleFocus = event => {
    if (props.componentType == "") {
      return null;
    }
    if (checkDisabled && checkDisabled()) return null;
    if (isEditing) {
      // setText(event.target.value);
      if (typeof onFocusOut === "function") {
        props.onFocusOut("");
      }
    } else {
      if (typeof onFocus === "function") {
        props.onFocus("");
      }
    }

    // if (isTextValueValid()) {
    //   setIsEditing(!isEditing);
    // } else {
    if (isEditing) {
      setIsEditing(props.emptyEdit || false);
    } else {
      setIsEditing(true);
    }
    // }
  };

  const checkDisabled = () => {
    let blnDisabled = false;
    if (props.checkDisabled && typeof props.checkDisabled == "function") {
      blnDisabled = props.checkDisabled(props.levelData, "FIELD");
    }
    if (!blnDisabled) {
      if (props.disabled && typeof props.disabled == "function") {
        return props.disabled(props.levelData, "FIELD");
      } else if (props.disabled == "undefined") {
        return false;
      } else {
        return props.disabled;
      }
    }
    return blnDisabled;
  };

  const validate = param => {
    param["levelData"] = props.levelData;
    if (props.levelData["currentFieldValue"] && (param["target"]["value"] == props.levelData["currentFieldValue"])) {
      handleFocus(param);
      return;
    }

    if (props.validation && isEditing) {
      let error = props.validation(param);
      setIsEditing(error);
      handleFocus(param);
      props.handleChange(param);
     
    }
  };

  const handleChange = event => {
    if (event) {
      validate(event);
    }
  };

  const handleBlur = e => {
    validate(e);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      validate(e);
    }
  };

  const componentHandleProps = {
    handleFocus: handleFocus,
    handleChange: handleChange,
    handleKeyDown: handleKeyDown,
    handleBlur: handleBlur
  };

  
  if (isEditing) {
    return (
      <>
        <span>
          {props.componentType === "INPUT" && (
            <TextComponent
              {...props}
              value={props.levelData["currentFieldValue"]}
              {...componentHandleProps}
            />
          )}
          {props.componentType === "SELECT" && (
            <SelectComponent
              options={props.options}
              {...props}
              value={props.levelData["currentFieldValue"]}
              {...componentHandleProps}
            />
          )}
          {props.componentType === "TEXTAREA" && (
            <TextAreaComponent {...props} {...componentHandleProps} />
          )}
          {props.componentType === "RADIO" && (
            <RadioButtonComponent
              radioOptions={props.radioOptions}
              {...props}
              {...componentHandleProps}
            />
          )}
        </span>
        {props.levelData["currentLevelData"]["errors"] &&
          props.levelData["currentLevelData"]["errors"][props.name] && (
            <div style={{ color: "red", fontSize: "10px" }}>
              {props.levelData["currentLevelData"]["errors"][props.name]}
            </div>
          )}
      </>
    );
  }

  return (
    <>
      <span
        style={{
          minWidth: "200px",
          padding: "4px",
          border: "1px grey solid",
          // borderRadius: "5px"
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            color: checkDisabled() ? "grey" : "#0354e9",
            paddingRight: "2px"
          }}
        >
          {props.labelDisplayName}
        </span>
        <label
          id={props.id + "-label"}
          style={{ minHeight: "18px", minWidth: "70px", margin: "0px" }}
          onClick={handleFocus}
        >
          {props.levelData["currentFieldValue"]}
        </label>
        {/* {onDomload} */}
      </span>
      {props.levelData["currentLevelData"]["errors"] &&
        props.levelData["currentLevelData"]["errors"][props.name] && (
          <div style={{ color: "red", fontSize: "10px" }}>
            {props.levelData["currentLevelData"]["errors"][props.name]}
          </div>
        )}
    </>
  );
};
export default React.memo(DisplayComponent);
