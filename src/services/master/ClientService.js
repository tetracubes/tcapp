import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/client';

class ClientService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    fetchById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    }

    // deleteUser(userId) {
    //     return axios.delete(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    // }

    add(Client) {
        return axios.post(""+USER_API_BASE_URL + "/add", Client, AuthService.getAuthHeader());
    }

    update(Client) {
        return axios.put(USER_API_BASE_URL + '/' + Client.id, Client, AuthService.getAuthHeader());
    }
    auth(Client) {
        return axios.post(""+USER_API_BASE_URL + "/auth", Client, AuthService.getAuthHeader());
    }
    

}

export default new ClientService();