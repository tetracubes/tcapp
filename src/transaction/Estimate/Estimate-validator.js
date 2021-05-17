
export function getFieldRules(name, row) {
    let data = {};
    switch (name) {
        case "docDate":
            data = {
                required: "Doc Date required",
            };
            return data;
        case "actCode":
            
            data = {
                required: "Act Code required",
            };
            return data;
        case "estAmt":
            data = {
                required: "Estimate Amount required",
                min: { value: 1, message: "Min Value Should be 1"},
            };
            return data;
        
        default:
            return data;
    }
}