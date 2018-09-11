import React, { Component } from 'react';
import LeftSidebar from '../components/LeftSidebar';

class SecondLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <LeftSidebar></LeftSidebar>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default SecondLayout;