import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/statusreport';

class PaymentService {

    getSTATUS(dtFrom, dtTo, type) {
        return axios.get(USER_API_BASE_URL + '/getsr?dtFrom=' + dtFrom + "&dtTo=" + dtTo + " &type=" + type, AuthService.getAuthHeader());
    }


}

export default new PaymentService();