import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import * as lodash from "shared/services/utils/lodash/lodash";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    marginTop: theme.spacing(1),
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1 / 2)
  }
});

const CustomSelectDynamicOption = ({
  classes,
  id,
  name = id,
  label,
  options,
  optionid,
  optionname,
  onChange,
  disabled = false,
  required = false,
  errors,
  filterCritirea = {},
  emptyNoneOption = false,
  value,
  ...rest
}) => {
  errors = errors || {};
  optionid = optionid || "";
  if (lodash.isPlainObject(filterCritirea)) {
    if (!lodash.isEmpty(filterCritirea)) {
      options = lodash.filterData(options, filterCritirea);
    }
  }
  options = lodash.uniqueBy(options, optionname);

  return (
    <div className={classes.container}>
      <FormControl
        variant="filled"
        margin="dense"
        className={classes.formControl}
        fullWidth={true}
        disabled={disabled}
        // error={(lodash.isEmpty(errors[name])?false:true)}
        error={lodash.isEmpty(errors[id]) ? false : true}
      >
        <InputLabel htmlFor={id}>
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </InputLabel>
        <NativeSelect
          value={value}
          {...rest}
          onChange={onChange}
          input={<FilledInput id={id} name={name} fullWidth={true} />}
        >
          {!emptyNoneOption && <option value="" />}
          {emptyNoneOption && (
            <option value="" key="">
              None
            </option>
          )}

          {options.map((option, index) => (
            <option
              key={optionid == "" ? index : option[optionid]}
              value={option[optionname]}
            >
              {option[optionname]}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>{errors[id] && errors[id]["message"]}</FormHelperText>
      </FormControl>
      {/* <span>errrors: {errors[name] }</span> */}
    </div>
  );
};

CustomSelectDynamicOption.propTypes = {
  classes: PropTypes.any,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.any.isRequired,
  optionname: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.any.isRequired
};
export default withStyles(styles)(CustomSelectDynamicOption);
