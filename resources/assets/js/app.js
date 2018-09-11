
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
import { BrowserRouter, HashRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Header from '../js/components/Header';

const history = createBrowserHistory();

// class App extends Component {
//     render() {
//         return (
//             <div>
//                 <Header></Header>
//                 <MainApp></MainApp>
//             </div>
//         );
//     }
// }

// export default App;

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <MainApp />
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);
