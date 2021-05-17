
export function getFieldRules(name, row) {
    let data = {};
    switch (name) {
        case "vendorName":
            data = {
                required: "Vendor Name required",
                maxLength: { value: 100, message: "Max length should be 30 Chars" }
            };
            return data;
        case "vendorgroup":
            data = {
                required: "Vendor Group required",

            };
            return data;
        case "add1":
            data = {
                required: "Address 1 required",
            };
            return data;
        case "mobileNo":
            data = {
                required: "Mobile No required",
                minLength: { value: 10, message: "Min length should be 10 Chars" }
            };
            return data;
        case "stateId":
            data = {
                required: "State Name required",
            };
            return data;
        case "cityId":
            data = {
                required: "City Name required",
            };
            return data;
        default:
            return data;
    }
}