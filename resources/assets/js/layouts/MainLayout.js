import React, { Component } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import {isMobileOnly} from 'react-device-detect';
import {Link} from "react-router-dom";

class MainLayout extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        !isMobileOnly ? <LeftSidebar></LeftSidebar> : null
                    }
                    
                    <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-8 col-sm-8 col-12 type-1">
                        <div className="row">
                            <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                                <div className="ui-block-title bg-facebook box-shadow-default">
                                    <h6 className="title"><i className="far fa-star"></i> Xác minh thông tin để tăng độ phổ biến</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-xl-8 order-xl-2 col-lg-8 order-lg-1 col-md-8 col-sm-8 col-12">
                                <div className="group-navigator box-shadow-default">
                                    <div className="row">
                                        <div className="col-3 col-xl-3 col-lg-3 col-md-3  navigator-link">
                                            <a href="/couple" className="c-primary"><i className="fas fa-user"></i></a>
                                        </div>
                                        <div className="col-3 col-xl-3 col-lg-3 col-md-3  navigator-link">
                                            <a href="/couple?view=many" className="c-primary"><i className="fas fa-users"></i></a>
                                        </div>
                                        <div className="col-3 col-xl-3 col-lg-3 col-md-3  navigator-link">
                                            <a href='/' className="c-primary"><i className="fas fa-align-left"></i></a>
                                        </div>
                                        <div className="col-3 col-xl-3 col-lg-3 col-md-3 navigator-link">
                                            <a href="#" className="c-primary"><i className="fas fa-search"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-xl-4 order-xl-2 col-lg-4 order-lg-5 col-md-4 col-sm-4 col-12 form-row search-box">
                                <input type="text" className="form-control" placeholder="Tìm kiếm..."/><i className="fas fa-search"></i>
                            </div>
                        </div>
                        <div className="row">
                            <main className="col col-xl-8 order-xl-2 col-lg-8 order-lg-1 col-md-12 col-sm-12 col-12">
                                {this.props.children}
                            </main>
                            <RightSidebar></RightSidebar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainLayout;