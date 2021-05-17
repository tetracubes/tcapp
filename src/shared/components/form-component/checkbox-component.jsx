import React from "react";
import { Checkbox,Box } from "@material-ui/core";


const CheckBoxComponent = props => {
  const componentProps = {
    id: props.id || props.name,
    name: props.name || "",
    value: props.value,
    checked: props.checked,
    disabled: props.disabled || false,
    readOnly: props.readOnly || false,
  };

  const handleChange = event => {
    // setTextInput(event.target.value);
    if (props.handleChange) {
      props.handleChange(event);
    }
  };
  return (
    <>
      <Box component="span" display="block" key={"chequeBox-" + props.name} style={{
        border: "1px rgba(0, 0, 0, 0.23) solid",
        "padding": "0px 10px", "borderRadius": "4px"
      }}>
        <label>{props.labelDisplayName}</label>
        <Checkbox
        key={props.name}
          size="small"
          // id={id}
          {...componentProps}
          // variant="outlined"
          onChange={handleChange}
          onBlur={props.handleBlur}
          onKeyDown={props.handleKeyDown}
          autoFocus
        />
      </Box>
    </>
  );
};

export default CheckBoxComponent;
