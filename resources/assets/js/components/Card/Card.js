import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
* @augments {Component<{    backgroundImage:string,    className:string,    // children:array>}
*/
class Card extends Component {

    render() {
        const {backgroundImage, className, id, children} = this.props;

        var style = backgroundImage ? {backgroundImage: backgroundImage} : {};
        return (
            <div className={`ui-block custom-card custom-grid ${className}`} id={id} style={style}>
                {/*<div className="container">*/}
                    {/*<div className="col-xl-12 col-lg-12 col-md-12">*/}
                        {children}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

Card.propTypes = {
    backgroundImage: PropTypes.string,
    className: PropTypes.string,
    // children: PropTypes.array
}

Card.defaultProps = {
    className: '',
    id: ''
}

export  {Card} ;