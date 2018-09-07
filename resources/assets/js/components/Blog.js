import React, { Component } from 'react';
import axios from 'axios'; 
import { NavLink } from 'react-router-dom';

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }

    }

    componentDidMount() {
        axios.get('/api/blog')
            .then(response => this.setState({blogs: response.data}))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <ul>
                    {this.state.blogs.map((blog, id) => 
                        <li key={id}>
                            <NavLink to={'/blog/' + blog.id}>{blog.name}</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
