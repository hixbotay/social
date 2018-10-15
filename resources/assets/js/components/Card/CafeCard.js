import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CafeCard extends Component {
    
    render() {
        const {agency} = this.props;

        return (
            <div className="image-card cafe-card">
                <div>
                    <Link to={`cafe/${agency.id}/view`}>
                        <img src={agency.avatar}/>
                    </Link>
                    <div className="image-card-btn cafe-btn">
                        <button className="btn btn-sm">Hẹn hò</button>
                        <button className="btn btn-sm">Đặt chố</button>
                    </div>
                </div>
                <div className="row image-card-content">
                    <div className="container">
                        <Link to={`cafe/${agency.id}/view`}>
                            <h5>
                                {agency.name}
                            </h5>
                        </Link>
                        <small>
                            {agency.address}
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export {CafeCard};