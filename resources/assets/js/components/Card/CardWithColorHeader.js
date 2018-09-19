import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardWithColorHeader extends Component {
    
    render() {
        const {className, title, color, children} = this.props;

        var style = {};
        if(color) style = {backgroundColor: color}; 
        
        return (
            <div className={`ui-block custom-card ${className}`} >
                <div className="container">
                    <div style={style}>
                        <h5>{title}</h5>
                    </div>
                    <div className="col-md-12">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

CardWithColorHeader.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    // children: PropTypes.element
}

export {CardWithColorHeader};