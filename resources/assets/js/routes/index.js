import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

// css file
import "../../../../assets/css/bootstrap-reboot.css";
import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/bootstrap-grid.css";
import "../../../../assets/css/react-main.css";
import "../../../../assets/css/custom-react.css";
import "../../../../assets/fonts/fontawesome-all";
import '../../../../assets/css/chat.css';

import MainLayout from '../layouts/MainLayout';
import SecondLayout from '../layouts/SecondLayout';
import ThirdLayout from '../layouts/ThirdLayout';

import Header from '../components/Header';

import Home from './newfeeds/NewFeeds';
import Profile from './profile/Profile';
import UserSetting from './profile/CurrentUserDetail';

import CreateNewCafe from './cafe/CreateNewCafe';
import Messages from './messages';
import Dating from './dating';

import FriendsLikeYou from './relationship/FriendsLikeYou';
import FriendsYouLike from './relationship/FriendsYouLike';
import FriendsVisited from './relationship/FriendsVisited';
import SearchResults from './couple/SearchResults';
import CreateDating from './dating/CreateDating';
import CafeDetail from './cafe/CafeDetail';
import CafeList from './cafe/CafeList';
import ListFeatureDating from './dating/ListFeatureDating';
import ListInvitationDating from './dating/ListInvitationDating';
import DatingDetail from './dating/DatingDetail';
import DatingResult from './dating/DatingResult';
import SearchResult from './cafe/SearchResult';
import DatingSearchResults from './dating/DatingSearchResults';
import SubscribeDating from './dating/SubscribeDating';

//action
import {getCurrentUser} from '../actions/UserActions';
import {getNotifications} from '../actions/NotificationActions';



const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route {...rest} render={props => (
		<Layout>
			<Component {...props} />
		</Layout>
	)} />
)

class MainApp extends Component {
	constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.getCurrentUser();
        this.props.getNotifications(1);
    }
	
	render() {
		var route = (
        <div className={'row'}>
            <div className={'col-sm-12'}>
                <div className="loader"></div>
            </div>
        </div>);

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
                    <AppRoute exact path="/cafe" layout={ThirdLayout} component={CafeList} />
                    <AppRoute exact path="/cafe/:id/view" layout={ThirdLayout} component={CafeDetail} />
                    <AppRoute exact path="/cafe/create" layout={ThirdLayout} component={CreateNewCafe} />
                    <AppRoute exact path="/cafe/search" layout={ThirdLayout} component={SearchResult} />
                    {/* Dating */}
                    <AppRoute exact path={'/dating'} layout={SecondLayout} component={Dating} /> 
                    <AppRoute exact path={'/dating/feature'} layout={SecondLayout} component={ListFeatureDating} />
                    <AppRoute exact path={'/dating/invited'} layout={SecondLayout} component={ListInvitationDating} />
                    <AppRoute exact path={'/dating/create'} layout={SecondLayout} component={CreateDating} />
                    <AppRoute exact path={'/dating/subscribe'} layout={SecondLayout} component={SubscribeDating} />
                    <AppRoute exact path={'/dating/search'} layout={SecondLayout} component={DatingSearchResults} />
                    <AppRoute exact path={'/dating/:id'} layout={SecondLayout} component={DatingDetail} />
                    <AppRoute exact path={'/dating/:id/result'} layout={SecondLayout} component={DatingResult} />
                    {/* Messages */}
                    <AppRoute exact path="/messages" layout={ThirdLayout} component={Messages} />
                    {/* Friend */}
                    <AppRoute exact path="/friends/like-you" layout={MainLayout} component={FriendsLikeYou} />
                    <AppRoute exact path="/friends/you-like" layout={MainLayout} component={FriendsYouLike} />
                    <AppRoute exact path="/friends/visited" layout={MainLayout} component={FriendsVisited} />
                    {/* Couple */}
                    <AppRoute exact path="/couple" layout={SecondLayout} component={SearchResults} />
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
        getCurrentUser: () => dispatch(getCurrentUser()),
        getNotifications: (page) => dispatch(getNotifications(page)),
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp));