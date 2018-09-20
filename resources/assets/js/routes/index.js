import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// css file
import "../../../../assets/css/bootstrap-reboot.css";
import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/bootstrap-grid.css";
import "../../../../assets/css/react-main.css";
import "../../../../assets/css/custom-react.css";
// import "../../../../../assets/css/fonts.css";
import "../../../../assets/fonts/fontawesome-all";

import MainLayout from '../layouts/MainLayout';
import SecondLayout from '../layouts/SecondLayout';
import ThirdLayout from '../layouts/ThirdLayout';

import Header from '../components/Header';

import Home from './newfeeds/NewFeeds';
import UserProfile from './profile/UserProfile';
import UserSetting from './profile/UserSetting';

import Cafe from './cafe';
import CafeView from './cafe/view/index';
import Messages from './messages/index';

import FriendsLikeYou from './relationship/FriendsLikeYou';
import FriendsYouLike from './relationship/FriendsYouLike';
import FriendsVisited from './relationship/FriendsVisited';
import Couple from './couple';

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
					{/* Home */}
					<AppRoute exact path="/" layout={MainLayout} component={Home} />
					{/* Profile */}
					<AppRoute exact path="/profile/:id" layout={SecondLayout} component={UserProfile} />
					<AppRoute exact path="/profile/:id/setting" layout={SecondLayout} component={UserSetting} />
					{/* Cafe */}
					<AppRoute exact path="/cafe" layout={ThirdLayout} component={Cafe} />
					<AppRoute exact path="/cafe/:url" layout={ThirdLayout} component={CafeView} />
					<AppRoute exact path="/cafe/create" layout={ThirdLayout} component={CafeView} />
					{/* Messages */}
                    <AppRoute exact path="/messages" layout={ThirdLayout} component={Messages} />
					{/* Friend */}
					<AppRoute exact path="/friends/like-you" layout={MainLayout} component={FriendsLikeYou} />
					<AppRoute exact path="/friends/you-like" layout={MainLayout} component={FriendsYouLike} />
					<AppRoute exact path="/friends/visited" layout={MainLayout} component={FriendsVisited} />
					{/* Couple */}
					<AppRoute exact path="/couple/:id" layout={SecondLayout} component={Couple} />
				</Switch>
			</div>
		);
	}
}

export default MainApp;