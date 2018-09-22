import React, { Component } from 'react';
import {Card} from '../Card';
import {Link} from 'react-router-dom';

class HomeNavigator extends Component {
    render() {
        return (
            <div className="group-navigator">
                <div className="row">
                    <div className="col-3 col-md-3">
                        <button className="btn navigator"><i className="fas fa-user fa-2x"></i></button>
                    </div>
                    <div className="col-3 col-md-3">
                        <Link to='/couple'>
                            <button className="btn navigator">
                                <i className="fas fa-users fa-2x"></i>
                            </button>
                        </Link>
                    </div>
                    <div className="col-3 col-md-3">
                        <Link to="/">
                            <button className="btn navigator">
                                <i className="fas fa-hourglass fa-2x"></i>
                            </button>
                        </Link>
                    </div>
                    <div className="col-3 col-md-3">
                        <button className="btn navigator"><i className="fas fa-sliders-h fa-2x"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeNavigator;