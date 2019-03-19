import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardWithIcon extends Component {
    
    render() {
        const {backgroundImage, className, leftIcon, rightIcon, children, hasLine, title} = this.props;

        var style = backgroundImage ? {backgroundImage: backgroundImage} : {};
        return (
            <div className={`ui-block custom-card ${className}`} style={style}>
                {/*<div className="container">*/}
                    <div className="">
                        <div className="float-left"><i className={leftIcon}></i> {title}</div>
                        <div className="float-right">
                            <div className="btn-icon-card" onClick={this.props.rightIconAction}>
                                <i className="fas fa-exclamation-triangle color-red-dark"></i>
                            </div>
                        </div>
                    </div>
                    {hasLine ? <hr className="seperate-line"/> : null}
                    {/*<div className="col-md-12">*/}
                        {children}
                    {/*</div>*/}
                {/*</div>/*/}
            </div>
        );
    }
}

CardWithIcon.propTypes = {
    backgroundImage: PropTypes.string,
    className: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    rightIconAction: PropTypes.func,
    hasLine: PropTypes.bool,
    title: PropTypes.string,
    // children: PropTypes.array
}

export {CardWithIcon};