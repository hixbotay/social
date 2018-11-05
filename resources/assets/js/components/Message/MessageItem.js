import React, { Component } from 'react';

class MessageItem extends Component {
    render() {
        const {message} = this.props;
        const {changeActive} = this.props;
        const {unRead} = this.props;
        var className = this.props.isActive ? "chat_list active_chat" : "chat_list";
        return (
            <div className={className}>
                <div className="chat_people" onClick={() => {changeActive();}}>
                    <div className="chat_img">
                        <img src={message.sender.avatar} alt="Avatar" />
                    </div>
                    <div className="chat_ib">
                        <h5 style={{fontWeight: unRead?'bold':'normal'}}>
                            {message.sender.name}<span className="chat_date">{message.date}</span>
                        </h5>
                        <p>
                            {message.content}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageItem;