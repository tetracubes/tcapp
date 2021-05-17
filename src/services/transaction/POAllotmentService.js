import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/poallotment';

class POAllotmentService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }


    
    fetchAllByFinYear(finYear) {
        return axios.get(USER_API_BASE_URL + "/allfin?finyear="+ finYear, AuthService.getAuthHeader());
    }


    getPO(actcode) {
        return axios.get(USER_API_BASE_URL + "/getpo?actcode=" + actcode, AuthService.getAuthHeader());
    }

    getPOBAL(actcode) {
        return axios.get(USER_API_BASE_URL + "/getpobal?actcode=" + actcode, AuthService.getAuthHeader());
    }

    fetchById(docno) {
        return axios.get(USER_API_BASE_URL + '?docno=' + docno, AuthService.getAuthHeader());
    }


    add(POAllotment) {
        return axios.post(USER_API_BASE_URL + "/add", POAllotment, AuthService.getAuthHeader());
    }

    // update(POAllotment) {
    //     return axios.put(USER_API_BASE_URL + '/' + POAllotment.id, POAllotment, AuthService.getAuthHeader());
    // }

}

export default new POAllotmentService();