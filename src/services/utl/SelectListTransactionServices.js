import * as utility from "../../utility/utility";
import * as AlertService from "../../services/alert-service"
import ActivityService from "../transaction/ActivityService";

export const getActivityList = async (finyear) => {
    // let Data=[];
    var t0 = performance.now();
    // AlertService.Info("called Activvity Api");
    if (finyear == undefined) finyear = utility.getCurrentFinYear();
    return await ActivityService.fetchAllByFinYear(finyear).then((res) => {
        if (res.data) {
            
            let msg = "Activity Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
            AlertService.Success(msg);
            // AlertService.Info("Received Activvity Api");
            return (res.data);
        }else{
            return [];
        }
    }).catch((err) => {
        let msg="";
        if(err.response.data) msg+=err.response.data.message + "\n";
        if(err.message) msg+=err.message + "\n";
        AlertService.Error(msg + `( ${(performance.now() - t0).toFixed(2)} ms)`);
        return [];
    })
    
}
