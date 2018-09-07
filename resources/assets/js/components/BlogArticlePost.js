import React, { Component } from 'react';
import axios from 'axios';

export default class BlogArticlePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            body: ''
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/blog', this.state)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Post a new article</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            placeholder="Enter blog name"
                                            value={this.state.name} 
                                            onChange={this.handleValueChange}/>
                                    </div>
                                    <div>
                                        <textarea 
                                            name="body" 
                                            placeholder="Enter blog body" 
                                            value={this.state.body}
                                            onChange={this.handleValueChange}/>
                                    </div>
                                    <div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}