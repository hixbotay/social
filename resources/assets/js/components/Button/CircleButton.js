import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CircleButton extends Component {
    
    render() {
        var style = {
            color: this.props.color
        }

        return (
            <button className="circle-button btn" 
                name={this.props.name} 
                onClick={this.props.action} 
                style={style} 
                id={this.props.id}>
                <i className={this.props.icon}></i>
            </button>
        );
    }
}

CircleButton.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.func,
    icon: PropTypes.string
}

CircleButton.defaultProps = {
    color: '#34495e'
}

export default CircleButton;