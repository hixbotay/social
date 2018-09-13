import React, { Component } from 'react';
import CafeSearch from './Cafe/search';

class Cafe extends Component {
    render() {
        return (
            <div className="row">

                <CafeSearch />

                <aside className="col-md-12">

                    <div className="ui-block">
                        <div className="widget w-birthday-alert">
                            <div className="content">
                                <span>Today is</span>
                                <a href="#" className="h4 title">Marina Valentine’s Birthday!</a>
                                <p>Leave her a message with your best wishes on her profile page!</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        );
    }
}

export default Cafe;