import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";
import Chip from '@material-ui/core/Chip';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import LableComponent from "./lable-component";

import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

import _ from "lodash";


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



const SelectComponent = props => {
  const [lableShow, setLableShow] = useState(true);
  const [open, setOpen] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const classes = useStyles();
  const theme = useTheme();


  const componentProps = {
    id: props.id || props.name || props.dbname,
    name: props.name || "",
    value: (props.multiple ? (props.value || []) : (props.value || "")),
    disabled: props.disabled ? props.disabled : false,
    readOnly: props.readOnly ? props.readOnly : false,
    required: props.required ? props.required : false,
    placeholder: props.placeholder || "",
    // multiple: (props.multiple == undefined ? undefined : props.multiple),
    pattern: props.pattern || "",
    autoFocus: props.autoFocus ? props.autoFocus : true,
    labeldisplayname: props.labelDisplayName || "",
    optiongroupname: props.optionGroupName || "",
    optionname: props.optionName || "value",
    emptynoneoption: props.emptyNoneOption ? "true" : "false",
    additionalnames: props.additionalnames || []
  };

  const handleChange = e => {
    setLableShow(true);
    if (props.handleChange) {
      props.handleChange(e);

    }
  };



  const getOptions = () => {
    let options = []
    // setOpen(true)
    if (props.getOptions) {
      let option = props.getOptions(props.name, props.objData || {})
      options = processOptions(option || []);
      // setOpen(false)
      return options;
    } else {
      options = processOptions(props.options || []);
      // setOpen(false)
      return options;
    }

  };

  const processOptions = data => {
    let processedData = [];
    processedData = _.uniqBy(data, componentProps.optionname);
    // getGroupname(processedData);
    return processedData;
  };

  const getGroupOptions = () => {
    let options = getOptions();
    let data = _.groupBy(options, componentProps.optiongroupname);
    return data;
  };
  const getGroupedMenus = () => {
    let content = [];
    if (componentProps.optiongroupname !== "") {
      Object.entries(getGroupOptions()).map(([key, value]) => {
        content.push(
          <ListSubheader
            style={{
              background: "#303f9f",
              color: "white",
              fontWeight: "bold"
            }}
            key={key}
            label={key}
          >
            {key}
          </ListSubheader>
        );
        value.map((option, index) =>
          content.push(
            <MenuItem
              key={"menu-" + index + key}
              value={option[componentProps.optionname]}
            >
              {option[componentProps.optionname]}

              {componentProps.additionalnames.map((row) => {
                return ("," + option[row]);
              })}
            </MenuItem>
          )
        );
      });
    } else {
      getOptions().map((option, index) =>
        content.push(
          <MenuItem
            key={"menu-" + index}
            value={option[componentProps.optionname]}
          >
            {option[componentProps.optionname]}
            {componentProps.additionalnames.map((row) => {
              return ("," + option[row]);
            })}
          </MenuItem>
        )
      );
    }
    return content;
  };

  const handleLableClick = () => {
    setLableShow(false);
  }
  const handleLableBlur = () => {
    setLableShow(true);
  }
  const handleDelete = (e) => {
    console.log(e, props.value);
  }

  const handleBlur = (e) => {
    if (props.handleBlur) {
      props.handleBlur(e)
    }
    setLableShow(true);
  }
  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        <h4>Populating Dropdown List.................</h4>
      </Backdrop>
      {lableShow &&
        <span style={{minWidth: "200px",padding: "4px",float: "left",margin: "2px"}} key={"SelectlabelView-" + props.name}>
          <LableComponent {...props} lableNameColor={"#2B60DE"} handleClick={handleLableClick} handleBlur={handleLableBlur}
          />
        </span>
      }
      {!lableShow &&
        <>
          {props.multiple &&
            <FormControl
              // variant="standard"
              style={{ minWidth: "160px", width: "auto" }}
            >

              <InputLabel
                {...componentProps}
                data-shrink={true}
                style={{ background: "white", fontWeight: "bold" }}
              >
                {componentProps.labeldisplayname}
              </InputLabel>
              <Select
                // size="small"
                // native
                {...componentProps}
                style={Object.assign(componentProps.style || {}, {
                  minWidth: "160px",
                  width: "100%"
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={props.handleKeyDown}
                multiple
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} color="primary" size="small" />
                    ))}
                  </div>
                )}
              >
                {componentProps.emptynoneoption == "true" && (
                  <MenuItem key="None" value="">
                    <i>None</i>
                  </MenuItem>
                )}

                {getGroupedMenus()}

              </Select>
            </FormControl>
          }
          {props.multiple == undefined &&
            <FormControl
              // variant="outlined"
              style={{ minWidth: "160px", width: "auto" }}
            >

              <InputLabel
                {...componentProps}
                data-shrink={true}
                style={{ background: "white", fontWeight: "bold" }}
              >
                {componentProps.labeldisplayname}
              </InputLabel>
              <Select
                size="small"
                // native
                {...componentProps}
                style={Object.assign(componentProps.style || {}, {
                  minWidth: "160px",
                  width: "100%"
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={props.handleKeyDown}
              >
                {componentProps.emptynoneoption == "true" && (
                  <MenuItem key="None" value="">
                    <i>None</i>
                  </MenuItem>
                )}

                {getGroupedMenus()}

              </Select>
            </FormControl>
          }
        </>
      }

    </>
  );
};
export default React.memo(SelectComponent);
