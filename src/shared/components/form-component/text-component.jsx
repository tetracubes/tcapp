import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";

const TextComponent = props => {
  const [textInput, setTextInput] = useState(props.value);
  const componentProps = {
    id: props.id,
    name: props.name || "",
    type: props.type || "text",
    value: textInput,
    disabled: props.disabled || false,
    readOnly: props.readOnly || false,
    required: props.required || false,
    placeholder: props.placeholder || "",
    pattern: props.pattern || "",
    // defaultValue: props.defaultValue || "",
    autoFocus: props.autoFocus || true,
    label: props.labelDisplayName || "",
    style:props.style|| {}
    
  };

  const handleChange = event => {
    setTextInput(event.target.value);
    // if (props.handleChange) {
    //     props.handleChange(event);
    // }
  };

  const handleBlur=event=>{
    let param={...event}
    if(componentProps.type=="number" && textInput==""){
      setTextInput(0);
      param.target.value=0;
    }
    
    
    if(props.handleBlur){
      props.handleBlur(param);
    }else{
      if (props.handleChange) {
          props.handleChange(param);
      }
    }
  }
  return (
    <>
      <TextField
        size="small"
        id="outlined-basic"
        {...componentProps}
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={props.handleKeyDown}
        autoFocus
      />
    </>
  );
};

export default TextComponent;
