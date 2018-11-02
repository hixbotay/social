<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" const="text/html;charset=UTF-8" />
    <link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet" type="text/css">
    <style>
        @mixin vertical-align {
            position: relative;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
        }

        * {
            box-sizing: border-box;
        }

        html {
            height: 100%;
        }

        body {
            margin: 0px;
            height: 100%;
        }

        header {
            text-align: center;
        }

        h1 {
            font-family: 'Comfortaa', sans-serif;
            margin: 0px;
        }

        div#change_username, section#input_zone {
            border: 5px outset #8258FA;
        }

        div#change_username {
            height: 3%;
            display: inline-block;
            background-color: #BCA9F5;
        }

        section#chatroom {
            border: 5px inset #8258FA;
            height: 85%;
            overflow: auto;
        }

        section#input_zone {
            height: 7%;
            text-align: center;
            background-color: #BCA9F5;
        }

        .vertical-align {
            position: relative;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
        }

        input#username {
            font-family: 'Comfortaa', sans-serif;
        }

        input#message {
            display: inline-block;
            width: 88%;
            height: 100%;
            font-family: 'Comfortaa', sans-serif;
            font-size: 2vh;
        }

        button#send_message {
            display: inline-block;
            height: 70%;
            width: 10%;
        }

        p.message {
            margin: 0px;
            width: 100%;
            height: 40px;
            font-size: 2vh;
            font-family: 'Comfortaa', sans-serif;
            padding: 1vh;
        }

        .message:nth-child(even) {
            background-color: #81DAF5;
        }

        .message:nth-child(odd) {
            background-color: #81BEF7;
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
</head>

<body>

<section>
    <div id="change_username">
        <input id="username" type="text" value="<?= isset($_GET['name'])?$_GET['name']:"random" . mt_rand(1000, 9999) ?>" />
<!--        <button id="subscribe">JOIN</button>-->
<!--        <button id="checkroom">CHECKROOM</button>-->
        <button id="user1">user1</button>
        <button id="user2">user2</button>
        <button id="user3">user3</button>
    </div>
</section>

<section id="chatroom">
    <section id="feedback"></section>
</section>

<section id="input_zone" style="height: 100px;">
    <input id="message" class="vertical-align" type="text" />
    <button id="send_message" class="vertical-align" type="button">Send</button>
</section>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>

<script>

    $(function(){
        //make connection
        var socket = io.connect('http://localhost:9327/')

        //buttons and inputs
        var message = $("#message")
        var username = $("#username")
        var send_message = $("#send_message")
        var send_username = $("#send_username")
        var chatroom = $("#chatroom")
        var feedback = $("#feedback")
        var subscribe = $("#subscribe")
        var checkroom = $("#checkroom")

        var user1 = $("#user1")
        var user2 = $("#user2")
        var user3 = $("#user3")

        //middleware

        user1.click(function () {
            var subcriber = {user_id: '1'};
            console.log(subcriber);
            socket.emit('check_session', subcriber)
        })

        user2.click(function () {
            var subcriber = {user_id: '2'};
            console.log(subcriber);
            socket.emit('check_session', subcriber)
        })

        user3.click(function () {
            var subcriber = {user_id: '3'};
            console.log(subcriber);
            socket.emit('check_session', subcriber)
        })

        checkroom.click(function () {
            socket.emit('vantu19000', 'string hihi');
        })

        //Emit message
        send_message.click(function(){
            socket.emit('new_message', {message : message.val()})
        })

        subscribe.click(function () {
            var subcriber = {room_id: '5bd0924c27b16b4644a5acb8', user: [1,2,3]};
            // var subcriber = {room_id: '', user: [1,2,3]};
            console.log(subcriber);
            socket.emit('subscribe', subcriber)
        })

        //Listen on new_message
        socket.on("new_message", (data) => {
            console.log(data);
            feedback.html('');
            message.val('');
            chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
        })

        //Emit a username
        // send_username.click(function(){
            socket.emit('change_username', {username : username.val()})
        // })

        //socket.emit('check_session', {session_id: '<?//= mt_rand(10000, 99999) ?>//'})

        //Emit typing
        message.bind("keypress", () => {
            socket.emit('typing')
        })

        //Listen on typing
        socket.on('typing', (data) => {
            feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
        })
    });



</script>

</body>
</html>
