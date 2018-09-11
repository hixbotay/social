import React, { Component } from 'react';

class Heading extends Component {
    render() {
        var heading = null;
        switch(this.props.size) {
            case 'small': {
                heading = <h6>{this.props.heading}</h6>;
                break;
            }
            case 'medium': {
                heading = <h4>{this.props.heading}</h4>;
                break;
            }
            case 'large': {
                heading = <h1>{this.props.heading}</h1>;
                break;
            }
            default: {
                heading = <h6>{this.props.heading}</h6>;
                break;
            }
        }
        return (
            <div>
                <a href='#'>{heading}</a>
                <div><small>{this.props.subHeading}</small></div>
            </div>
        );
    }
}

export default Heading;