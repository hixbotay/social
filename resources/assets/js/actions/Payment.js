import api from '../api';
import {CHARGE_PAYMENT, GET_LIST_CHAT} from "./types";

export const chargePayment = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        api.get('/payment/request', data)
            .then(response => {
                // dispatch({type: CHARGE_PAYMENT, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    })

}