// params can have level data along with ExtraRef data
// {level:{level2:{level3:{....}....}},ExtraRef:{}}

const DATE_INPUTS = [
  "date",
  "time",
  "month",
  "datetime",
  "datetime-local",
  "week"
];
const STRING_INPUTS = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
  "textarea"
];

export function validatefield(errorKey, value, type, rules) {
  rules = rules || {};
  let errors = {};

  Object.keys(rules).map(rule => {
    let defineRule = {};
    if (typeof rules[rule] === "object") {
      defineRule = Object.assign(
        {},
        { type: rule },
        getValueAndMessage(rules[rule])
      );
    } else {
      defineRule = Object.assign({}, { type: rule, message: rules[rule] });
    }

    let err = getValidated(errorKey, value, type, defineRule);
    // if(rule.type=="required" && err){
    //     return err;
    // }
    errors = Object.assign({}, errors, err);
  });
  return errors;
}

function getValidated(errorKey, value, type, rule) {
  let error = {};
  let Type = rule.type;
  let Message = rule.message;
  value = type.toLowerCase() == "number" ? parseFloat(value) || 0 : value || "";
  if (rule.type == "required") {
    if (value === "") {
      error[errorKey] = Object.assign({}, error[errorKey], {
        type: Type,
        message: Message
      });
      return error;
    }
    if(type=="object"){
      if(Array.isArray(value) && value.length===0){
        error[errorKey] = Object.assign({}, error[errorKey], {
          type: Type,
          message: Message
        });
        return error;
      }else if(Object.keys(value).length==0){
        error[errorKey] = Object.assign({}, error[errorKey], {
          type: Type,
          message: Message
        });
        return error;
      }
      
    }
  }
  if (rule.type == "min" || rule.type == "max") {
    let exceedMax;
    let exceedMin;
    let max;
    let min;
    if (rule.type == "max") {
      max = rule.type == "max" ? rule : "";
    }
    if (rule.type == "min") {
      min = rule.type == "min" ? rule : "";
    }
    if (type.toLowerCase() === "string") {
      if (!isNaN(value)) {
        type = "number";
      }
    }
    const valueNumber = parseFloat(value);
    const { value: maxValue, message: maxMessage } = getValueAndMessage(max);
    const { value: minValue, message: minMessage } = getValueAndMessage(min);
    if (type.toLowerCase() === "number") {
      exceedMax =
        maxValue != undefined && maxValue != null && valueNumber > maxValue;
      exceedMin =
        minValue != undefined && minValue != null && valueNumber < minValue;
    } else if (DATE_INPUTS.includes(type.toLowerCase())) {
      if (typeof maxValue === "string")
        exceedMax = maxValue && new Date(value) > new Date(maxValue);
      if (typeof minValue === "string")
        exceedMin = minValue && new Date(value) < new Date(minValue);
    }
    if (exceedMax || exceedMin) {
      error[errorKey] = Object.assign({}, error[errorKey], {
        type: exceedMax ? "max" : "min",
        message: exceedMax ? maxMessage : minMessage
      });
      return error;
    }
  }
  if (rule.type == "maxLength" || rule.type == "minLength") {
    let minLength;
    let maxLength;
    if (rule.type == "maxLength") {
      maxLength = rule.type == "maxLength" ? rule : "";
    }
    if (rule.type == "minLength") {
      minLength = rule.type == "minLength" ? rule : "";
    }
    if ((maxLength || minLength)) {
      const {
        value: maxLengthValue,
        message: maxLengthMessage
      } = getValueAndMessage(maxLength);
      const {
        value: minLengthValue,
        message: minLengthMessage
      } = getValueAndMessage(minLength);
      const exceedMax = maxLength && value.toString().length > maxLengthValue;
      const exceedMin = minLength && value.toString().length < minLengthValue;
      if (exceedMax || exceedMin) {
        error[errorKey] = Object.assign({}, error[errorKey], {
          type: exceedMax ? "maxLength" : "minLength",
          message: exceedMax ? maxLengthMessage : minLengthMessage
        });
        return error;
      }
    }
  }
  if ((rule.type == "pattern")) {
    let pattern = rule;
    if (pattern) {
      const {
        value: patternValue,
        message: patternMessage
      } = getValueAndMessage(pattern);
      if (patternValue instanceof RegExp && !patternValue.test(value)) {
        error[errorKey] = Object.assign({}, error[errorKey], {
          type: "pattern",
          message: patternMessage
        });
        return error;
      }
    }
  }

  return error;
}

var getValueAndMessage = item => ({
  value:
    typeof item === "object" && (item.value != undefined && item.value != null)
      ? item.value
      : item,
  message: typeof item === "object" && item.message ? item.message : ""
});
