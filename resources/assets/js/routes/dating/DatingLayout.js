import React, { Component } from 'react';
import { CardWithTitle } from '../../components/Card';
import FilterForm from './FilterForm';

class DatingLayout extends Component {
    render() {
        return (
            <div className="row">
                <div className="col col-xl-8 order-xl-2 col-lg-8 order-lg-1 col-md-8 col-sm-12 col-12">
                    {this.props.children}
                </div>
                <div className="col col-xl-4 order-xl-2 col-lg-4 order-lg-1 col-md-4 col-sm-12 col-12">
                    <CardWithTitle title="TÌM CUỘC HẸN" hasLine={true}>
                        <div className="row">
                            <div className="col-6 dating-date" id="today">Hôm nay<i className="far fa-sun dating-icon"></i></div>
                            <div className="col-6 dating-date" id="tomorrow">Ngày mai<i className="fas fa-cloud dating-icon"></i></div>
                        </div>
                        <div className="row">
                            <div className="col-6 dating-date" id="this-week">Tuần này<i className="far fa-sun dating-icon"></i></div>
                            <div className="col-6 dating-date" id="this-month">Tháng này<i className="fas fa-cloud dating-icon"></i></div>
                        </div>
                        <FilterForm></FilterForm>
                    </CardWithTitle>
                </div>
            </div>
        );
    }
}

export default DatingLayout;