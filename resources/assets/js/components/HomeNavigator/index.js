import React, { Component } from 'react';
import {Card} from '../Card';
import {Link} from 'react-router-dom';

class HomeNavigator extends Component {
    render() {
        return (
            <div className="group-navigator">
                <div className="row">
                    <div className="col-4 col-md-4  navigator-link">
                        <Link to='/couple'>
                            Tìm kiếm một
                        </Link>
                    </div>
                    <div className="col-4 col-md-4  navigator-link">
                        <Link to='/couple?view=many'>
                            Tìm kiếm nhiều
                        </Link>
                    </div>
                    <div className="col-4 col-md-4 navigator-link">
                        <i id="filter-couple" className="fas fa-sliders-h"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeNavigator;