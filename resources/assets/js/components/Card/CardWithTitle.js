import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardWithTitle extends Component {

    render() {
        const {className, title, hasLine,icon, children} = this.props;
        
        return (
            <div className={`ui-block custom-card custom-grid ${className}`} >
                    <div className='card-title'>
                        <h6 className='title'><i className={icon}></i>{title}</h6>
                        {hasLine ? <hr className="seperate-line"/> : null}
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12">
                        {children}
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