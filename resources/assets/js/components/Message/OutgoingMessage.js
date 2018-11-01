import React, { Component } from 'react';

class OutgoingMessage extends Component {
    render() {
        const {message} = this.props;
        return (
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{message.content}</p>
                    <span className="time_date">{message.created_at}</span>
                </div>
            </div>
        );
    }
}

export default OutgoingMessage;