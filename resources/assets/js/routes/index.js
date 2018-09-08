import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Router, Switch, Route } from 'react-router-dom';
import Country from './country/index.js';
import NewFeeds from './newfeeds/index.js';
import createBrowserHistory from 'history/createBrowserHistory';

import "../../../../assets/css/bootstrap-reboot.css";
import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/bootstrap-grid.css";
import "../../../../assets/css/react-main.css";
import "../../../../assets/css/custom-react.css";
// import "../../../../../assets/css/fonts.css";
import "../../../../assets/fonts/fontawesome-all";


const history = createBrowserHistory()

class MainApp extends Component {
	render() {
		const { match } = this.props;
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" component={NewFeeds} />
					<Route path="/country" component={Country} />
				</Switch>
			</HashRouter>
			// <Router history={history}>
			// 	<Route path="/" component={NewFeeds}>
			// 			<Route path="/country" component={Country}></Route>	
			// 	</Route>
			// </Router>
		);
	}
}

export default MainApp;