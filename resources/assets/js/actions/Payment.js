import api from '../api';
import {
    CHARGE_PAYMENT,
    LOAD_PRICE_CONFIG
} from "./types";

export const chargePayment = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        api.post('/payment/request', data)
            .then(response => {
                // dispatch({type: CHARGE_PAYMENT, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    })

}

export const loadPriceConfig = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get('/payment/getprice')
            .then((response) => {
                dispatch({type: LOAD_PRICE_CONFIG, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    })
}
