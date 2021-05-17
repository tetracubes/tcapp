import React, { useState, useEffect, useRef } from "react";

const RadioButtonComponent = (props) => {
    const [textInput, setTextInput] = useState(props.value || "")
    const componentProps = {
        id: props.id,
        name: props.name || "",
        disabled: props.disabled || false,
        required: props.required || false,
        placeholder: props.placeholder || "",
        onBlur: props.handleBlur,
    }

    const getRadioOptions = () => {
        if (props.radioOptions) {
            let options = props.radioOptions();
            return options;
        }
        else {
            return [];
        }
    }
    const handleChange = (e) => {
        setTextInput(e.target.value);
        getRadioOptions();
    }

    return (
        <>
            <div >
                {getRadioOptions().map((i) => {
                    return <span key={i}><input type="radio" {...componentProps} defaultChecked={i === textInput} value={i} onChange={handleChange} />
                        {i} </span>
                })
                }
            </div>
        </>
    )
}
export default RadioButtonComponent