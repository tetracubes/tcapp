
export function getFieldRules(name,row) {
    let data={};
    switch (name) {
        case "countryName":
            data = {
                required: "Country Name required",
                maxLength: { value: 30, message: "Max length should be 30 Chars" }
            };
            return data;
        default:
            return data;
    }
}