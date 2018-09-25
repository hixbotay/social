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
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.props.getAllPosts();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            posts: nextProps.posts 
        });
    }

    addPost(post) {
        this.state.posts.push(post);
        this.setState({
            posts: this.state.posts
        })
    }

    render() {
        console.table(this.state.posts);
        const {current_user} = this.props;
        return (
            <div>
            {
                current_user.id ? (
                    <div>
                        <HomeNavigator></HomeNavigator>
                        <div className="ui-block">
                            <CreatePostForm user_id={current_user.id} addPost={this.addPost.bind(this)}></CreatePostForm>
                            <hr />
                            {
                                this.state.posts.map((post, index) => {
                                    return (
                                        <Post post={post} key={index} user_id={current_user.id}></Post>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.newfeeds.posts,
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFeeds));