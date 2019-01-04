import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// component
import CreatePostForm from '../../components/Post/CreatePostForm';
import Post from '../../components/Post';
// action
import { getAllPosts } from '../../actions/PostActions';

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
        post.author_id = this.props.current_user.id;
        this.state.posts.unshift(post);
        this.setState({
            posts: this.state.posts
        })
    }

    render() {
        
        const {current_user} = this.props;
        return (
            <div>
            {
                current_user.id ? (
                    <div>
                        <div className="ui-block">
                            <CreatePostForm user={current_user} addPost={this.addPost.bind(this)}></CreatePostForm>
                            <div className="col-12">
                                <div className="row vip-recommend">
                                    <div className="col-2">
                                        <img src={`${baseUrl}/public/images/diamond.png`} />
                                    </div>
                                    <div className="col-7">
                                        <div><h5>NÂNG CẤP TÀI KHOẢN VIP?</h5></div>
                                        <div>Nâng cấp ngay và tận hưởng nhiều tính năng tuyệt vời!</div>
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-danger">NÂNG CẤP</button>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.posts.map((post, index) => {
                                    return (
                                        <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={true}></Post>
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
        posts: state.post.posts,
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFeeds));