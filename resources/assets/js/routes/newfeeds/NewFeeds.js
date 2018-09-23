import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// component
import CreatePostForm from '../../components/Post/CreatePostForm';
import Post from '../../components/Post';
// action
import { getAllPosts } from '../../actions/PostActions';
import HomeNavigator from '../../components/HomeNavigator';

class NewFeeds extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        return (
            <div>
                <HomeNavigator></HomeNavigator>
                <div className="ui-block">
                    <CreatePostForm></CreatePostForm>
                    <hr />
                    {
                        this.props.posts.map((post, index) => {
                            return (
                                <Post post={post} key={index}></Post>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.newfeeds.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFeeds));