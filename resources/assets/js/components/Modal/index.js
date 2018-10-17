import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div id={this.props.id} className="modal fade" role="dialog" data-keyboard="false" data-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;