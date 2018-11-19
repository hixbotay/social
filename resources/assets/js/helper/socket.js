import io from 'socket.io-client';
const socket = io('https://chat.noiduyen.vn:80/', {secure: true, reconnect: true});

export default socket;

// import socket vao` component muon lang nghe (xem route/message/index.js)

// hoac

// viet vao function roi import function

//

export function vantutest() {
    // alert("12345");
}



// Code vi du


// Vi du: A like them code nay:
// socket.emit('notify', {type: "like", user_id: 123 ..v..v..})
//

// Code listen notify

// socket.on("notify", (data) => {
//     console.log("Data return la = ");
//     console.log(data);
// })

