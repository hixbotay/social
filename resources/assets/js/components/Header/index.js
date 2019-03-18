import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '../../components/Notification/ListItem';
import { logout } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { Card } from '../Card';
import { markAllAsRead, getUnreadNumber, getNotifications } from '../../actions/NotificationActions';
import { unreadCount } from '../../actions/MessageActions';
import socket from '../../helper/socket';
import InfiniteScroll from 'react-infinite-scroller';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            hasMoreNotification: false,
            notifications: [],
            page: 0,
            chatNumber: 0,
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

        console.log(this.props);

        this.props.unreadCount({user_id: 1})
            .then(response => {
                this.setState({chatNumber: response});
            })
            .catch(err => {
                console.log(err);
            })
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
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="control-block">

                                    <div>
                                        <a href={`${baseUrl}`}>
                                            <img src={`${baseUrl}/public/images/main/logo.png`}
                                                 style={{
                                                     width: 150, height: 'auto',
                                                 }}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 type-1">
                                <div className="control-block">

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
                                    <div className="control-icon more has-items p-t-10">
                                        <a href={`${baseUrl}/friends/you-like`} className="color-red">
                                            <i className="fas fa-heart"></i>
                                            <div className="label-avatar bg-red">{this.state.chatNumber}</div>
                                        </a>
                                    </div>
                                    <div className="control-icon more has-items">
                                        <a href={`${baseUrl}/messages`}>
                                            <i className="fa fa-comment-dots"></i>
                                        </a>
                                    </div>
                                    {/* Notifications */}
                                    <div className="control-icon more has-items p-t-10">
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
                                            <div className="view-all bg-smoke-light" onClick={() => this.props.markAllAsRead()}>
                                                Xem thêm
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="control-block">
                                    <div className="author-page author vcard inline-items more">
                                        {/*<i className="fa fa-caret-down"></i>*/}
                                        <img src={`${baseUrl}/public/images/main/user.png`}
                                             style={{ width: 40, height: 40,marginRight:5 }}
                                        />
                                        <i className="fas fa-angle-down"></i>
                                        <div className="author-thumb">
                                            <div className="more-dropdown more-with-triangle">
                                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                                    <div className="ui-block-title ui-block-title-small border-0">
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
        getNotifications: (page) => dispatch(getNotifications(page)),
        unreadCount: (userId) => dispatch(unreadCount(userId))
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notification.notifications,
        unreadNumber: state.notification.unreadNumber
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);