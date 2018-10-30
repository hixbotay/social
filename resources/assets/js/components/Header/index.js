import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ListItem from '../../components/Notification/ListItem';
import {logout} from '../../actions/UserActions';
import {connect} from 'react-redux';

class Header extends Component {

    render() {
        const notification = {
            img: "https://www.w3schools.com/w3images/avatar2.png",
            heading: "Hello World",
            content: "bdjs adjshd jhsdgjs dsjahdjsd djsjhdjsdj"
        }
        
        return (
            <header className="header" id="site-header">
                <div className="header-content-wrapper">
                    <div className="control-block">

                        <div>
                            <Link to="/">
                                <img src={`${baseUrl}/public/images/main/logo.png`}
                                style={{
                                    width:150, height: 'auto',
                                    marginRight: 80,
                                }}
                                />
                            </Link>
                        </div>

                        <div className="control-icon more has-items">
                            <Link to={"/"}>TRANG CHỦ</Link>
                        </div>

                        <div className="control-icon more has-items">
                            <i className="fa fa-comments"></i>
                            <div className="label-avatar bg-blue">6</div>

                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-info">
                                            <i className="far fa-check-circle"></i>
                                        </li>
                                        
                                    </ul>
                                </div>

                                <a href="#" className="view-all bg-blue">Check all your Events</a>
                            </div>
                        </div>

                        <div className="control-icon more has-items">
                            <a href={`${baseUrl}/friends/like-you`}>
                                <i className="fas fa-thumbs-up"></i>
                                <div className="label-avatar bg-blue">6</div>
                            </a>
                        </div>

                        <div className="control-icon more has-items">
                            <a href={`${baseUrl}/friends/visited`}>
                                <i className="fas fa-eye"></i>
                                <div className="label-avatar bg-blue">6</div>
                            </a>
                        </div>

                        <div className="control-icon more has-items">
                            <a href={`${baseUrl}/friends/you-like`}>
                                <i className="fas fa-heart"></i>
                                <div className="label-avatar bg-blue">6</div>
                            </a>
                        </div>
                                    
                        {/* Notifications */}
                        <div className="control-icon more has-items">
                            <i className="fa fa-bell"></i>
                            <div className="label-avatar bg-blue">6</div>

                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-info">
                                            List-group-item list-group-item-info
                                        </li>
                                        <li className="list-group-item list-group-item-info">
                                            List-group-item list-group-item-info
                                        </li>
                                        <li className="list-group-item list-group-item-info">
                                            List-group-item list-group-item-info
                                        </li>
                                        <li className="list-group-item list-group-item-info">
                                            List-group-item list-group-item-info
                                        </li>
                                    </ul>
                                </div>

                                <a href="#" className="view-all bg-blue">Check all your Events</a>
                            </div>
                        </div>

                        <div className="author-page author vcard inline-items more">
                            {/*<i className="fa fa-caret-down"></i>*/}
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
                                                        Lịch sử thanh toán
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item list-group-item-info">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <i className="fas fa-cogs"></i>
                                                    </div>
                                                    <div className="col-10">
                                                        Cài đặt
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item list-group-item-info">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <i className="fas fa-sign-out-alt"></i>
                                                    </div>
                                                    <div className="col-10" onClick={() => this.props.logout()}>
                                                        Log Out
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
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Header);