import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RoundAvatar extends Component {
    render() {
        const {img, size} = this.props;

        return (
            <img className={`avatar round-avatar avatar-${size}`} src={img ? img : 'http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png'} alt="Avatar" /> 
        );
    }
}

RoundAvatar.propTypes = {
    img: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
}

RoundAvatar.defaultProps = {
    img: 'http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png',
    size: 'small'
}

export {RoundAvatar};