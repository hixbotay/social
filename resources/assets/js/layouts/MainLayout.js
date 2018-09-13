import React, { Component } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

class MainLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <LeftSidebar></LeftSidebar>
                    <main className="col col-xl-7 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        {this.props.children}
                    </main>
                    <RightSidebar></RightSidebar>
                </div>
            </div>
        );
    }
}

export default MainLayout;