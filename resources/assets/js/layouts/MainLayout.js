import React, { Component } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import {isMobileOnly} from 'react-device-detect';

class MainLayout extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        !isMobileOnly ? <LeftSidebar></LeftSidebar> : null
                    }
                    
                    <div className="col col-xl-10 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <main className="col col-xl-7 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
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