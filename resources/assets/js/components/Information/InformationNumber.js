import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

InformationNumber.propTypes = {
    heartNumber: PropTypes.number,
    viewNumber: PropTypes.number,
    likeNumber: PropTypes.number,
}

InformationNumber.defaultProps = {
    heartNumber: 0,
    viewNumber: 0,
    likeNumber: 0,
}

export default InformationNumber;