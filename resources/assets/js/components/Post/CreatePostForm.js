import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createPost, getAllPosts} from '../../actions/PostActions';

class CreatePostForm extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            newPost: {
                user_id: props.user_id,
                content: ''
            }
        }
    }

    updateStatus(event) {
        this.setState({
            newPost: {
                ...this.state.newPost,
                content: event.target.value
            }
        }, () => {
            console.log(this.state.newPost);
        })
    }

    async createPost(e) {
        e.preventDefault();
        if(this.state.newPost.content != '') {
            await this.props.createPost(this.state.newPost);
        }
        
        this.props.addPost(this.state.newPost);
        this.setState({
            newPost: {
                ...this.state.newPost,
                content: ''
            }
        })
    }

    render() {
    
        return (
            <div className="news-feed-form">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active inline-items" data-toggle="tab" href="#home-1" role="tab" aria-expanded="true">
                            <span>Status</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link inline-items" data-toggle="tab" href="#profile-1" role="tab" aria-expanded="false">

                            <span>Multimedia</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link inline-items" data-toggle="tab" href="#blog" role="tab" aria-expanded="false">

                            <span>Blog Post</span>
                        </a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                        <form onSubmit={(e) => this.createPost(e)}>
                            <div className="author-thumb">
                            </div>
                            <div className="form-group with-icon label-floating is-empty">
                                <textarea 
                                    className="form-control" 
                                    placeholder="Share what you are thinking here..." 
                                    onChange={(event) => this.updateStatus(event)}
                                    value={this.state.newPost.content}
                                ></textarea>
                            </div>
                            <div className="add-options-message">
                                <button type="submit" className="btn btn-primary btn-md-2">Post Status</button>
                                <button className="btn btn-md-2 btn-border-think btn-transparent c-grey">Preview</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data)),
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default connect(null, mapDispatchToProps)(CreatePostForm);