import React, { Component } from 'react';
import { Card } from '../../components/Card';
import MessageItem from '../../components/Message/MessageItem';
import IncomingMessage from '../../components/Message/IncomingMessage';
import OutgoingMessage from '../../components/Message/OutgoingMessage';
import io from 'socket.io-client';
import {
    getListChat,
    createConversation,
    DanhSach,
    changeListChast
} from "../../actions/MessageActions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getCafeDetail} from "../../actions/CafeActions";
import axios from 'axios';
import chatApi from "../../api/chat";

// const socket = io('http://chat.noiduyen.vn:443/');
const socket = io('https://chat.noiduyen.vn:80/', {secure: true, reconnect: true});

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conversation: [
                {
                    user_id: this.props.current_user.id,
                    content: 'Start friend connect :)',
                    created_at: '20-12-2018'
                },
            ],
            activeChat: {},
            current_message: '',
            typing: "",
            typingStatus: false,
        };

        if (this.props.current_user.id){
            var subcriber = {room_id: this.props.current_user.id, username: this.props.current_user.name};
            socket.emit('subscribe', subcriber);
        }
    }

    enterMessage(evt){
        if (evt.key === 'Enter') {
            this.emitMessage();
        }
    }

    typingMessage(evt){
        var c11 = this.state.current_message;
        this.setState({
            current_message: evt.target.value
        }, () => {
        });

        if (evt.target.value.length > 0){
            socket.emit('typing', {to_id: [this.state.activeChat.id]});
        }
        if (evt.target.value.length === 0){
            socket.emit('stop_typing');
        }
    }

    emitMessage(){
        if (this.state.current_message === "") {
            alert("Gõ thông điệp đi bạn ");
            return;
        }
        socket.emit('new_message', {
            username: this.props.current_user.name,
            message : this.state.current_message,
            to_id: [this.state.activeChat.id],
            conversation_id: this.state.activeChat.conversation_id,
        })
        this.setState({
            current_message: "",
        }, () => {
            socket.emit('stop_typing');
            this.setState({typing: ""});
        });
    }

    changeActive(item){
        if (!item.conversation_id) {
            this.props.createConversation({
                name: item.id + "_" + this.props.current_user.id,
                creator_id: this.props.current_user.id,
                user: [this.props.current_user.id, item.id]
            })
                .then(response => {
                    var payload = {
                        index: null,
                        conversation_id: response.conversation_id,
                        last_message: "Welcome NOIDUYEN :)"
                    };
                    for(let i = 0; i < this.props.chatList.length; i ++){
                        console.log(i);
                        if (this.props.chatList[i].id == this.state.activeChat.id){
                            payload.index = i;
                            break;
                        }
                    }
                    this.props.changeListChast(payload)
                        .then(resState => {
                            // do nothing
                        })
                })
        }
        this.setState({
            activeChat: item,
            conversation: [
                {
                    user_id: this.props.current_user.id,
                    content: 'Connect friend :)',
                    created_at: '20-12-2018'
                },
            ]
        })

    }

    componentDidMount(){

        this.props.getListChat()
            .then(response => {
                console.log(" V a n t u = ");
                for (let i = 0; i < response.length; i++ ){
                    if (response[i].id !== this.props.current_user.id){
                        this.setState({
                            activeChat: response[i]
                        })
                        break;
                    }
                }
            })

        // Lang nghe xem co tin nhan moi khoong

        socket.on("new_message", (data) => {
            this.state.conversation.push(
                {
                    user_id: data.user_id,
                    content: data.message,
                    created_at: '20-11-2018'
                }
            );
            this.setState({
                status: Math.random()
            })

        })

        socket.on('typing', (data) => {
            if (data.user_id === this.state.activeChat.id){
                this.setState({
                    typing: data.username + " typing ..."
                })
            }
        })

        socket.on('stop_typing', (data) => {
            if (data.user_id === this.state.activeChat.id){
                this.setState({
                    typing: "",
                })
            }
        })
    }

    render() {

        var sampleData = {
            message: {
                sender: {
                    name: "Pham Anh Thu",
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                },
                date: "01/11/2018",
                content: "Test, which is a new approach to have all solutions astrology under one roof."
            }
        }


        return (
            <Card>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4 onClick={() => {console.log(this.props.chatList)}}>GẦN ĐÂY</h4>
                                </div>
                            </div>
                            <div className="inbox_chat">
                                {
                                    this.props.chatList.map(item => {
                                        if (item.id === this.props.current_user.id){

                                        }else{
                                            var lastMessage = {
                                                message: {
                                                    sender: {
                                                        name: item.name,
                                                        avatar: "https://www.w3schools.com/howto/img_avatar.png"
                                                    },
                                                    date: "01/11/2018",
                                                    content: item.content
                                                }
                                            }
                                            return (
                                                <MessageItem
                                                    key={item.id}
                                                    message={lastMessage.message}
                                                    isActive={item.id === this.state.activeChat.id}
                                                    unRead={false}
                                                    changeActive={() => {
                                                        this.changeActive(item);
                                                    }}
                                                />
                                            )
                                        }

                                    })
                                }
                            </div>
                        </div>
                        <div className="mesgs">
                            <div>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" id="sender-avatar" />
                                <span className="h4">
                                    {this.state.activeChat.id?this.state.activeChat.name:"Loading ..."}
                                </span>
                                <div className="float-right">
                                    <i className="fas fa-ellipsis-h"></i>
                                </div>
                            </div>
                            <hr />
                            <div className="msg_history">
                                {
                                    this.state.conversation.map((item, index)=> {
                                        return (
                                            <div key={index}>
                                                {
                                                    (item.user_id === this.props.current_user.id) ? (
                                                        <IncomingMessage
                                                            message={item}
                                                        />
                                                    ) : (
                                                            <OutgoingMessage
                                                                message={item}
                                                            />
                                                        )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <p>{this.state.typing}</p>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text"
                                           value={this.state.current_message}
                                           className="write_msg"
                                           id="input-msg"
                                           placeholder="Type a message"
                                           onChange={(evt) => this.typingMessage(evt)}
                                           onKeyPress={(evt) => this.enterMessage(evt)}
                                    />

                                    <button onClick={() => { this.emitMessage() }} className="msg_send_btn" type="button">
                                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}


function mapStateToProps(state) {
    return {
        current_user: state.user.current_user,
        chatList: state.chat.chatList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListChat: (id) => dispatch(getListChat()),
        createConversation: (data) => dispatch(createConversation(data)),
        DanhSach: (id) => dispatch(DanhSach()),
        changeListChast: (data) => dispatch(changeListChast(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));

// export default Messages;