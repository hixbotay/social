import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SecondLayout from '../layouts/SecondLayout';
import Header from '../components/Header';
// component
import Home from './newfeeds/NewFeeds';
import UserProfile from './profile/UserProfile';
import UserSetting from './profile/UserSetting';

import "../../../../assets/css/bootstrap-reboot.css";
import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/bootstrap-grid.css";
import "../../../../assets/css/react-main.css";
import "../../../../assets/css/custom-react.css";
// import "../../../../../assets/css/fonts.css";
import "../../../../assets/fonts/fontawesome-all";

import Cafe from './cafe/index';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route {...rest} render={props => (
		<Layout>
			<Component {...props} />
		</Layout>
	)} />
)

class MainApp extends Component {
	render() {
		console.log("this is route");
		return (
			<div className="App">
				<Header></Header>
				<div className="header-spacer"></div>
				<Switch>
<<<<<<< HEAD
					{/* Home */}
					<AppRoute exact path="/" layout={MainLayout} component={Home} />
					{/* Profile */}
					<AppRoute exact path="/profile/:id" layout={SecondLayout} component={UserProfile} />
					<AppRoute exact path="/profile/:id/setting" layout={SecondLayout} component={UserSetting} />
=======
					<AppRoute exact path="/" layout={MainLayout} component={NewFeeds} />
					<AppRoute exact path="/country" layout={SecondLayout} component={Country} />
					<AppRoute exact path="/profile/:id" layout={SecondLayout} component={Profile} />
					<AppRoute exact path="/profile/:id/setting" layout={SecondLayout} component={UserDetail} />
					<AppRoute exact path="/cafe" layout={MainLayout} component={Cafe} />
>>>>>>> 5d9f661bfc455a09ae64b482ad380e35b539b9ce
				</Switch>
			</div>
		);
	}
}

export default MainApp;