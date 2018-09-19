import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SquareAvatar extends Component {
    render() {
        const {img, size} = this.props;

        return (
            <img className={`avatar square-avatar avatar-${size}`} src={img} alt="Avatar" /> 
        );
    }
}

SquareAvatar.propTypes = {
    img: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
}

SquareAvatar.defaultProps = {
    img: 'http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png',
    size: 'small'
}

export {SquareAvatar};