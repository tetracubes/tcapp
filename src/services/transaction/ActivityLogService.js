import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/activitylog';

class ActivityLogService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    fetchById(docno) {
        return axios.get(USER_API_BASE_URL + '?docno=' + docno, AuthService.getAuthHeader());
    }


    add(ActivityLog) {
        return axios.post(""+USER_API_BASE_URL + "/add", ActivityLog, AuthService.getAuthHeader());
    }

    del(id) {
        return axios.get(""+USER_API_BASE_URL + "/del/" + id, AuthService.getAuthHeader());
    }
    
    // update(ActivityLog) {
    //     return axios.put(USER_API_BASE_URL + '/' + ActivityLog.id, ActivityLog, AuthService.getAuthHeader());
    // }

}

export default new ActivityLogService();