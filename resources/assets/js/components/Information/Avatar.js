import React, { Component } from 'react';

class Avatar extends Component {
    render() {
        var style = {
            width: '80px',
            height: '80px'
        }

        this.props.size === 'small' ? style = {width: '40px', height: '40px'} : null;

        return (
            <img className='avatar' src={this.props.src} style={style} alt="Avatar" /> 
        );
    }
}

export default Avatar;