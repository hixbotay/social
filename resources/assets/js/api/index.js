import axios from 'axios';

export default axios.create({
    // baseURL: 'http://127.0.0.1:8080/zeno5/social/api/',
    baseURL: 'api/',
    timeout: 10000,
    withCredentials: true,
    headers: { 
        'content-type': 'application/json', 
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'X-CSRF-TOKEN': csrf_token
    },
});