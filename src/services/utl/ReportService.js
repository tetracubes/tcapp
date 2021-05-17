import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL ='/tcapiservice/custom';

class ReportService {
    
    getdata(report) {
        return axios.post(USER_API_BASE_URL + "/getdata", report, AuthService.getAuthHeader());
    }
    getdata2(report) {
        return axios.post(USER_API_BASE_URL + "/getdata2", report, AuthService.getAuthHeader());
    }
}

export default new ReportService();