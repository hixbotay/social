import React, { Component } from 'react';

class Card extends Component {
    render() {
        var style = this.props.backgroundImage ? {backgroundImage: this.props.backgroundImage} : {};
        var className = this.props.className ? this.props.className : '';
        return (
            <div className={`ui-block custom-card ${className}`} style={style}>
                <div className="container">
                    <div className="">
                        <div className="float-left"><i className={this.props.leftIcon}></i></div>
                        <div className="float-right">
                            <span className="btn-icon-card" onClick={this.props.rightActionIcon}>
                                    <i className={this.props.rightIcon}></i>
                            </span>
                        </div>
                    </div>
                    {this.props.hasLine ? <hr className="seperate-line"/> : null}
                    <div className="col-md-12">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;