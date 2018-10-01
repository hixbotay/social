import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

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
import Profile from './profile/Profile';
import UserSetting from './profile/CurrentUserDetail';

import Cafe from './cafe';
import CafeView from './cafe/create';
import Messages from './messages';
import Dating from './dating';

import FriendsLikeYou from './relationship/FriendsLikeYou';
import FriendsYouLike from './relationship/FriendsYouLike';
import FriendsVisited from './relationship/FriendsVisited';
import ViewCouple from './couple/ViewCouple';
import SearchResults from './couple/SearchResults';
import OtherPerson from './profile/OtherUserProfile';
import {connect} from 'react-redux';
import {getCurrentUser} from '../actions/UserActions';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route {...rest} render={props => (
		<Layout>
			<Component {...props} />
		</Layout>
	)} />
)

class MainApp extends Component {
	componentDidMount() {
        this.props.getCurrentUser();
	}
	
	render() {

		var route = (<div><h1>Đang tải User</h1></div>);

		if (this.props.user.id){
            route = (
                <Switch>
                    {/* Home */}
                    <AppRoute exact path="/" layout={MainLayout} component={Home} />
                    {/* Profile */}
                    <AppRoute exact path="/profile/:id" layout={SecondLayout} component={Profile} />
                    <AppRoute exact path="/profile/:id/setting" layout={SecondLayout} component={UserSetting} />
                    {/* <AppRoute exact path="/other/:id" layout={SecondLayout} component={OtherPerson} /> */}
                    {/* Cafe */}
                    <AppRoute exact path="/cafe" layout={ThirdLayout} component={Cafe} />
                    <AppRoute exact path="/cafe/:url" layout={ThirdLayout} component={CafeView} />
                    <AppRoute exact path="/cafe/create" layout={ThirdLayout} component={CafeView} />
                    {/* Dating */}
                    <AppRoute extract path={'/dating'} layout={ThirdLayout} component={Dating} />
                    {/* Messages */}
                    <AppRoute exact path="/messages" layout={ThirdLayout} component={Messages} />
                    {/* Friend */}
                    <AppRoute exact path="/friends/like-you" layout={MainLayout} component={FriendsLikeYou} />
                    <AppRoute exact path="/friends/you-like" layout={MainLayout} component={FriendsYouLike} />
                    <AppRoute exact path="/friends/visited" layout={MainLayout} component={FriendsVisited} />
                    {/* Couple */}
                    <AppRoute exact path="/couple" layout={SecondLayout} component={SearchResults} />
                    <AppRoute exact path="/couple/:id" layout={SecondLayout} component={ViewCouple} />
                </Switch>
			);
		}


		return (
			<div className="App">
				<Header></Header>
				<div className="header-spacer"></div>

				{ route }

			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrentUser: () => dispatch(getCurrentUser())
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp));