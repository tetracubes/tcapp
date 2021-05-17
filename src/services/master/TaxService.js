import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/tax';

class TaxService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    fetchById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    }

    // deleteUser(userId) {
    //     return axios.delete(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    // }

    add(Tax) {
        return axios.post(""+USER_API_BASE_URL + "/add", Tax, AuthService.getAuthHeader());
    }

    update(Tax) {
        return axios.put(USER_API_BASE_URL + '/' + Tax.id, Tax, AuthService.getAuthHeader());
    }

}

export default new TaxService();