import api from '../api';
import {CHARGE_PAYMENT} from "./types";

export const chargePayment = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        api.post('/payment/request', data)
            .then(response => {
                dispatch({type: CHARGE_PAYMENT, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    })

}