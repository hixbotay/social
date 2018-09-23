import axios from 'axios';

// get cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// var csrf_token = getCookie('XSRF-TOKEN');
var csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute("content");
console.log(csrf_token);

export default axios.create({
    // baseURL: 'http://127.0.0.1:8080/zeno5/social/api/',
    baseURL: 'http://localhost/social/api/',
    timeout: 10000,
    withCredentials: true,
    headers: { 
        'content-type': 'application/json', 
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'X-CSRF-TOKEN': csrf_token
    },
});