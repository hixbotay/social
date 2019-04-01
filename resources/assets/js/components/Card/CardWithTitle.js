import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleDisplay from 'react-toggle-display'; 
import {FaAngleRight, FaAngleUp} from 'react-icons/fa';

class CardWithTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: (props.isShow === undefined || props.isShow) ? true : false
        }
    }

    toggleDisplay() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        const {className, title, hasLine,icon, children, isShowToggleIcon} = this.props;
        var {isShow} = this.state;
        
        return (
            <div className={`ui-block custom-card ${className}`} >
                    <div className='card-title'>
                        <h6 className='title'>
                            <i className={icon}></i> {title}
                            {
                                isShowToggleIcon ? (
                                    <div className="toggle-dating-btn" onClick={() => this.toggleDisplay()}>
                                        {isShow ? <FaAngleUp/> : <FaAngleRight/>}
                                    </div>
                                ) : null
                                
                            }
                        </h6>
                        {hasLine ? <hr className="seperate-line"/> : null}
                    </div>
                    <ToggleDisplay show={isShow}>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12">
                            {children}
                        </div>
                    </ToggleDisplay>
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

CardWithTitle.defaultProps = {
    isShowToggleIcon: false,
    isShow: true
}

export {CardWithTitle};