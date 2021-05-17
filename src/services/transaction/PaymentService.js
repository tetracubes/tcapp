import axios from 'axios';
import AuthService from '../AuthService';

const USER_API_BASE_URL = '/tcapiservice/payment';

class PaymentService {

    fetchAll() {
        return axios.get(USER_API_BASE_URL + "/all", AuthService.getAuthHeader());
    }

    
    fetchAllByFinYear(finYear) {
        return axios.get(USER_API_BASE_URL + "/allfin?finyear="+ finYear, AuthService.getAuthHeader());
    }


    fetchById(docno) {
        return axios.get(USER_API_BASE_URL + '?docno=' + docno, AuthService.getAuthHeader());
    }

    getPAYMENT(actno) {
        return axios.get(USER_API_BASE_URL + "/getpayment?actcode=" + actno, AuthService.getAuthHeader());
    }

    postCompletePayment(actno,addedby){
        return  axios.get(USER_API_BASE_URL + "/completepayment?actcode=" + actno + "&addedby=" +addedby, AuthService.getAuthHeader());
    }

    add(Payment) {
        return axios.post(""+USER_API_BASE_URL + "/add", Payment, AuthService.getAuthHeader());
    }

    // update(Payment) {
    //     return axios.put(USER_API_BASE_URL + '/' + Payment.id, Payment, AuthService.getAuthHeader());
    // }

}

export default new PaymentService();