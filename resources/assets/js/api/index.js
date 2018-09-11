import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/social/api',
    timeout: 10000,
});

