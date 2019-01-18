import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import { RoundAvatar } from '../Avatar';

import {markRead} from '../../actions/NotificationActions';
import {UPDATE_UNREAD_NUMBER} from '../../actions/types';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRead: props.notification.is_read ? true : false
        }
    }

    handleNotification() {
        this.props.markRead(this.props.notification.id).then(data => {
            this.props.updateUnreadNumber();
            this.setState({isRead: true});
            
            var link = '#';
            var icon = 'fas fa-heart';
            switch (this.props.notification.type) {
                case 'visit': {
                    link = '/friends/visited';
                    icon = "far fa-eye";
                    break;
                }
                case 'status': {
                    link = `/profile/${this.props.notification.actor_id}`;
                    icon = "far fa-newspaper";
                    break;
                }
                case 'event': {
                    link = '/dating/invited';
                    icon = "fas fa-coffee";
                    break;
                }
                case 'relationship': {
                    link = '/friends/like-you';
                    break;
                }
            }

            this.props.history.push(link);
        });

        
    }

    render() {
        const { notification } = this.props;
        
        var icon = 'fas fa-heart';
        switch (this.props.notification.type) {
            case 'visit': {
                icon = "fas fa-eye";
                break;
            }
            case 'status': {
                icon = "far fa-newspaper";
                break;
            }
            case 'event': {
                icon = "fas fa-coffee";
                break;
            }
            case 'relationship': {
                break;
            }
            case 'request-event': {
                icon = 'fas fa-store';
                break;
            }
        }

        return (
            <div className={`notification-list-item ${this.state.isRead ? "" : "active"}`} onClick={() => this.handleNotification()}>
                <div className="row">
                    <div className="col-3">
                        <RoundAvatar img={notification.actor_avatar} size="medium"></RoundAvatar>
                    </div>
                    <div className="col-9 notification-item">
                        <div className="notification-heading">{notification.actor_name}</div>
                        <div className="notification-content">{notification.content}</div>
                        <div className="custom-notification-icon">
                            <i className={icon}></i>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        markRead: (id) => dispatch(markRead(id)),
        updateUnreadNumber: () => dispatch({type: UPDATE_UNREAD_NUMBER})
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ListItem));