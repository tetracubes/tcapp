import React from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import * as Lodash from "shared/services/utils/lodash/lodash";
import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

const CustomSwitch = ({
  classes,
  id,
  name = id,
  value,
  onChange,
  disabled = false,
  leftValue = "No",
  rightValue = "Yes",
  errors,
  ...rest
}) => {
  errors = errors || {};
  return (
    <div className={classes.container}>
      <span className={classes.formControl}>
        <span style={{ color: value ? "black" : "red" }}>{leftValue}</span>
        <Switch
          {...rest}
          id={id}
          name={name}
          checked={value}
          onChange={onChange}
          disabled={disabled}
          color="primary"
        />
        {Lodash.isEmpty(errors) ? "" : errors[id] && errors[id]["message"]}
        {/* {error && <p className="alert alert-danger">{error}</p>} */}
        {/* </Fragment>
     <SwitchInput
     {...rest}
     id={id}
     name={name}
     checked={value}
     onChange={onChange}
     error={error}
     disabled={disabled}
     /> */}
        <span style={{ color: value ? "green" : "black" }}>{rightValue}</span>
      </span>
    </div>
  );
};

export default withStyles(styles)(CustomSwitch);
