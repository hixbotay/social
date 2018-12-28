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
import Payment from './payment/index';
import PaymentHistory from './payment/history';
import PaymentCharge from './payment/charge';
import Settings from './settings';
import NotFound from './404';
import GiftCategories from './gift/Categories';
import GiftProducts from './gift/Products';
import FoodCategories from './food/Categories';

//action
import {getCurrentUser} from '../actions/UserActions';
import {getNotifications} from '../actions/NotificationActions';
import { loadPriceConfig } from '../actions/Payment';
import IdCardVerify from './profile/IdCardVerify';
import EditProfilePage from './profile/EditProfilePage';
import GiftLayout from './gift/GiftLayout';


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
        this.props.loadPriceConfig();
    }
	
	render() {
		var route = (
        <div className={'row'}>
            <div className={'col-sm-12'}>
                <div className="spinner">
                    <div className="cube1"></div>
                    <div className="cube2"></div>
                </div>
            </div>
        </div>);

		if (this.props.user.id){
            route = (
                <Switch>
                    {/* Home */}
                    <AppRoute exact path="/" layout={MainLayout} component={Home} />
                    {/* Profile */}
                    <AppRoute exact path="/profile/edit" layout={SecondLayout} component={EditProfilePage} />
                    <AppRoute exact path="/profile/:id" layout={SecondLayout} component={Profile} />
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

                    {/*Payment*/}
                    <AppRoute exact path={"/payment"} layout={MainLayout} component={Payment} />
                    <AppRoute exact path={"/payment/history"} layout={MainLayout} component={PaymentHistory} />
                    <AppRoute exact path={"/payment/charge"} layout={MainLayout} component={PaymentCharge} />

                    <AppRoute exact path={"/settings"} layout={MainLayout} component={Settings} />
                    <AppRoute exact path={"/verify/id-card"} layout={SecondLayout} component={IdCardVerify} />

                    {/*Product*/}

                    <AppRoute exact path={"/gift/categories"} layout={SecondLayout} component={GiftCategories} />
                    <AppRoute exact path={"/gift/categories/:id"} layout={SecondLayout} component={GiftProducts} />
                    <AppRoute exact path={"/food/categories"} layout={MainLayout} component={FoodCategories} />

                    <Route component={NotFound} />


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
        loadPriceConfig: () => dispatch(loadPriceConfig())
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
        payment: state.payment.price
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp));