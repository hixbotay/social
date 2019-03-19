import React, {Component} from 'react';
import VerificationBlock from './VerificationBlock';
import connect from 'react-redux/es/connect/connect';

class RightSidebar extends Component {
    render() {
        const {user} = this.props;

        return (
            <aside className="col col-xl-4 order-xl-5 col-lg-4 order-lg-5 col-md-6 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="widget w-friend-pages-added notification-list friend-requests box-shadow-default">
                        <div>
                            <div className="notification-list-item ">
                                <div className="row">
                                    <div className="col-4"><img className="avatar round-avatar avatar-medium"
                                                                src={`${baseUrl}/public/images/main/user.png`}
                                                                alt="Avatar"/>
                                    </div>
                                    <div className="col-8 notification-item"><span className="notification-heading">Lưu Thu Hương </span><span
                                        className="notification-content">Đã ghé thăm bạn </span></div>
                                </div>
                            </div>
                            <div className="notification-list-item ">
                                <div className="row">
                                    <div className="col-4"><img className="avatar round-avatar avatar-medium"
                                                                src={`${baseUrl}/public/images/main/user.png`}
                                                                alt="Avatar"/>
                                    </div>
                                    <div className="col-8 notification-item"><span className="notification-heading">Lưu Thu Hương </span><span
                                        className="notification-content">Đã yêu bạn </span></div>
                                </div>
                            </div>
                            <div className="notification-list-item ">
                                <div className="row">
                                    <div className="col-4"><img className="avatar round-avatar avatar-medium"
                                                                src={`${baseUrl}/public/images/main/user.png`}
                                                                alt="Avatar"/>
                                    </div>
                                    <div className="col-8 notification-item"><span className="notification-heading">Lưu Thu Hương </span><span
                                        className="notification-content">Đã ghé thăm bạn </span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ui-block'>
                    <div className="widget w-friend-pages-added notification-list friend-recommend box-shadow-default">
                        <div>
                            <div className='notifi-title'>Đề xuất thành viên phù hợp với bạn</div>
                            <div className="notification-list-item border-0">
                                <div className="row">
                                    <div className="col-4">
                                        <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                    </div>
                                    <div className="col-4">
                                        <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                    </div>
                                    <div className="col-4">
                                        <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                    </div>
                                </div>
                                <div className="notification-list-item border-0">
                                    <div className="row">
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="notification-list-item border-0">
                                    <div className="row">
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="notification-list-item border-0">
                                    <div className="row">
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                        <div className="col-4">
                                            <img className="avatar round-avatar avatar-medium" src={`${baseUrl}/public/images/main/user.png`} alt="Avatar"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* <div className="ui-block">
                    <div className="widget w-birthday-alert">
                        <div className="content">
                            <span>Today is</span>
                            <a href="#" className="h4 title">Marina Valentine’s Birthday!</a>
                            <p>Leave her a message with your best wishes on her profile page!</p>
                        </div>
                    </div>
                </div> */}
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