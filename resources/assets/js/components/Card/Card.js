import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {

    render() {
        const {backgroundImage, className, children} = this.props;

        var style = backgroundImage ? {backgroundImage: backgroundImage} : {};
        return (
            <div className={`ui-block custom-card ${className}`} style={style}>
                <div className="container">
                    <div className="col-md-12">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    backgroundImage: PropTypes.string,
    className: PropTypes.string,
    // children: PropTypes.array
}

export  {Card} ;