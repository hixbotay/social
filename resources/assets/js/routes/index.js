import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Country from './country/index.js';
import NewFeeds from './newfeeds/index.js';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

class MainApp extends Component {
	render() {
		const { match } = this.props;
		console.log(match);
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" component={NewFeeds} />
					<Route path="/country" component={Country} />
				</Switch>
			</HashRouter>

		);
	}
}

export default MainApp;