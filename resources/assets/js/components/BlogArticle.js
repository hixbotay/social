import React, { Component } from 'react';
import axios from 'axios';

export default class BlogArticle extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            post: {}
        }
    }

    componentDidMount(){
        axios.get('/api/blog/' + this.props.match.params.param)
            .then(response => this.setState({post: response.data}))
            .catch(error => console.log(error));
    }
    
    render() {
        if (this.state.post) {
            return (
                <div>
                    <h1>{this.state.post.name}</h1>
                    <p>{this.state.post.body}</p>
                </div>
            );
        } else {
            return null;
        }
    }
}