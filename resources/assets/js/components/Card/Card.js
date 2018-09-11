import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className="ui-block">
                <div className="container">
                    <div className="col-md-12">
                        <div className="float-left"><i className={this.props.leftIcon}></i></div>
                        <div className="float-right"><i className={this.props.rightIcon}></i></div>
                    </div>
                    {this.props.hasLine ? <hr /> : null}
                    <div className="col-md-12">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;