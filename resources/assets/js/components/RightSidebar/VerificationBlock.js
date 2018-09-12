import React, { Component } from 'react';

class VerificationBlock extends Component {
    render() {
        return (
            <div className="ui-block">
				<div className="ui-block-title">
					<h6 className="title">Xác minh thông tin để tăng độ phổ biến</h6>
				</div>
				
				<ul className="widget w-friend-pages-added notification-list friend-requests">
                    {
                        this.props.verificationItems.map((item, index) => {
                            return (
                                <li className="inline-items" key={index}>
                                    <div className="author-thumb verification-icon">
                                        <img src={item.image} alt="verification-image"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="#" className="h6 notification-friend">{item.name ? item.name : "Undefined"}</a>
                                        <span className="chat-message-item">{item.isVerify ? "Đã xác minh" : "Chưa xác minh"}</span>
                                    </div>
                                    <span className="notification-icon">
                                        {item.isVerify ? <i className="fas fa-check"></i> : <button className="btn btn-sm btn-primary">Xác minh</button>}
                                    </span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default VerificationBlock;