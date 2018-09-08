
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import MainApp from './routes/index';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Header></Header>
                <div className="header-spacer"></div>

                <div className="container">
                    <div className="row">
                        <LeftSidebar></LeftSidebar>
                        <MainApp></MainApp>
                        <RightSidebar></RightSidebar>
                    </div>
                </div>
            </div>
        );
    }
}

// export default App;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>,
    document.getElementById('app')
);
