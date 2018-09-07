import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom';

class NewFeeds extends Component {
    render() {
        return (
            <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="news-feed-form">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active inline-items" data-toggle="tab" href="#home-1" role="tab" aria-expanded="true">
                                    <span>Status</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link inline-items" data-toggle="tab" href="#profile-1" role="tab" aria-expanded="false">

                                    <span>Multimedia</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link inline-items" data-toggle="tab" href="#blog" role="tab" aria-expanded="false">

                                    <span>Blog Post</span>
                                </a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                                <form>
                                    <div className="author-thumb">
                                    </div>
                                    <div className="form-group with-icon label-floating is-empty">
                                        <label className="control-label">Share what you are thinking here...</label>
                                        <textarea className="form-control" placeholder=""></textarea>
                                    </div>
                                    <div className="add-options-message">
                                        <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" data-original-title="ADD PHOTOS">

                                        </a>
                                        <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" data-original-title="TAG YOUR FRIENDS">
                                        </a>

                                        <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" data-original-title="ADD LOCATION">

                                        </a>

                                        <button className="btn btn-primary btn-md-2">Post Status</button>
                                        <button className="btn btn-md-2 btn-border-think btn-transparent c-grey">Preview</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default NewFeeds;