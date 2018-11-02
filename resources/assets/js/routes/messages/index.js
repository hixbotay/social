import React, { Component } from 'react';
import { Card } from '../../components/Card';
import MessageItem from '../../components/Message/MessageItem';
import IncomingMessage from '../../components/Message/IncomingMessage';
import OutgoingMessage from '../../components/Message/OutgoingMessage';
import io from 'socket.io-client';
import {getListChat} from "../../actions/MessageActions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getCafeDetail} from "../../actions/CafeActions";

const socket = io('http://103.97.124.105:9327/');
// const socket = io('http://localhost:9327/');

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
            activeChat: 0,
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
        socket.emit('new_message', {
            username: this.props.current_user.name,
            message : this.state.current_message,
            to_id: [this.state.activeChat.id],
            conversation_id: "",
        })
        this.setState({
            current_message: "",
        }, () => {
            socket.emit('stop_typing');
            this.setState({typing: ""});
        });
    }

    componentDidMount(){
        this.props.getListChat()
            .then(response => {
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
                                    <h4>GẦN ĐÂY</h4>
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
                                                    content: "Test, which is a new approach to have all solutions astrology under one roof."
                                                }
                                            }
                                            return (
                                                <MessageItem
                                                    key={item.id}
                                                    message={lastMessage.message}
                                                    isActive={item.id === this.state.activeChat.id}
                                                    changeActive={() => {this.setState({
                                                        activeChat: item,
                                                        conversation: [
                                                            {
                                                                user_id: this.props.current_user.id,
                                                                content: 'Which is a new approach to have all solutions astrology under one roof.',
                                                                created_at: '20-12-2018'
                                                            },
                                                            {
                                                                user_id: this.props.current_user.id,
                                                                content: 'Which is a new approach to have all solutions astrology under one roof.',
                                                                created_at: '20-11-2018'
                                                            }
                                                        ]
                                                    })}}
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));

// export default Messages;