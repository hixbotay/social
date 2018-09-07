import React, { Component } from 'react';

class RightSidebar extends Component {
    render() {
        return (
            <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">
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