import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/state';

class ClientGroupService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    fetchById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    }

    // deleteUser(userId) {
    //     return axios.delete(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    // }

    add(ClientGroup) {
        return axios.post(""+USER_API_BASE_URL + "/add", ClientGroup, AuthService.getAuthHeader());
    }

    update(ClientGroup) {
        return axios.put(USER_API_BASE_URL + '/' + ClientGroup.id, ClientGroup, AuthService.getAuthHeader());
    }

}

export default new ClientGroupService();