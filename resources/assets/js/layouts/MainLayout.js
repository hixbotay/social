import React, { Component } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

class MainLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <LeftSidebar></LeftSidebar>
                    {this.props.children}
                    <RightSidebar></RightSidebar>
                </div>
            </div>
        );
    }
}

export default MainLayout;