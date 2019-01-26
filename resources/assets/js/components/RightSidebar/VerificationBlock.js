import React, { Component } from 'react';
import { Line } from 'rc-progress';
import {Link} from 'react-router-dom';

class VerificationBlock extends Component {
    render() {
        const {user} = this.props;
        
        let temp = 0;
        if(user.is_id_card_verified === 'verified') temp++; 
        if(user.is_facebook_verified) temp++; 
        if(user.is_gmail_verified) temp++; 
        if(user.is_phone_verified) temp++; 

        var verificationPercentage  = (temp/4) * 100;
        
        var items = [
            {
                image: "https://lh5.googleusercontent.com/-2r7nkB71SpM/AAAAAAAAAAI/AAAAAAAC5RI/yYrFyU20Boc/photo.jpg",
                name: "Google+",
                isVerify: user.is_gmail_verified,
                url: '#'
            },
            {
                image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png",
                name: "Facebook",
                isVerify: user.is_facebook_verified,
                url: '#'
            },
            {
                image: "https://i0.wp.com/onedollargraphics.market/wp-content/uploads/2018/02/phone-icon.jpg",
                name: "Số điện thoại",
                isVerify: user.is_phone_verified,
                url: '#'
            },
            {
                image: "https://www.colorid.com/uploads/4/2/2/9/42295857/published/id-card-icon.png?1529077382",
                name: "Chứng minh thư",
                isVerify: (user.is_id_card_verified === 'verified'),
                url: '/verify/id-card'
            }
        ];

        return (
            <div className="ui-block">
				<div className="ui-block-title">
					<h6 className="title">Xác minh thông tin để tăng độ phổ biến</h6>
				</div>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-check-circle fa-2x"></i>
                        </div>
                        <div className="col-10">
                            <Line percent={verificationPercentage} strokeWidth="4" strokeColor="#2ecc71" trailWidth="4" trailColor="#bdc3c7"/>
                        </div>
                    </div>
                </div>
				<ul className="widget w-friend-pages-added notification-list friend-requests">
                    {
                        items.map((item, index) => {
                            return (
                                <li className="inline-items" key={index}>
                                    <div className="author-thumb verification-icon">
                                        <img src={item.image} alt="verification-image"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href={item.url} className="h6 notification-friend">{item.name ? item.name : "Undefined"}</a>
                                        <span className="chat-message-item">{item.isVerify ? "Đã xác minh" : "Chưa xác minh"}</span>
                                    </div>
                                    <span className="notification-icon">
                                        {
                                            item.isVerify ?
                                                <i className="fas fa-check"></i>
                                            : 
                                            <a href={item.url}>
                                                <button className="verify-btn">Xác minh</button>
                                            </a>
                                        }
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