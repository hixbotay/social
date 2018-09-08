import React, { Component } from 'react';

class PostHeader extends Component {
    render() {
        return (
            <div className="post__author author vcard inline-items">
                <img src={this.props.avatar} alt="author" />

                <div className="author-date">
                    <a className="h6 post__author-name fn" href="#">{this.props.username}</a>
                    <div className="row">
                        <div className="post-info-item col"><i className="fas fa-heart"></i> {this.props.heartNumber}</div>
                        <div className="post-info-item col"><i className="fas fa-eye"></i> {this.props.viewNumber}</div>
                        <div className="post-info-item col"><i className="fas fa-thumbs-up"></i> {this.props.likeNumber}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostHeader;