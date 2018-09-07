import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">My Blog</div>
                            <div className="card-body">
                                Welcome on my Blog!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
