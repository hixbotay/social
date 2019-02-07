import React, { Component } from 'react';
import { RoundAvatar } from '../Avatar';
import Heading from '../Information/Heading';
import InformationNumber from '../Information/InformationNumber';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

class PostHeader extends Component {

    render() {
        var title = "";
        if(this.props.isShare) title = "đã chia sẻ một bài viết";

        return (
            <Link to={`/profile/${this.props.user_id}`}>
                <div className="post__author author vcard inline-items">
                    <RoundAvatar img={this.props.avatar} size="medium"></RoundAvatar>

                    <div className="author-date">
                        <h5>{this.props.name + " " + title}</h5>
                        <div><i className="far fa-clock"></i> {moment(this.props.created).format("HH:mm DD-MM-YYYY")}</div>
                        {/* <div className="row">
                            <div className="post-info-item col"><i className="fas fa-heart"></i> {this.props.heartNumber}</div>
                            <div className="post-info-item col"><i className="fas fa-eye"></i> {this.props.viewNumber}</div>
                            <div className="post-info-item col"><i className="fas fa-thumbs-up"></i> {this.props.likeNumber}</div>
                            <div className="post-info-item col"><i className="fas fa-thumbs-down"></i> {this.props.dislikeNumber}</div>
                        </div> */}
                    </div>
                </div>
            </Link>
        );
    }
}

export default PostHeader;