import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '../../components/Notification/ListItem';
import { logout } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { Card } from '../Card';
import { markAllAsRead, getUnreadNumber, getNotifications } from '../../actions/NotificationActions';
import socket from '../../helper/socket';
import InfiniteScroll from 'react-infinite-scroller';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            hasMoreNotification: false,
            notifications: [],
            page: 0
        };
    }

    componentDidMount() {
        this.props.getNotifications(1).then(notifications => {
            let temp = notifications.map((item, index) => {
                return (
                    <ListItem notification={item} key={index} />
                )
            });

            this.setState({
                notifications: temp,
                page: 1,
                hasMoreNotification: true
            })
        });
        this.props.getUnreadNumber();
        socket.on("notify", (data) => {
            console.log("Data return la = ");
            console.log(data);
        });
    }

    onLoad() {
        let page = this.state.page + 1;
        this.props.getNotifications(page).then(notifications => {
            if(notifications.length) {
                let temp = notifications.map((item, index) => {
                    return (
                        <ListItem notification={item} key={index} />
                    )
                });
    
                this.setState({
                    notifications: [...this.state.notifications, temp],
                    page: page,
                    hasMoreNotification: true
                })
            } else {
                this.setState({
                    hasMoreNotification: false,
                    page: page
                })
            }
        });
    }

    render() {
        return (
            <header className="header" id="site-header">
                <div className="header-content-wrapper">
                    <div className="control-block">

                        <div>
                            <a href={`${baseUrl}`}>
                                <img src={`${baseUrl}/public/images/main/logo.png`}
                                    style={{
                                        width: 150, height: 'auto',
                                        marginRight: 80,
                                    }}
                                />
                            </a>
                        </div>

                        <div className="control-icon more has-items">
                            <a href={`${baseUrl}/messages`}>
                                <i className="fa fa-comments"></i>
                                <div className="label-avatar bg-blue">6</div>
                            </a>
                        </div>

                        <div className="control-icon more has-items">
                            <a href={`${baseUrl}/friends/like-you`}>
                                <i className="fas fa-thumbs-up"></i>
                            </a>
                        </div>

                        <div className="control-icon more has-items">
                            <a href={`${baseUrl}/friends/visited`}>
                                <i className="fas fa-eye"></i>
                            </a>
                        </div>

                        <div className="control-icon more has-items">
                            <a href={`${baseUrl}/friends/you-like`}>
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>

                        {/* Notifications */}
                        <div className="control-icon more has-items">
                            <i className="fa fa-bell"></i>
                            {
                                this.props.unreadNumber ? (
                                    <div className="label-avatar bg-blue">{this.props.unreadNumber}</div>
                                ) : null
                            }

                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="custom-notification-list">
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={() => this.onLoad()}
                                        hasMore={this.state.hasMoreNotification}
                                        loader={<div className="text-center" key={0}>Loading...</div>}
                                    >
                                        {this.state.notifications}
                                    </InfiniteScroll>
                                </div>
                                <div className="view-all bg-blue" onClick={() => this.props.markAllAsRead()}>
                                    Check all your Events
                                </div>
                            </div>
                        </div>

                        <div className="author-page author vcard inline-items more">
                            {/*<i className="fa fa-caret-down"></i>*/}
                            <img src={`${baseUrl}/public/images/main/header-menu.png`}
                                style={{ width: 30, height: 30 }}
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
                        </div>
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
        getUnreadNumber: () => dispatch(getUnreadNumber()),
        getNotifications: (page) => dispatch(getNotifications(page))
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notification.notifications,
        unreadNumber: state.notification.unreadNumber
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);