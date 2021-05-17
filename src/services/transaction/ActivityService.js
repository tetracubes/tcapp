import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/activity';

class ActivityService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    fetchAllByFinYear(finYear,act="N",can="N") {
        return axios.get(USER_API_BASE_URL + "/allfin?finyear="+ finYear + "&act=" + act + "&can=" + can, AuthService.getAuthHeader());
    }

    fetchById(docno) {
        return axios.get(USER_API_BASE_URL + '?docno=' + docno, AuthService.getAuthHeader());
    }


    add(Activity) {
        return axios.post(""+USER_API_BASE_URL + "/add", Activity, AuthService.getAuthHeader());
    }

    auth(Activity) {
        return axios.post(""+USER_API_BASE_URL + "/auth", Activity, AuthService.getAuthHeader());
    }
    
    // update(Activity) {
    //     return axios.put(USER_API_BASE_URL + '/' + Activity.id, Activity, AuthService.getAuthHeader());
    // }

}

export default new ActivityService();