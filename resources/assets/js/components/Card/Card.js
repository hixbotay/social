import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className="ui-block custom-card">
                <div className="container">
                    <div className="">
                        <div className="float-left"><i className={this.props.leftIcon}></i></div>
                        <div className="float-right"><i className={this.props.rightIcon}></i></div>
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