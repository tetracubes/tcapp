
export function getFieldRules(name, row) {
    let data = {};
    switch (name) {
        case "vendorid":
            data = {
                required: "Vendor required",
            };
            return data;
        case "vendorgroupid":
            
            data = {
                required: "Vendor Group required",
            };
            return data;
        case "poamt":
            data = {
                required: "PO Amt required",
            };
            return data;
        
        default:
            return data;
    }
}