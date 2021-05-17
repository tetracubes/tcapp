import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/user';
// const USER_API_BASE_URL_RIGHTS = '/tcapiservice/';

class UserService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    fetchById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    }

    fetchMenuRightsAll(){
        return axios.get(USER_API_BASE_URL + "/allmenus", AuthService.getAuthHeader());
    }
    // deleteUser(userId) {
    //     return axios.delete(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    // }

    add(user) {
        return axios.post(""+USER_API_BASE_URL + "/add", user, AuthService.getAuthHeader());
    }

    update(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.userid, user, AuthService.getAuthHeader());
    }

}

export default new UserService();