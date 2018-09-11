import React, { Component } from 'react';

class Heading extends Component {
    render() {
        return (
            <div>
                <a>{this.props.heading}</a>
                <div><small>{this.props.subHeading}</small></div>
            </div>
        );
    }
}

export default Heading;