import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        console.log(window.location);
        return (
            <header className="header" id="site-header">
                <div className="page-title">
                    <Link to='/'><h6>Homepage</h6></Link>
                </div>

                <div className="header-content-wrapper">
                    <div className="control-block">

                        <div className="control-icon more has-items">
                            <i className="fa fa-comments"></i>
                            <div className="label-avatar bg-blue">6</div>

                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="ui-block-title ui-block-title-small">
                                    <h6 className="title">FRIEND REQUESTS</h6>
                                    <a href="#">Find Friends</a>
                                    <a href="#">Settings</a>
                                </div>

                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-warning">This is a warning list group item</li>
                                        <li className="list-group-item list-group-item-info">This is a info list group item</li>
                                        <li className="list-group-item list-group-item-light">This is a light list group item</li>
                                        <li className="list-group-item list-group-item-dark">This is a dark list group item</li>
                                    </ul>
                                </div>

                                <a href="#" className="view-all bg-blue">Check all your Events</a>
                            </div>
                        </div>

                        <div className="control-icon more has-items">
                            <i className="fa fa-users"></i>
                            <div className="label-avatar bg-blue">6</div>

                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="ui-block-title ui-block-title-small">
                                    <h6 className="title">FRIEND REQUESTS</h6>
                                    <a href="#">Find Friends</a>
                                    <a href="#">Settings</a>
                                </div>

                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-warning">This is a warning list group item</li>
                                        <li className="list-group-item list-group-item-info">This is a info list group item</li>
                                        <li className="list-group-item list-group-item-light">This is a light list group item</li>
                                        <li className="list-group-item list-group-item-dark">This is a dark list group item</li>
                                    </ul>
                                </div>

                                <a href="#" className="view-all bg-blue">Check all your Events</a>
                            </div>
                        </div>

                        <div className="control-icon more has-items">
                            <i className="fa fa-bell"></i>
                            <div className="label-avatar bg-blue">6</div>

                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="ui-block-title ui-block-title-small">
                                    <h6 className="title">FRIEND REQUESTS</h6>
                                    <a href="#">Find Friends</a>
                                    <a href="#">Settings</a>
                                </div>

                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-warning">This is a warning list group item</li>
                                        <li className="list-group-item list-group-item-info">This is a info list group item</li>
                                        <li className="list-group-item list-group-item-light">This is a light list group item</li>
                                        <li className="list-group-item list-group-item-dark">This is a dark list group item</li>
                                    </ul>
                                </div>

                                <a href="#" className="view-all bg-blue">Check all your Events</a>
                            </div>
                        </div>

                        <div className="author-page author vcard inline-items more">
                            <i className="fa fa-caret-down"></i>
                            <div className="author-thumb"> 
                                <div className="more-dropdown more-with-triangle">
                                    <div className="mCustomScrollbar" data-mcs-theme="dark">
                                        <div className="ui-block-title ui-block-title-small">
                                            <h6 className="title">Your Account</h6>
                                        </div>

                                        <ul className="account-settings">
                                            <li>
                                                <a href="29-YourAccount-AccountSettings.html">
                                                    <span>Profile Settings</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="36-FavPage-SettingsAndCreatePopup.html">
                                                    <span>Create Fav Page</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span>Log Out</span>
                                                </a>
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

export default Header;