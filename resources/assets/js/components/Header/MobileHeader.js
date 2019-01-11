import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ListItem from '../../components/Notification/ListItem';
import {logout} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {Card} from '../Card';
import {markAllAsRead, getUnreadNumber}  from '../../actions/NotificationActions';
import socket from '../../helper/socket';

class MobileHeader extends Component {
    componentDidMount() {
        this.props.getUnreadNumber();
        socket.on("notify", (data) => {
            console.log("Data return la = ");
            console.log(data);
        });
    }

    render() {
        return (
            <header className="mobile-header">
                <div className="mobile-header-content">
                    <div>
                        <div className="text-center">
                            <a href={`${baseUrl}`}>
                                <img src={`${baseUrl}/public/images/main/logo.png`}
                                style={{
                                    width:150, height: 'auto'
                                }}
                                />
                            </a>
                        </div>

                        <div className="more-menu">
                            <i className="fas fa-bars fa-2x"></i>
                        </div>
                    </div>

                    <div className="row mobile-icons">
                        <div className="col-1"></div>
                        <div className="col-2">
                            <div className="control-icon more has-items text-center">
                                <a href={`${baseUrl}/messages`}>
                                    <i className="fa fa-comments"></i>
                                    {/* <div className="label-avatar bg-blue">6</div> */}
                                </a>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="control-icon more has-items text-center">
                                <a href={`${baseUrl}/friends/like-you`}>
                                    <i className="fas fa-thumbs-up"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="control-icon more has-items text-center">
                                <a href={`${baseUrl}/friends/visited`}>
                                    <i className="fas fa-eye"></i>
                                </a>
                            </div>  
                        </div>
                        <div className="col-2">
                            <div className="control-icon more has-items text-center">
                                <a href={`${baseUrl}/friends/you-like`}>
                                    <i className="fas fa-heart"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="control-icon more has-items text-center">
                                <i className="fa fa-bell"></i>
                                {
                                    this.props.unreadNumber ? (
                                        <div className="label-avatar bg-blue">{this.props.unreadNumber}</div>
                                    ) : null
                                }

                                <div className="more-dropdown more-with-triangle triangle-top-center">
                                    <div className="custom-notification-list">
                                            {
                                                this.props.notifications.map((item, index) => {
                                                    return (
                                                        <ListItem
                                                            notification={item}
                                                            key={index}
                                                        />
                                                    )
                                                })
                                            }
                                    </div>
                                    <div className="view-all bg-blue" onClick={() => this.props.markAllAsRead()}>
                                        Check all your Events
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1"></div>
                        

                        {/* <div className="author-page author vcard inline-items more">
                            <img src={`${baseUrl}/public/images/main/header-menu.png`}
                                style={{width: 30, height: 30}}
                            />
                            <div className="author-thumb"> 
                                <div className="more-dropdown more-with-triangle">
                                    <div className="mCustomScrollbar" data-mcs-theme="dark">
                                        <div className="ui-block-title ui-block-title-small">
                                            <h6 className="title">Your Account</h6>
                                        </div>

                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-info">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <i className="far fa-check-circle"></i>
                                                    </div>
                                                    <div className="col-10">
                                                        Đặc quyền dành cho VIP
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item list-group-item-info">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <i className="fas fa-bolt"></i>
                                                    </div>
                                                    <div className="col-10">
                                                        Kích hoạt VIP
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item list-group-item-info">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <i className="fas fa-dollar-sign"></i>
                                                    </div>
                                                    <div className="col-10">
                                                        <Link to={'/payment/history'} >
                                                            Lịch sử thanh toán
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item list-group-item-info">                            
                                                <div className="row">
                                                    <div className="col-2">
                                                        <i className="fas fa-cogs"></i>
                                                    </div>
                                                    <div className="col-10">
                                                        <Link to="/settings">Cài đặt</Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item list-group-item-info">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <i className="fas fa-sign-out-alt"></i>
                                                    </div>
                                                    <div className="col-10" onClick={() => this.props.logout()}>
                                                        <a href="javascript:void(0);">
                                                            Log Out
                                                        </a>
                                                    </div>
                                                </div>
                                                
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div >
                        </div> */}
                    </div>
                </div>
            </header >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        markAllAsRead: () => dispatch(markAllAsRead()),
        getUnreadNumber: () => dispatch(getUnreadNumber())
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notification.notifications,
        unreadNumber: state.notification.unreadNumber 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);