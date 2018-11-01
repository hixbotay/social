import React, { Component } from 'react';

class IncomingMessage extends Component {
    render() {
        const {message} = this.props;
        return (
            <div className="incoming_msg">
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{message}</p>
                        <span className="time_date">{message.created_at}</span></div>
                </div>
            </div>
        );
    }
}

export default IncomingMessage;