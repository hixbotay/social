import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardWithTitle extends Component {

    render() {
        const {className, title, hasLine, children} = this.props;
        
        return (
            <div className={`ui-block custom-card ${className}`} >
                <div className="container">
                    <h6>{title}</h6>
                    {hasLine ? <hr className="seperate-line"/> : null}
                    <div className="col-md-12">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

CardWithTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    hasLine: PropTypes.bool,
    // children: PropTypes.element
}

export {CardWithTitle};