

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
        case "payAmt":
            data = {
                required: "Payment Amt required",
                min: { value: 1, message: "Payment Amount Min Value is ==> 1" },
                max: { value: row["BalAmt"], message: "Payment Amoun Max Value is " + row["BalAmt"] },
            };
            return data;
        
        default:
            return data;
    }
}