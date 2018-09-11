import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Router, Switch, Route } from 'react-router-dom';
import Country from './country/index.js';
import NewFeeds from './newfeeds/index.js';
import Profile from './profile/index.js';
import UserDetail from './profile/UserDetail';
import MainLayout from '../layouts/MainLayout';
import SecondLayout from '../layouts/SecondLayout';
import Header from '../components/Header';

import "../../../../assets/css/bootstrap-reboot.css";
import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/bootstrap-grid.css";
import "../../../../assets/css/react-main.css";
import "../../../../assets/css/custom-react.css";
// import "../../../../../assets/css/fonts.css";
import "../../../../assets/fonts/fontawesome-all";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route {...rest} render={props => (
		<Layout>
			<Component {...props} />
		</Layout>
	)} />
)

class MainApp extends Component {
	render() {
		return (
			<div className="App">
				<Header></Header>
				<div className="header-spacer"></div>
				<Switch>
					<AppRoute exact path="/" layout={MainLayout} component={NewFeeds} />
					<AppRoute exact path="/country" layout={SecondLayout} component={Country} />
					<AppRoute exact path="/profile" layout={SecondLayout} component={Profile} />
					<AppRoute exact path="/profile/setting" layout={SecondLayout} component={UserDetail} />
				</Switch>
			</div>
		);
	}
}

export default MainApp;