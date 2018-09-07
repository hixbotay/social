import React, { Component } from 'react';

class LeftSidebar extends Component {
    render() {
        return (
            <aside className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
                <div className="ui-block">

                    <div className="ui-block-title">
                        <h6 className="title">Pages You May Like</h6>
                    </div>

                    <ul className="list-group">
                        <li className="list-group-item">Dapibus ac facilisis in</li>


                        <li className="list-group-item list-group-item-primary">This is a primary list group item</li>
                        <li className="list-group-item list-group-item-secondary">This is a secondary list group item</li>
                        <li className="list-group-item list-group-item-success">This is a success list group item</li>
                        <li className="list-group-item list-group-item-danger">This is a danger list group item</li>
                        <li className="list-group-item list-group-item-warning">This is a warning list group item</li>
                        <li className="list-group-item list-group-item-info">This is a info list group item</li>
                        <li className="list-group-item list-group-item-light">This is a light list group item</li>
                        <li className="list-group-item list-group-item-dark">This is a dark list group item</li>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default LeftSidebar;