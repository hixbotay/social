
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
import MainApp from './routes/index';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import {HashRouter, BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MainApp />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
