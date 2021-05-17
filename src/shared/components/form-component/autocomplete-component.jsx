import React, { useState } from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from "@material-ui/core/FormControl";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import _ from "lodash";

import LableComponent from "./lable-component";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Checkbox from '@material-ui/core/Checkbox';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



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



const AutoComponent = props => {
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

    const handleChange = (e, value) => {
        setLableShow(true);
        if (props.handleChange) {
            console.log(value);


            let param = Object.assign(e, { autotarget: getValueProcessed(value) });
            props.handleChange(param);

        }
    };

    const getValueProcessed = (value) => {
        let obj = {};
        obj["name"] = props.name;
        if (props.multiple) {
            if (value == null && value == undefined) {
                obj["value"] = "";
                obj["option"] = [];
            } else {
                obj["value"] = _.map(value, componentProps.optionname);
                obj["option"] = value;
            }
        } else {
            if (value == null && value == undefined) {
                obj["value"] = "";
                obj["option"] = {};
            } else {
                obj["value"] = value[componentProps.optionname]
                obj["option"] = value;
            }
        }

        return obj;
    }


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

    const handleBlur = (e, value) => {
        if (props.handleBlur) {
            let param = Object.assign(e, { autotarget: getValueProcessed(value) });
            props.handleBlur(param)
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
                <span style={{ minWidth: "200px", padding: "4px", float: "left", margin: "2px" }} key={"SelectlabelView-" + props.name}>
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
                            <Autocomplete
                                {...componentProps}
                                id="combo-box-demo"
                                options={getOptions()}
                                autoHighlight
                                multiple={props.multiple}
                                groupBy={option => option[componentProps.optionGroupName]}
                                getOptionLabel={option => {
                                    if (option && option !== "" && typeof option !== "object") {
                                        return option;
                                    } else {
                                        return "";
                                    }
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={props.handleKeyDown}
                                selectOnFocus
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option[componentProps.optionname]}
                                        {componentProps.additionalnames &&
                                            <span style={{"fontSize":"11px","color":"rgb(1, 87, 155)"}}>
                                                {componentProps.additionalnames.map((row) => {
                                                    return (" , " + option[row]);
                                                })}
                                            </span>
                                        }
                                        
                                    </React.Fragment>
                                )}
                                // style={{ width: 300 }}
                                // renderOption={option => (

                                //     <React.Fragment>
                                //         {option[componentProps.optionname]}
                                //         {componentProps.additionalnames.map((row) => {
                                //             return ("," + option[row]);
                                //         })}
                                //     </React.Fragment>
                                // )}
                                renderInput={params => <TextField {...params} label={componentProps.labeldisplayname} variant="outlined" />}
                            />
                        </FormControl>
                    }
                    {props.multiple == undefined &&
                        <FormControl
                            // variant="outlined"
                            style={{ minWidth: "160px", width: "auto" }}
                        >

                            <Autocomplete
                                {...componentProps}
                                style={{ minWidth: "300px", width: "auto" }}
                                id={"combo-box-demo" + Math.random(1000)}
                                options={getOptions()}
                                autoHighlight

                                getOptionLabel={option => {
                                    if (option && option !== "" && typeof option !== "object") {
                                        return option;
                                    } else {
                                        return "";
                                    }
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={props.handleKeyDown}
                                selectOnFocus
                                // style={{ width: 300 }}
                                renderOption={option => (
                                    <React.Fragment>
                                        {option[componentProps.optionname]}
                                        {componentProps.additionalnames &&
                                            <span style={{"fontSize":"11px","color":"rgb(1, 87, 155)"}}>
                                                {componentProps.additionalnames.map((row) => {
                                                    return (" , " + option[row]);
                                                })}
                                            </span>
                                        }
                                    </React.Fragment>
                                )}
                                renderInput={params => <TextField {...params} label={componentProps.labeldisplayname} variant="outlined" />}
                            />


                        </FormControl>
                    }
                </>
            }

        </>
    );
};
export default React.memo(AutoComponent);



