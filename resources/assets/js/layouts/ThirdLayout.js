import React, { Component } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import {isMobileOnly} from 'react-device-detect';

class ThirdLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        !isMobileOnly ? <LeftSidebar></LeftSidebar> : null
                    }
                    <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 col-sm-12 col-12 main-content-wrap">
                        <main className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12 ">
                            {this.props.children}
                        </main>
                    </div>

                </div>
            </div>
        );
    }
}

export default ThirdLayout;