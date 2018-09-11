import React, { Component } from 'react';

class InformationNumber extends Component {
    render() {
        return (
            <div className="row info-number-line">
                <div className="post-info-item col"><i className="fas fa-heart"></i> {this.props.heartNumber}</div>
                <div className="post-info-item col"><i className="fas fa-eye"></i> {this.props.viewNumber}</div>
                <div className="post-info-item col"><i className="fas fa-thumbs-up"></i> {this.props.likeNumber}</div>
            </div>
        );
    }
}

export default InformationNumber;