import React from 'react'

import TextComponent from "../../shared/components/form-component/text-component";
import LableComponent from "../../shared/components/form-component/lable-component";
import CheckboxComponent from "../../shared/components/form-component/checkbox-component"
import SelectComponent from "../../shared/components/form-component/select-component";
import AutoComponent from "../../shared/components/form-component/autocomplete-component";
import { Button } from '@material-ui/core';
import _ from "lodash"
// import * as utility from "../../utility/utility"


export const getComponent = (values, obj, readonly = false, componentHandleProps = {}) => {
    const type = (readonly ? "" : values.componentType);

    const styles = {
        minWidth: "200px",
        padding: "10px 4px",
        float: "left",
        margin: "2px 0px 0px 2px",

        // borderRadius: "5px"
    }
    if (readonly) {
        styles["padding"] = "4px"
    }

    switch (type) {
        case "INPUT":
            return (<span style={styles} key={"text-" + values["dbname"]}>
                <TextComponent
                    {...values}
                    value={obj[values["dbname"]]}
                    {...componentHandleProps}
                />
                {getErrorComponent(obj, values["dbname"])}
            </span>)
            break;

        case "CHECKBOX":
            return (<span style={{ padding: "10px 4px", float: "left", marginRight: "2px", margin: "1px 2px" }} key={"text-" + values["dbname"]}>
                {/* <Box component="span" display="block" style={{
                    border: "1px rgba(0, 0, 0, 0.23) solid",
                    "padding": "6px", "borderRadius": "4px"
                }}>
                    <label>{values["labelDisplayName"]}</label> */}
                <CheckboxComponent
                    {...values}
                    checked={(obj[values["dbname"]] == "Y" ? true : false)}
                    {...componentHandleProps}
                    value="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                {/* </Box> */}
                {getErrorComponent(obj, values["dbname"])}
            </span>)
            break;

        case "SELECT":
            return (<span style={{ padding: "4px", float: "left", marginRight: "2px", margin: "1px 2px" }} key={"text-" + values["dbname"]}>

                <SelectComponent
                    options={values.options}
                    {...values}
                    value={obj[values["dbname"]]}
                    {...componentHandleProps}
                    objData={obj}
                />

                {/* </Box> */}
                {getErrorComponent(obj, values["dbname"])}
            </span>)
            break;
        case "AUTOCOMPLETE":
            return (<span style={{ padding: "4px", float: "left", marginRight: "2px", margin: "1px 2px" }} key={"text-" + values["dbname"]}>
                <AutoComponent
                    options={values.options}
                    {...values}
                    value={obj[values["dbname"]]}
                    {...componentHandleProps}
                    objData={obj}
                />

                {/* </Box> */}
                {getErrorComponent(obj, values["dbname"])}
            </span>)
            break;

        case "BUTTON":
            return (<span style={{ padding: "10px 4px", float: "left", marginRight: "2px", margin: "1px 2px" }} key={"BUTTON-" + values["dbname"]}>

                <Button {...values} {...componentHandleProps} objData={obj} variant="contained" color="primary" >
                    {values["labelDisplayName"]}
                </Button>
            </span>)
            break;

        default:
            return (
                <span style={styles} key={"labelView-" + values["dbname"]}>
                    <LableComponent
                        {...values}
                        labelDisplayName={values["labelDisplayName"] || values["dbname"]}
                        value={(typeof obj[values["dbname"]] == "object" ? _.join(obj[values["dbname"]],",") : obj[values["dbname"]])}
                    />
                    {getErrorComponent(obj, values["dbname"])}
                    {/* {obj["errors"] && obj["errors"][values.dbname] && (
                        <div style={{ color: "red", fontSize: "10px" }} key={"Error-" + values["dbname"]}>
                            {obj["errors"][values.name]}
                        </div>
                    )} */}
                    {/* <label {...values}>{}</label> */}
                </span>
            )
            break;
    }

}

export const getErrorComponent = (obj, name) => {
    if (obj["errors"] && obj["errors"][name]) {
        return (<div style={{ color: "red", fontSize: "10px" }} key={"Error-" + name}>
            {obj["errors"][name]}
        </div>)
    }
    return null
}
