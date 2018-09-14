import axios from 'axios';

export default axios.create({
    // baseURL: 'http://127.0.0.1:8080/zeno5/social/api/',
    baseURL: 'http://localhost/social/api/',
    timeout: 10000,
});