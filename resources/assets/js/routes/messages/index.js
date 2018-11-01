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

const socket = io('http://localhost:9327/');

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    typingMessage(){
        socket.emit('typing');
        console.log("Typing message ...");
        console.log(this.props.current_user);
    }

    componentDidMount(){
        this.props.getListChat();
        console.log(this.props.current_user);
        // var subcriber = {room_id: this.props.current_user};
        // socket.emit('subscribe', subcriber);
    }

    render() {
        if (this.props.current_user.id){
            var subcriber = {room_id: this.props.current_user.id};
            socket.emit('subscribe', subcriber);
        }
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
                                    <h4>Recent</h4>
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
                                                    isActive={item.id % 4 != 0}
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
                                    Pham Anh Thu, 23
                                </span>
                                <div className="float-right">
                                    <i className="fas fa-ellipsis-h"></i>
                                </div>
                            </div>
                            <hr />
                            <div className="msg_history">
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                                        return (
                                            <div key={item}>
                                                {
                                                    item % 2 ? (
                                                        <IncomingMessage
                                                            message={sampleData.message}
                                                        />
                                                    ) : (
                                                            <OutgoingMessage
                                                                message={sampleData.message}
                                                            />
                                                        )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text"
                                           className="write_msg"
                                           id="input-msg"
                                           placeholder="Type a message"
                                           onKeyPress={(text) => this.typingMessage(text)}
                                    />
                                    <button onClick={() => {console.log(this.props.chatList)}} className="msg_send_btn" type="button">
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