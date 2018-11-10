import axios from 'axios';

export default axios.create({
    // baseURL: `${baseUrl}/api/chat/`,
    baseURL: `https://chat.noiduyen.vn/`,
    timeout: 10000,
    withCredentials: true,
    crossdomain: true,
    headers: {
        'content-type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-request-method': 'GET',
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'X-CSRF-TOKEN': csrf_token
    },
});