import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import { RoundAvatar } from '../Avatar';

import {markRead} from '../../actions/NotificationActions';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRead: props.notification.is_read ? true : false
        }
    }

    handleNotification() {
        this.props.markRead(this.props.notification.id);

        var link = '#';
        switch (this.props.notification.type) {
            case 'visit': {
                link = '/friends/visited';
                break;
            }
            case 'status': {
                link = `/profile/${this.props.notification.actor_id}`;
                break;
            }
            case 'relationship': {
                link = '/friends/like-you';
                break;
            }
        }

        this.props.history.push(link);
    }

    render() {
        const { notification } = this.props;
        

        return (
            <div className={`notification-list-item ${this.state.isRead ? "" : "active"}`} onClick={() => this.handleNotification()}>
                <div className="row">
                    <div className="col-3">
                        <RoundAvatar img={notification.actor_avatar} size="medium"></RoundAvatar>
                    </div>
                    <div className="col-9 notification-item">
                        <div className="notification-heading">{notification.actor_name}</div>
                        <div className="notification-content">{notification.content}</div>
                        <div className="notification-icon">
                            <i className="fas fa-heart"></i>
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
        markRead: () => dispatch(markRead())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ListItem));