import React, { Component } from 'react';

class CafeSearch extends Component {
    render() {
        return (
            <div className="col-md-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title">Tìm quán cafe</h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="form-group is-empty">
                            <input className="form-control" type="tel" placeholder="Phone Number" required="" />
                                <span className="material-input"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CafeSearch;