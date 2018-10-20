import React, { Component } from 'react';
import { RoundAvatar } from '../Avatar';
import Heading from '../Information/Heading';
import InformationNumber from '../Information/InformationNumber';
import { Redirect } from 'react-router-dom';

class PostHeader extends Component {
    onClick() {
        window.location.href = `/profile/${this.props.user_id}`;
    }

    render() {
        return (
            <div className="post__author author vcard inline-items" onClick={() => this.onClick()}>
                <RoundAvatar img={this.props.avatar} size="medium"></RoundAvatar>

                <div className="author-date">
                    <Heading heading={this.props.name}></Heading>
                    <InformationNumber
                        likeNumber={this.props.likeNumber}
                        viewNumber={this.props.viewNumber}
                        heartNumber={this.props.heartNumber}
                    ></InformationNumber>
                </div>
            </div>
        );
    }
}

export default PostHeader;