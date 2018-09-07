import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Blog from './components/Blog';
import Home from './components/Home';
import Navigation from './components/Nawigation';
import BlogArticle from './components/BlogArticle';
import BlogArticlePost from './components/BlogArticlePost';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/blog/" exact component={Blog}/>
                        <Route path="/blog/:param" exact render={props => {
                            return props.match.params.param === 'create' 
                                ? <BlogArticlePost/> 
                                : <BlogArticle {...props} />;     
                        }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
