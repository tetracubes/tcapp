import React from "react";
import { Checkbox, Box } from "@material-ui/core";
import * as utility from "../../../utility/utility"
import _ from "lodash";


const LableComponent = props => {
    const componentProps = {
        id: props.id || props.name ||props.dbname,
        name: props.name || "",
    };

    //   const handleChange = event => {
    //     // setTextInput(event.target.value);
    //     if (props.handleChange) {
    //       props.handleChange(event);
    //     }
    //   };

    const handleClick=(e)=>{
        if(props.handleClick){
            props.handleClick(e)
        }
    }

    const handleBlur=(e)=>{
        if(props.handleBlur){
            props.handleBlur(e)
        }
    }

    const lableNameStyles={ "color": "rgb(200, 150, 102)", 
        "textTransform": "capitalize",
    "fontWeight":"bold" }
    if(props.lableNameColor){
        lableNameStyles["color"]=props.lableNameColor
    }
    
const getvalue=()=>{
    let values=props.value;
    if(typeof values=="object"){
        if(Array.isArray){
            return (_.join(values,","));
        }else{
            return JSON.stringify(values);
        }
    }
    return (props.value);
}
    return (
        <>
            <Box component="span" onClick={handleClick} display="block" style={{
                border: "1px rgba(0, 0, 0, 0.23) solid",
                "padding": "9px", "borderRadius": "4px"
            }}>
                <label style={lableNameStyles} onBlur={handleBlur} >{utility.camelCaseToWords(props.labelDisplayName)}</label>
                <label style={{ paddingLeft: "2px" }}  onBlur={handleBlur} >{getvalue()}</label>
            </Box>
        </>
    );
};

export default LableComponent;


