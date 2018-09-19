import React, { Component } from 'react';
import {RoundAvatar} from '../Avatar';
import Heading from '../Information/Heading';
import InformationNumber from '../Information/InformationNumber';

class PostHeader extends Component {
    render() {
        return (
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
        );
    }
}

export default PostHeader;