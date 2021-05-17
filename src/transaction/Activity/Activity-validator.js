
export function getFieldRules(name, row) {
    let data = {};
    switch (name) {
        case "docDate":
            data = {
                required: "Doc Date required",
            };
            return data;
        case "clientId":
            
            data = {
                required: "Client Code required",
            };
            return data;
        case "activityGroupId":
            data = {
                required: "Activity required",
            };
            return data;
        case "projectControlId":
            data = {
                required: "Project Controller required",
            };
            return data;
        case "product":
            data = {
                required: "Activity Name required",
            };
            return data;
        case "fromDate":
            data = {
                required: "From date required",
            };
            return data;
        case "toDate":
            data = {
                required: "To Date required",
            };
            return data;
        case "venue":
            data = {
                required: "venue required",
            };
            return data;
        default:
            return data;
    }
}