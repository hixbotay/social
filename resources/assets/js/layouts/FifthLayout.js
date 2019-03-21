import React, { Component } from 'react';
import LeftSidebarTypeTwo from '../components/LeftSidebarTypeTwo';
import {isMobileOnly} from "react-device-detect";
import LeftSidebar from "../components/LeftSidebar";

class FifthLayout extends Component {

    render() {
        return (
            <div className="container">
                <div className="row profile-layout">
                    {
                        !isMobileOnly ? <LeftSidebar></LeftSidebar> : null
                    }
                    <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 col-sm-12 col-12 main-content-wrap">
                        <div className="row">
                            <main className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                                {this.props.children}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FifthLayout;