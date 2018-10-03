import React, { Component } from 'react';
import {RoundAvatar} from '../Avatar';
import Heading from '../Information/Heading';

class ListItem extends Component {
    render() {
        const {notification} = this.props;
        return (
            <div className="row">
                <div className="col-3"> 
                    <RoundAvatar img={notification.img} size="medium"></RoundAvatar>
                </div>
                <div className="col-9 notification-item">
                    <div className="notification-heading">{notification.heading}</div>
                    <div className="notification-content">{notification.content}</div>
                </div>
            </div>
        );
    }
}

export default ListItem;