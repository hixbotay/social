import React, { Component } from 'react';
import { RoundAvatar } from '../Avatar';
import Heading from '../Information/Heading';
import InformationNumber from '../Information/InformationNumber';
import { Redirect, Link } from 'react-router-dom';

class PostHeader extends Component {

    render() {
        return (
            <Link to={`/profile/${this.props.user_id}`}>
                <div className="post__author author vcard inline-items">
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
            </Link>
        );
    }
}

export default PostHeader;