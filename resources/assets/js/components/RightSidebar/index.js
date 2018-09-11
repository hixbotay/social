import React, { Component } from 'react';
import VerificationBlock from './VerificationBlock';

class RightSidebar extends Component {
    render() {
        var items = [
            {
                image: "https://lh5.googleusercontent.com/-2r7nkB71SpM/AAAAAAAAAAI/AAAAAAAC5RI/yYrFyU20Boc/photo.jpg",
                name: "Google+",
                isVerify: true
            },
            {
                image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png",
                name: "Facebook",
                isVerify: false
            },
            {
                image: "https://seeklogo.com/images/T/twitter-2012-negative-logo-5C6C1F1521-seeklogo.com.png",
                name: "Twitter",
                isVerify: true
            }
        ];
        
        return (
            <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">
                <VerificationBlock verificationItems={items}/>
                <div className="ui-block">
                    <div className="widget w-birthday-alert">
                        <div className="content">
                            <span>Today is</span>
                            <a href="#" className="h4 title">Marina Valentine’s Birthday!</a>
                            <p>Leave her a message with your best wishes on her profile page!</p>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default RightSidebar;