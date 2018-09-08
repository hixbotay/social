import React, { Component } from 'react';

class CircleButton extends Component {
    render() {
        return (
            <button className="circle-button btn">
                <i className={this.props.icon}></i>
            </button>
        );
    }
}

export default CircleButton;