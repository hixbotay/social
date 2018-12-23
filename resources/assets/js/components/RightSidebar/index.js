import React, { Component } from 'react';
import VerificationBlock from './VerificationBlock';
import connect from 'react-redux/es/connect/connect';

class RightSidebar extends Component {
    render() {
        const {user} = this.props;
        
        return (
            <aside className="col col-xl-5 order-xl-5 col-lg-6 order-lg-5 col-md-6 col-sm-12 col-12">
                <VerificationBlock user={user}/>
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

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    }
}

export default connect(mapStateToProps)(RightSidebar);