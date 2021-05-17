import React, { Component } from "react";

class RadioButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: props.value || "",
        };
    }

    componentProps = {
        id: this.props.id,
        name: this.props.name || "",
        disabled: this.props.disabled || false,
        required: this.props.required || false,
        placeholder: this.props.placeholder || "",
        // onBlur: this.props.handleBlur,
    }

    getRadioOptions = () => {
        if (this.props.radioOptions) {
            let options = this.props.radioOptions();
            return options;
        }
        else {
            return [];
        }
    }

    handleChange = (e) => {
        this.setState({ textInput: (e.target.value) });
        if (this.props.handleChange) {
            this.props.handleChange(e);
        }
    }

    render() {
        return (
            <>
                <span >
                    {this.getRadioOptions().map((i) => {
                        return <span key={i}><input type="radio" {...this.componentProps} defaultChecked={i === this.state.textInput} value={i} onChange={this.handleChange} />
                            {i} </span>
                    })
                    }
                </span>
            </>
        )
    }
}
export default RadioButtonComponent