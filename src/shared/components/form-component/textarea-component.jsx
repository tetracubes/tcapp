import React, { useState, useEffect, useRef } from "react";
const TextAreaComponent = (props) => {
    const [textInput, setTextInput] = useState(props.value);
    const componentProps = {
        id: props.id,
        name: props.name || "",
        value: textInput || "",
        disabled: props.disabled || false,
        readOnly: props.readOnly || false,
        required: props.required || false,
        maxLength: props.maxLength || 100,
        placeholder: props.placeholder || "",
        pattern: props.pattern || "",
        rows: props.rows || 5,
        cols: props.cols || 10,
    }

    const handleChange = (event) => {
        setTextInput(event.target.value);
    }
    return (
        <>
            <textarea
                {...componentProps}
                onChange={handleChange}
                onBlur={props.handleBlur}
                onKeyDown={props.handleKeyDown}>
                {textInput}
            </textarea>
        </>
    )
}
export default TextAreaComponent