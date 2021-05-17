import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/estimate';

class EstimateService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    fetchAllByFinYear(finYear,can="null") {
        return axios.get(USER_API_BASE_URL + "/allfin?finyear="+ finYear + "&can=" + can, AuthService.getAuthHeader());
    }

    fetchById(docno) {
        return axios.get(USER_API_BASE_URL + '?docno=' + docno, AuthService.getAuthHeader());
    }


    add(Estimate) {
        return axios.post(""+USER_API_BASE_URL + "/add", Estimate, AuthService.getAuthHeader());
    }

    auth(Estimate) {
        return axios.post(""+USER_API_BASE_URL + "/auth", Estimate, AuthService.getAuthHeader());
    }
    
    // update(Estimate) {
    //     return axios.put(USER_API_BASE_URL + '/' + Estimate.id, Estimate, AuthService.getAuthHeader());
    // }

}

export default new EstimateService();